
import Completedclass from '@/components/classes/Completedclass';
import Liveclass from '@/components/classes/Liveclass';
import Upcomingclass from '@/components/classes/Upcomingclass';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React from 'react';

const Classes = () => {
	return <div>
		<h1>Classes</h1>

		<Card className='grid grid-cols-6 items-start mb-2 px-4'>
			<Button className="px-5
									  bg-gradient-to-l from-[#7B00FF] to-[#B200FF] 
									  text-white
									  rounded-[6px] 
									  shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]
									">
									  Live Class
									</Button>
			<Button className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]" variant="outline">
									Upcoming Classes
									</Button>
			<Button className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]" variant="outline">
									Completed Classes
									</Button>
		</Card>


		{/* <Liveclass /> */}
		{/* <Upcomingclass /> */}
		<Completedclass />
	</div>;

};

export default Classes;
