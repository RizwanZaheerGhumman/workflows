import { Investments } from "@ninetydays/orm-setup";

export const OnError = async (investmentId: number): Promise<string> => {
  try {
    // Call the cancel_investment_request_v2 stored procedure with the investmentId parameter
    await Investments.query(
      `CALL cancel_investment_request_v2(${investmentId})`,
    );
    return 'Investment Cancelled';
  } catch (error) {
    return 'Error in cancelling investment request';
  }
};