/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api/index'

export const getDashBoardData = async () => {
    try {
        const response = await Client.student.reports.get()
        return response
    } catch (error: any) {
        throw new Error(error.message)
    }
}