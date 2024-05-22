import { Investments } from '@ninetydays/orm-setup';
import { getInvestmentRegisterId } from '../../src/helper/investment/investment.helper';
import { QueryRunner, getConnection } from 'typeorm';

export async function exampleActivity(name: string): Promise<string> {
  return `Hello, ${name}!`;
}

export async function OnInit(context: object): Promise<object> {
  const { amount, skip_validation, user_id, loan_id } = context as any;
  const kftcInvestmentRegisterId = getInvestmentRegisterId();
  let investmentResponse: any;
  const queryRunner: QueryRunner = getConnection().createQueryRunner();
  const [result] = await queryRunner.query(
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
  investmentResponse = result;
  return {
    ...context,
    loan: {
      id: investmentResponse.loan_id_result,
      userId: investmentResponse.user_id_result,
      kftc_goods_id: investmentResponse.kftc_goods_id_result,
      category: investmentResponse.category_result,
    },
    investment_id: investmentResponse.investment_id_result,
  };
}
