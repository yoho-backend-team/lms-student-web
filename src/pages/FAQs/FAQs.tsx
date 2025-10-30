/* eslint-disable @typescript-eslint/no-explicit-any */
import FAQInterface from '@/components/Faq/Faq';
import { getFaqThunk } from '@/features/Faq/thunks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const FAQs = () => {
	const dispatch = useDispatch<any>();

	useEffect(() => {
		dispatch(getFaqThunk());
	}, [dispatch]);

	return <FAQInterface />;
};

export default FAQs;
