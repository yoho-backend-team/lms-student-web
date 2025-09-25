/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPlacement } from "../services";
import { getPlacementData } from "./placementSlice";

export const getPlacementthunks = (params: any) => async (dispatch: any) => {
    try {
        const response = await getPlacement(params);
        dispatch(getPlacementData(response?.data));
    } catch (error) {
        console.log(error);
    }
};