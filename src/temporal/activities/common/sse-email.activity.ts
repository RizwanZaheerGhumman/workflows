import { olive } from "../../../config/olive/olive";

// Define the sendSSE function that takes a context object and returns a Promise object
export const sendSSE = async (context: any): Promise<string> => {
  try {
    // Call the sendSSE function of olive service with the loan ID, user ID, investment state, message, and success status
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