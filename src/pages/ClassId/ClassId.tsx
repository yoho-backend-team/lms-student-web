import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classImg from '../../assets/classes/Mask group.png'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import backImg from '../../assets/classes/back.png'

const ClassId = () => {
	const { id } = useParams();

	// handle backpage button function

	const navigate = useNavigate();
	const handleBackPage = () => {
		navigate('/classes');
	}

	return(
	 <div>
		{/* title section */}
		<div className='my-4 flex flex-row justify-start items-center gap-5'>
		<div onClick={handleBackPage} className='p-2 rounded-lg bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'>
			<img onClick={handleBackPage} src={backImg} alt="back-img" />
		</div>	
		<h1 style={{...FONTS.heading_01}} >Class Details  -{id}</h1>
		</div>

		{/* card section */}
	<div className='grid grid-cols-2 justify-between gap-10'>
        {/* Left side card */}
        <Card style={{backgroundColor:COLORS.bg_Colour}} className='p-4 mb-2'>
            <CardHeader>
                <CardTitle style={{...FONTS.heading_01}} className='!text-[#7B00FF] mb-4'> Batch No: #13</CardTitle>
                <CardDescription>
                    <h2 style={{...FONTS.heading_02}} className='text-[#2A2A2A] mb-2'>The Path Of MERN Stack</h2>
                    <p style={{...FONTS.para_01}} >The Path of MERN Stack involves mastering four powerful technologies: MongoDB, Express.js, React.js, and Node.js. This stack enables developers to build full-stack web applications using JavaScript from frontend to backend. .</p>
                </CardDescription>
            </CardHeader>

            <Card className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] mx-4'>
                <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white p-4 mx-4">
                    <table  className='w-full table-fixed text-center'>
                        <thead style={{...FONTS.para_01}} className='!text-[#ffffff]'>
                            <tr>
                                <td>Date</td>
                                <td>Start At</td>
                                <td>End At</td>
                                <td>Duration</td>
                            </tr>
                        </thead>
                        <tbody style={{...FONTS.heading_04}} className='!text-[#ffffff]'>
                            <tr>
                                <td>10 Mar 2025</td>
                                <td>9.30 Am</td>
                                <td>6.00 Pm</td>
                                <td>6 Month</td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
            </Card>

            <CardContent>
                <h3 style={{...FONTS.heading_02}} className='!text-[#0d6efd] mb-4'>Class Meeting Link</h3>
                <h2 style={{...FONTS.heading_02}} className='text-[#2a2a2a] mb-3'>Join The Class @9.30 AM</h2>
                <div className='grid grid-cols-2'>
                    <div>
                        <Button className="px-5 mb-2
                          bg-gradient-to-l from-[#7B00FF] to-[#B200FF] 
                          text-white
                          rounded-[6px] 
                          shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]
                        ">
                          Upcoming
                        </Button>
                        <p style={{...FONTS.para_01}}>Make sure your presence in the class & if you are unable to attend, please inform to the coordinator</p>
                    </div>

                    <div>
                        <Button className="mb-2 bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]" variant="outline">
                        Completed
                        </Button>
                        <p style={{...FONTS.para_01}}>If you are faced any issue on durating class please raise a ticket to solve.</p>
                    </div>
                </div>
            </CardContent>

            <h2 style={{...FONTS.heading_02}} >Session Notes</h2>
            <Card style={{...FONTS.para_01}} className='py-2 px-3 bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] '>
                Once Class finished Notes will be upload
            </Card>
        </Card>
        <Card style={{backgroundColor:COLORS.bg_Colour}} className='p-4 mb-2'>
            <CardTitle style={{...FONTS.heading_02}} >Study Materials</CardTitle>
            <Card style={{...FONTS.para_01}}  className='py-2 px-3 bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] '>
                Once Class finished study material videos will be upload
            </Card>
            <div>
                <img src={classImg} alt="" />
            </div>
        </Card>
    </div>
</div>
	)
};

export default ClassId;
