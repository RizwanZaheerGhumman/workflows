export const mockKFTCAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { rsp_message: 'Success' }, status: 200 });
    }, 1000);
  });
}