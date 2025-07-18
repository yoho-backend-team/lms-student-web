// import { createAsyncThunk } from '@reduxjs/toolkit';
 import { getAllCommunities } from '../../../features/community/services/communityservices';
import { setCommunities } from './communitySlice';

export const getAllCommunitiesData = (params:any) => async  (dispatch:any) => {
  try {
    const response = await getAllCommunities(params);
    dispatch(setCommunities(response));
  } catch (error) {
    console.error(error);
  } 
  // finally {
    // dispatch(setLoading(false));
  // }
};





// export const getAllCommunities = createAsyncThunk(
//   'community/getAllCommunities',
//   async (searchParam: string, thunkAPI) => {
//     try {
//       const data = await fetchCommunitiesService(searchParam);
//       console.log('thunks data:',data);
//       return data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );
