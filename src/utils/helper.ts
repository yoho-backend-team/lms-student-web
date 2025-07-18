
const backendurl = 'https://lms-node-backend-v1.onrender.com/'

export const GetImageUrl = (url: string) => {
    const data = url ? backendurl + url : null
    return data
}