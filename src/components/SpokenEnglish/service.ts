/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateEngSpeak } from '@/features/Profile/reducers/ProfileSlice'
import Client from '../../api/index'

const speakEngUpdate = async (data: any) => {
    const response = await Client.speak_eng.put(data)
    return response
}

export const speakEngUpdateThunks = (data: any) => async (dispatch: any) => {
    try {
        dispatch(updateEngSpeak(data))
        await speakEngUpdate(data)
    } catch (error) {
        console.warn(error, "spoken eng")
    }
}