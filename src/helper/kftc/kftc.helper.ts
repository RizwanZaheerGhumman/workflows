/**
 * Mocks the KFTC API by returning a promise that resolves after a delay.
 * @returns A promise that resolves to an object containing the response message and status.
 */
export const mockKFTCAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { rsp_message: 'Success' }, status: 200 });
    }, 1000);
  });
}