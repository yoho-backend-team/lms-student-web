/* eslint-disable @typescript-eslint/no-explicit-any */
import httpClient from './httpclients';
import HTTP_END_POINTS from './http_Endpoints';

class Client {
	student = {
		login: (data: any, params: any) =>
			httpClient.post(HTTP_END_POINTS.auth.login, data, params, 'student'),
		logout: (data: any, params: any) =>
			httpClient.post(HTTP_END_POINTS.auth.log_out, data, params, 'student'),
		verifyOtp: (data: any, params: any) =>
			httpClient.post(HTTP_END_POINTS.auth.verify_otp, data, params, 'student'),
		forgetPassword: (data: any, params: any) =>
			httpClient.post(
				HTTP_END_POINTS.auth.forget_password,
				data,
				params,
				'student'
			),
		reset_password: (data: any, params: any) =>
			httpClient.post(
				HTTP_END_POINTS.auth.reset_password,
				data,
				params,
				'student'
			),
		change_password: (data: any, params: any) =>
			httpClient.post(
				HTTP_END_POINTS.auth.change_password,
				data,
				params,
				'student'
			),
		logouts: (data: any) =>
			httpClient.post(HTTP_END_POINTS.auth.log_out, {}, data, 'student'),
		course: {
			get: (params: any) =>
				httpClient.get(HTTP_END_POINTS.course.get, params, 'student'),
		},
		profile: {
			get: (params: any) =>
				httpClient.get(HTTP_END_POINTS.profile.get, params, 'student'),
			update: (data: any) =>
				httpClient.update(HTTP_END_POINTS.profile.update, data, 'student'),
		},
		class: {
			get: (params: any) =>
				httpClient.get(HTTP_END_POINTS.class.get, params, 'student'),
			getWithId: (params: { id: string }) =>
				httpClient.get(
					HTTP_END_POINTS.class.getwithId + params.id,
					params,
					'student'
				),
		},
		payment: {
			get: (params: any) =>
				httpClient.get(HTTP_END_POINTS.payments.getFees, params, 'student'),
		},
		// attendance : (params) => httpClient.get(HTTP_END_POINTS.Student.attendance,params,"student"),
		attendance: {
			get: (params: any) =>
				httpClient.get(`${HTTP_END_POINTS.attendance.get}`, params, 'student'),
			get_class_attendance: (data: { classId: any }) =>
				httpClient.get(
					`${HTTP_END_POINTS.attendance.class_attendance}/${data.classId}`,
					{ params: data }
				),
		},
		notification: {
			get: (params: any) =>
				httpClient.get(HTTP_END_POINTS.notification.get, params, 'student'),
			update: (data: { uuid: string }) =>
				httpClient.update(
					HTTP_END_POINTS.notification.update_status + data.uuid,
					data,
					'student'
				),
			delete: (data: { uuid: string }) =>
				httpClient.delete(
					HTTP_END_POINTS.notification.delete + data.uuid,
					data,
					'student'
				),
		},
		ticket: {
			create: (data: any, params: any) =>
				httpClient.post(HTTP_END_POINTS.ticket.create, data, params, 'student'),
			get: (params: any) =>
				httpClient.get(HTTP_END_POINTS.ticket.get, params, 'student'),
			getById: (params: { id: string }) =>
				httpClient.get(
					HTTP_END_POINTS.ticket.getById + params.id,
					params,
					'student'
				),
		},

		reports: {
			get: (params: any) =>
				httpClient.get(HTTP_END_POINTS.reports.get, params, 'student'),
		},
		activity: {
			get: (params: any) =>
				httpClient.get(HTTP_END_POINTS.activity.get, params, 'student'),
		},
		faq: {
			get: (params: any) =>
				httpClient.get(`${HTTP_END_POINTS.faq.get}`, params, 'student'),
		},
		help: {
			get: (params: any) =>
				httpClient.get(`${HTTP_END_POINTS.help.get}`, params, 'student'),
		},

		community: {
			get: (params: any) =>
				httpClient.get(HTTP_END_POINTS.community.get, params, 'student'),
			get_messages: (params: { community: string }) =>
				httpClient.get(
					HTTP_END_POINTS.community.get_messages + params?.community,
					params,
					'student'
				),
		},
	};

	common = {
		file: {
			upload: (data: any) =>
				httpClient.uploadFile(HTTP_END_POINTS.common.file.upload, data),
			get: (url: any) => httpClient.fileGet(url),
		},
	};
}

export default new Client();
