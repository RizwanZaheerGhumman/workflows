import { Investments } from "@ninetydays/orm-setup";
import { getInvestmentRegisterId, postInvestmentRegisterPayload } from '../../../helper/investment/investment.helper'
import { sendSSE } from "../common/sse-email.activity";
import { CATEGORY_TO_LOAN_TYPE } from "../../../constants/kftc.constants";
import { mockKFTCAPI } from '../../../helper/kftc/kftc.helper';
import axios from "axios";
import { OnError } from "./investment-cancel.activity";


// Set the isMock variable to true if the MOCK_KFTC_API environment variable is set to true
const isMock = process.env.MOCK_KFTC_API === 'true';

// Define the OnInit function that takes a context object and returns a Promise object
export async function OnInit(context: object): Promise<object> {
  // Destructure the context object and assign the amount, skip_validation, user_id, and loan_id variables
  let { amount, skip_validation=false, user_id, loan_id } = context as any;
  try {
    // Call the getInvestmentRegisterId function to get the investment register ID
    const kftcInvestmentRegisterId: string = getInvestmentRegisterId();

    // Call the Investments.query method to call the investment_request_v2 stored procedure
    const [investmentResponse] = await Investments.query(
      'CALL investment_request_v2($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [
        amount,
        skip_validation,
        user_id,
        loan_id,
        kftcInvestmentRegisterId,
        0,
        0,
        '',
        '',
        0,
      ],
    );

    // Return an object with the context and the loan and investment ID
    return {
      ...context,
      loan: {
        id: investmentResponse.loan_id_result,
        userId:investmentResponse.user_id_result,
        kftc_goods_id:investmentResponse.kftc_goods_id_result,
        category: investmentResponse.category_result,
      },
      investment_id: investmentResponse.investment_id_result,
    };
  } catch (error) {
    // Call the sendSSE activity with the loan ID, user ID, and error message
    await sendSSE({
      loanId: loan_id,
      userId: user_id,
      message: error.message,
      isSuccess: false,
    });
  }
}

// Define the KFTC function that takes a context object and returns a Promise object
export async function KFTC(context: any): Promise<any> {
  console.log('context in kftc',context);
  let investment: any;
  try {
    const { loan, investment_id, user_id } = context as any;
    investment = await Investments.findOne({
      where: {
        id: investment_id,
      },
    });

    // Call the postInvestmentRegisterPayload function with the loan, investment, and category
    const payload: any = await postInvestmentRegisterPayload(
      loan.kftc_goods_id,
      CATEGORY_TO_LOAN_TYPE[loan.category],
      investment,
    );

    // TODO: Add the actual KFTC API call here
    // Use the isMock variable to determine whether to use the mockKFTCAPI function or the axios.post method
    const response = isMock
      ? await mockKFTCAPI()
      : await axios.post(
          `${process.env.COREA_BASE_URL}/kftc/api`,
          { data: { ...payload }, url: '/investments/register', method: 'POST' },
        );

    
    const { data, status } = response as any;

    // Check the status code of the response
    if (status !== 200) {
      await sendSSE({
        loanId: loan.id,
        userId: user_id,
        message: data.rsp_message || 'postInvestmentRegister failed',
        isSuccess: false,
      });
      throw Error('Error in KFTC API call');
    }
    await sendSSE({
      loanId: loan.id,
      userId: user_id,
      investmentState: investment.state,
      message: '',
      isSuccess: true,
    });

    console.log('KFTC API response:', data);
    // Return an object with the context and the investment ID
    return {
      ...context,
      result: {
        inv_id: investment.id,
      },
    };
  } catch (error) {
    // Call the sendSSE activity with the loan ID, user ID, and  console error message
    console.error(error);
    return await OnError(context.investment_id);
  }
}