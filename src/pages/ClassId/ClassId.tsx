import React from 'react';
import { useParams } from 'react-router-dom';
import classImg from '../../assets/classes/Mask group.png'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ClassId = () => {
	const { id } = useParams();
	return <div>ClassId -{id}
	<div className='grid grid-cols-2 justify-between gap-10'>
        {/* Left side card */}
        <Card className='p-4'>
            <CardHeader>
                <CardTitle className='text-[#7B00FF]'> Batch No: #13</CardTitle>
                <CardDescription>
                    <h2 className='text-[#2A2A2A] font-700'>The Path Of MERN Stack</h2>
                    <p>The Path of MERN Stack involves mastering four powerful technologies: MongoDB, Express.js, React.js, and Node.js. This stack enables developers to build full-stack web applications using JavaScript from frontend to backend. .</p>
                </CardDescription>
            </CardHeader>

            <Card className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'>
                <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white p-4 mx-4">
                    <table className='w-full table-fixed text-center'>
                        <thead>
                            <tr>
                                <td>Date</td>
                                <td>Start At</td>
                                <td>End At</td>
                                <td>Duration</td>
                            </tr>
                        </thead>
                        <tbody>
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
                <h3 className='text-[#0d6efd]'>Class Meeting Link</h3>
                <h2 className='text-[#2a2a2a]'>Join The Class @9.30 AM</h2>
                <div className='grid grid-cols-2'>
                    <div>
                        <Button className="px-5
                          bg-gradient-to-l from-[#7B00FF] to-[#B200FF] 
                          text-white
                          rounded-[6px] 
                          shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]
                        ">
                          Upcoming
                        </Button>
                        <p>Make sure your presence in the class & if you are unable to attend, please inform to the coordinator</p>
                    </div>

                    <div>
                        <Button className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]" variant="outline">
                        Completed
                        </Button>
                        <p>If you are faced any issue on durating class please raise a ticket to solve.</p>
                    </div>
                </div>
            </CardContent>

            <h2>Session Notes</h2>
            <Card className='py-2 px-3 bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] '>
                Once Class finished Notes will be upload
            </Card>
        </Card>
        <Card className='p-4'>
            <CardTitle>Study Materials</CardTitle>
            <Card className='py-2 px-3 bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] '>
                Once Class finished study material videos will be upload
            </Card>
            <div>
                <img src={classImg} alt="" />
            </div>
        </Card>
    </div>
</div>;
};

export default ClassId;
