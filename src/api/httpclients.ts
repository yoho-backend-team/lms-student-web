/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const backendUrl = 'https://lms-node-backend-v1.onrender.com'

const Axios = axios.create({
	baseURL: backendUrl,
	timeout: 5000000,
	headers: {
		'Content-Type': 'application/json',
	},
});

Axios.interceptors.request.use((config) => {
	const token = localStorage.getItem('authToken');

	if (token) {
		config.headers['Authorization'] = `${token ? token : ''}`;
	}
	return config;
});

Axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (
			error?.response &&
			error?.response.status == 401 &&
			error?.response?.data?.status === 'session_expired'
		) {
			localStorage.removeItem('authToken');
			window.location.reload();
		}
	}
);

class HttpClient {
	async get(
		url: string,
		params?: { id?: string; params?: { classId: any }; community?: string },
		userType?: string | undefined
	) {
		const response = await Axios.get(url, {
			params: params,
			headers: {
				'User-Type': userType,
			},
		});
		return response.data;
	}

	async post(url: string, data?: any, params?: any, userType?: string) {
		const response = await Axios.post(url, data, {
			params: params,
			headers: {
				'User-Type': userType,
			},
		});
		return response.data;
	}

	async update(url: string, data?: { uuid: string }, userType?: string) {
		const response = await Axios.put(url, data, {
			headers: {
				'User-Type': userType,
			},
		});
		return response?.data;
	}

	async delete(url: string, data?: { uuid: string }, userType?: string) {
		const response = await Axios.delete(url, {
			headers: {
				'Content-Type': 'multipart/form-data',
				'User-Type': userType,
			},
			params: data,
		});
		return response?.data;
	}

	async fileGet(url: string, userType?: undefined) {
		const response = Axios.get(url, {
			responseType: 'blob',
			headers: {
				'User-Type': userType,
			},
		});
		return response;
	}

	async uploadFile(url: string, data?: any, userType?: undefined) {
		const response = await Axios.post(url, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
				'User-Type': userType,
			},
		});
		return response?.data;
	}
}

export default new HttpClient();
