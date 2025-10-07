/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllcertificate } from "../services";
import { setcertificate, setLoading } from "./slice";


export const getAllcertificatesstudent =
    (params: any) => async (dispatch: any) => {
        try {
            dispatch(setLoading(true))
            const response = await getAllcertificate(params)
            dispatch(setcertificate(response?.data));
        }
        catch (error) {
            console.log(error)
        }
    }