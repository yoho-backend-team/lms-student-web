import Client from '../../../api/index';

export const getStudentPayment = async (params: { paymentId: string }) => {
  const response = await Client.student.payment.get(params);
  return response;
};
