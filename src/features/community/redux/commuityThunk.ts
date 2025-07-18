// import { getAllCommunities as fetchAllCommunities } from '../../../features/community/services/communityservices';
// import { setCommunities } from '../../community/redux/communitySlice';

// export const getAllCommunities = (params:any) => async  (dispatch:any) => {
//   try {
//     const response = await fetchAllCommunities(params);
//     dispatch(setCommunities(response?.params));
//   } catch (error) {
//     console.error(error);
//   } finally {
//     // dispatch(setLoading(false));
//   }
// };



import { createAsyncThunk } from '@reduxjs/toolkit';
 import { getAllCommunities as fetchCommunitiesService } from '../../../features/community/services/communityservices';

export const getAllCommunities = createAsyncThunk(
  'community/getAllCommunities',
  async (searchParam: string, thunkAPI) => {
    try {
      const data = await fetchCommunitiesService(searchParam);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
