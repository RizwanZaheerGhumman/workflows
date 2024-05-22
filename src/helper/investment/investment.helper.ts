export const getInvestmentRegisterId = ()=>{
  const date = new Date().getFullYear()+String(new Date().getMonth()+1).padStart(2, '0')+String(new Date().getDate()).padStart(2, '0');
  const randomId = Math.floor(Math.random() * 10 ** 10);
  const investmentRegisterId = `${process.env.KFTC_ORG_CODE}_${date}_IR_${String(
    randomId,
  ).padStart(10, '0')}`;

  return investmentRegisterId;
}