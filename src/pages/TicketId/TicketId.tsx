import React from 'react';
import { useParams } from 'react-router-dom';


const TicketId = () => {
	const { id } = useParams(); // Extract ticket ID from URL

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Ticket</h1>
				<h2 className="text-lg font-semibold text-gray-700">TICKET ID: #{id}</h2>
			</div>

			
		</div>
	);
};

export default TicketId;
