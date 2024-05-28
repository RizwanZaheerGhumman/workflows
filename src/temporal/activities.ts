import { Investments, Users } from '@ninetydays/orm-setup';
import {
  getInvestmentRegisterId,
  postInvestmentRegisterPayload,
} from '../../src/helper/investment/investment.helper';
import 'dotenv/config';
import axios from 'axios';
import { CATEGORY_TO_LOAN_TYPE } from '../../src/constants/kftc.constants';
import { olive } from '../../src/config/olive/olive';

export async function exampleActivity(name: string): Promise<string> {
  return `Hello, ${name}!`;
}

export async function OnInit(context: object): Promise<object> {
  let { amount, skip_validation, user_id, loan_id } = context as any;
  try {
    const kftcInvestmentRegisterId: string = getInvestmentRegisterId();
    // const [investmentResponse] = await Investments.query(
    //   'CALL investment_request_v2($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
    //   [
    //     amount,
    //     skip_validation,
    //     user_id,
    //     loan_id,
    //     kftcInvestmentRegisterId,
    //     0,
    //     0,
    //     '',
    //     '',
    //     0,
    //   ],
    // );
    return {
      ...context,
      loan: {
        id: 1, //investmentResponse.loan_id_result,
        userId: 2, //investmentResponse.user_id_result,
        kftc_goods_id: 1, //investmentResponse.kftc_goods_id_result,
        category: 'abc', //investmentResponse.category_result,
      },
      investment_id: 1, //investmentResponse.investment_id_result,
    };
  } catch (error) {
    await sendSSE({
      loanId: loan_id,
      userId: user_id,
      message: error.message,
      isSuccess: false,
    });
  }
}
export async function KFTC(context: any): Promise<any> {
  let investment: any;
  try {
    const { loan, investment_id, user_id } = context as any;
    const user: Users = await Users.findOne({
      where: {
        id: user_id,
      },
    });
    investment = await Investments.findOne({
      where: {
        id: investment_id,
      },
    });
    const payload: any = await postInvestmentRegisterPayload(
      loan.kftc_goods_id,
      CATEGORY_TO_LOAN_TYPE[loan.category],
      investment,
    );

    const { data, status } = await axios.post(
      `${process.env.COREA_BASE_URL}/kftc/api`,
      { data: { ...payload }, url: '/investments/register', method: 'POST' },
    );
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
    return {
      ...context,
      result: {
        inv_id: investment.id,
      },
    };
  } catch (error) {
    return await OnError(context.investment_id);
  }
}
export const OnError = async (investmentId: number): Promise<string> => {
  try {
    await Investments.query(
      `CALL cancel_investment_request_v2(${investmentId})`,
    );
    return 'Investment Cancelled';
  } catch (error) {
    return 'Error in cancelling investment request';
  }
};

export const sendSSE = async (context: any): Promise<string> => {
  try {
    await olive.sendSSE({
      loanId: context.loanId,
      userId: context.userId,
      investmentState: context.investmentState,
      message: context.message,
      isSuccess: context.isSuccess,
    });
  } catch (error) {
    return 'Error in sending SSE email notification';
  }
};
