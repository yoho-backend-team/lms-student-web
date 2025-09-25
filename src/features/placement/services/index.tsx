/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api/index';

export const getPlacement = async (params: any) => {
  const response = await Client.placement.get(params)
  if (response) {
    return response;
  }
};
