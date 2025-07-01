import { getAllCommunities as fetchAllCommunities } from '../../../features/community/services/communityservices';
import { setCommunities } from '../../community/redux/communitySlice';

export const getAllCommunities = (data: string) => async  (dispatch:any) => {
  try {
    const response = await fetchAllCommunities(data);
    dispatch(setCommunities(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    // dispatch(setLoading(false));
  }
};
