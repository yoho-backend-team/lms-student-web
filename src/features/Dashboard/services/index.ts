import Client from '../../../api/index'

export const getDashBoardData = async () => {
    try {
        const response = await Client.student.reports.get('')
        console.log(response.data)
    } catch (error) {
        console.log(error, 'dashboard api')
    }
}