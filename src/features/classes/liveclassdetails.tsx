import Client from '../../api/index'

export const getLiveClassDetails = async(params: any) => {
    try{
        const response = await Client.student.class.get(params);
        console.log(response);
    }
    catch (error: any) {
		console.error(
			'Error fetching booking cart:',
			error?.response || error?.message || error
		);
}
}