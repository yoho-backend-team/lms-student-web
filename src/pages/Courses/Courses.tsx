import MainCourse from '@/components/courses/MainCourse';
// import { selectCourse } from '@/features/Course/reducer/selector';
import { getStudentcourse } from '@/features/Course/reducer/thunks';
// import { useInstituteData } from '@/hooks/DashboardData/useInstitute';
import type { AppDispatch } from '@/store/store';
import { GetLocalStorage } from '@/utils/helper';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoader } from '@/context/LoadingContext/Loader';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';

const Courses = () => {
	const dispatch = useDispatch<AppDispatch>();
	// const coursedata = useSelector(selectCourse);


	// const instituteuuid = useInstituteData();

	const { showLoader, hideLoader } = useLoader();


	useEffect(() => {
		const fetchData = async () => {
			const instituteId = GetLocalStorage('instituteId');
			const branchId = GetLocalStorage('branchId');
			try {
				const params = {
					instituteuuid: instituteId,
					branchuuid: branchId,
				};
				await dispatch(getStudentcourse(params));
			} catch (error) {
				console.error('Course fetch error:', error);
			}
		};

		fetchData();
	}, [dispatch]);


	useEffect(() => {
		(async () => {
			try {
				showLoader();
				const timeoutId = setTimeout(() => {
					hideLoader();
				}, 5000);
				const response = await dispatch(getDashBoardReports());
				if (response) {
					clearTimeout(timeoutId);
				}
			} finally {
				hideLoader();
			}
		})();
	}, [dispatch, hideLoader, showLoader]);


	return (
		<div>
			<MainCourse />
		</div>
	);
};

export default Courses;
