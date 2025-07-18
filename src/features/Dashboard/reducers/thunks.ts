import { getDashBoardData } from "../services"
import { setDashBoard } from "./slices"

export const getDashBoardReports = () => async (dispatch) => {
    try {
        const response = await getDashBoardData()
        dispatch(setDashBoard(response))
    } catch (error) {
        console.log(error)
    }
}