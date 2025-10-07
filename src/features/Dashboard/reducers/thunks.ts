/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreLocalStorage } from "@/utils/helper"
import { getDashBoardData } from "../services"
import { setDashBoard } from "./slices"

export const getDashBoardReports = () => async (dispatch: any) => {
    try {
        const response: any = await getDashBoardData()
        await dispatch(setDashBoard(response.data))
        StoreLocalStorage("batchId", response?.data?.batches?.[0]?._id)
        return response
    } catch (error) {
        console.log(error)
    }
}