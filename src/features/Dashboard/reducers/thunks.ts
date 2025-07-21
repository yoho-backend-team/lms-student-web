import { getDashBoardData } from "../services"
import { setDashBoard } from "./slices"

export const getDashBoardReports = async (dispatch?: any) => {
    try {
        const response: any = await getDashBoardData()
        console.log(response, "dashboard")
        dispatch(setDashBoard(response))
        return response
    } catch (error) {
        console.log(error)
    }
}