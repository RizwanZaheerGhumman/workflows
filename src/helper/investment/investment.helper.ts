import { GOODS_TYPE } from "src/constants/kftc.constants";

export const getInvestmentRegisterId = ()=>{
  const date = new Date().getFullYear()+String(new Date().getMonth()+1).padStart(2, '0')+String(new Date().getDate()).padStart(2, '0');
  const randomId = Math.floor(Math.random() * 10 ** 10);
  const investmentRegisterId = `${process.env.KFTC_ORG_CODE}_${date}_IR_${String(
    randomId,
  ).padStart(10, '0')}`;

  return investmentRegisterId;
}
export const postInvestmentRegisterPayload = async (
  goods_id,
  goods_type = GOODS_TYPE.NOTE_MORTGAGE_LOAN,
) =>{
  // const current_date = DateTime.local().toFormat("yyyyMMdd"); // import luxon DateTime
  // const investment_register_id = this.kftc_investment_register_id;// this is get from model

  // const user = await Users.findByPk(this.user_id);
  // const investor_info = await user.kftcInfo();

  // Hardcoded values for testing
  return {
    investment_register_info: {
      investment_register_id: 'INV123456',
      bank_inquiry_id: 'BANK123456',
      investment_amount: 1, // Hardcoded amount
      investment_register_dtm: '20240523120000', // Hardcoded datetime in the format "yyyyMMddHHmmss"
      status:"T100",
      investments_document_info: {
        document_confirm_date: '2024-05-23', // Hardcoded date
        document_type: 'DP99',
      },
    },
    investor_info: {
      investor_id: 'INVESTOR789',
      investor_name: 'John Doe',
      investor_email: 'john.doe@example.com',
    },
    goods_info: {
      goods_id: 'GOODS456',
      goods_type: 'Electronics',
    },
  };
};