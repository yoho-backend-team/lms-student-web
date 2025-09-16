import type { RootState } from "@/store/store";

export const selectCommunities = (state: RootState) => state.community.data;
export const selectMessages = (state: RootState) => state.community.data;
// export const selectLoading = (state) => state.communities.loading;
