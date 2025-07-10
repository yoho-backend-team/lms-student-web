import type { Endpoints } from './httpTyps';

const getEndpoints = (): Endpoints => {
	return {
		auth: {
			login: '/institutes/auth/student/login',
			verify_otp: '/institutes/auth/student/verify-otp',
			forget_password: '/institutes/auth/profile/forgot-password',
			reset_password: '/institutes/auth/profile/reset-password',
			change_password: 'institutes/auth/student/change-password',
			log_out: '/institutes/auth/student/logout',
		},
		course: {
			get: `/institutes/:instituteuuid/branches/:branchuuid/course/:courseId`,
			// getwithclass: `/institutes/${institute}/branches/${branch}/course/${course}/classes`
		},
		class: {
			get: `/institutes/class/:courseId`,
			getwithId: `/institutes/class/course/`,
		},
		attendance: {
			get: '/institutes/attedance/student-attendance/',
			class_attendance: '/attendance/class',
		},
		payments: {
			getFees: `/api/institutes/payments/student-fee/`,
		},
		ticket: {
			create: '/institutes/student-ticket/create',
			get: '/institutes/student-ticket/getall',
			getById: '/institutes/student-ticket/',
		},
		notification: {
			get: '/api/institutes/students/notifications/',
			update_status: '/institutes/students/notifications/status/',
			delete: `/institutes/students/notifications/student-notifications/`,
		},
		activity: {
			get: `institutes/user/activity/`,
		},
		faq: {
			// get: `institutes/faq/category?instituteid=${getStudentDetails()?.institute_id?.uuid}&branchid=${getStudentDetails()?.branch_id?.uuid}`,
			get: `institutes/faq/all`,
		},
		help: {
			get: `/helpcenter?instituteid=:instituteuuid`,
		},

		reports: {
			get: '/institutes/reports/users/student',
		},
		community: {
			get: `/institutes/community/course/:courseId`,
			get_messages: `/institutes/community/messages/all/`,
		},
		profile: {
			get: `/api/institutes/auth/profile/me/`,
			// update: `/institutes/auth/student/update/${getStudentDetails()?.uuid}`,
			update: '/institutes/auth/profile/me/',
		},
		common: {
			file: {
				upload: '/upload/',
			},
		},
	};
};

const Http_Endpoints = getEndpoints();

export default Http_Endpoints;
