import { getInvestmentRegisterId, postInvestmentRegisterPayload } from '../../src/helper/investment/investment.helper';
import 'dotenv/config';
import { QueryRunner, getConnection } from 'typeorm';
import axios from 'axios';
import { CATEGORY_TO_LOAN_TYPE } from 'src/constants/kftc.constants';

export async function exampleActivity(name: string): Promise<string> {
  return `Hello, ${name}!`;
}

export async function OnInit(context: object): Promise<object> {
  const { amount, skip_validation, user_id, loan_id } = context as any;
  const kftcInvestmentRegisterId = getInvestmentRegisterId();
  let investmentResponse: any;
  // const queryRunner: QueryRunner = getConnection().createQueryRunner();
  // const [result] = await queryRunner.query(
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
  // investmentResponse = result;
  return {
    ...context,
    loan: {
      id: 1,//investmentResponse.loan_id_result,
      userId: 2 ,//investmentResponse.user_id_result,
      kftc_goods_id: 1, //investmentResponse.kftc_goods_id_result,
      category: 'abc',//investmentResponse.category_result,
    },
    investment_id: 1,//investmentResponse.investment_id_result,
  };
}
export async function KFTC(context: object): Promise<any> {
  const { loan, investment_id,user_id } = context as any;
  // const user = await Users.findBy(user_id);
  // const investment = await Investments.findBy(investment_id);
  // TODO: Implement the logic to send the investment register to KFTC
  const payload =
  await postInvestmentRegisterPayload(
    loan.kftc_goods_id,
    CATEGORY_TO_LOAN_TYPE[loan.category],
  );
 
  // try {
  //   const response = await axios.post(`${process.env.COREA_BASE_URL}/api/v2/investments/register`,postInvestmentRegisterPayload);
  //   console.log('Response from endpoint:', response.data);
  // } catch (error) {
  //   console.error('Error calling endpoint:', error);
  // }
  return {
    ...context,
    result:{
      inv_id:1,
    }
  };
}
