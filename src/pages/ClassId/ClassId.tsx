import React from 'react';
import { useParams } from 'react-router-dom';

const ClassId = () => {
	const { id } = useParams();
	return <div>ClassId -{id}</div>;
};

export default ClassId;
