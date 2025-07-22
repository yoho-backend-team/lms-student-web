// thunks.ts
import { getHelp } from './FaqSlice';
import { getStudentFaq } from './service/index';

export const getFaqThunk = () => {
  return async (dispatch: any) => {
    try {
      const response = await getStudentFaq();
      dispatch(getHelp(response.data));
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };
};
