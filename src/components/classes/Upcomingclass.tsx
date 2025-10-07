/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface LiveclassProps {
  data: any[]; 
}

const Liveclass: React.FC<LiveclassProps> = ({ data }) => {
  const headers = ['Day', 'Topic', 'Join Link', 'Duration', 'Action'];

  return (
    <div className='mt-2 w-full'>
      <Card style={{ backgroundColor: COLORS.bg_Colour }}>
        {/* Header Card - Hidden on mobile, shown on md+ */}
        <Card className='hidden md:block bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white mx-2 sm:mx-3 lg:mx-4 p-2 sm:p-3 lg:p-4'>
          <div className="w-full">
            <div className='flex justify-around items-center !text-white text-[10px] sm:text-xs lg:text-sm xl:text-base' style={{ ...FONTS.heading_03 }}>
              {headers.map((header, index) => (
                <div key={index} className='flex-1 text-center px-1'>{header}</div>
              ))}
            </div>
          </div>
        </Card>

        {/* Class Items Container */}
        <div className='px-2 sm:px-3 lg:px-4 py-2 sm:py-3 space-y-2 sm:space-y-3'>
          {data.map((classItem, index) => (
            <Card 
              key={index}
              className='overflow-hidden bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-2 sm:p-3 lg:p-4
                          transition-all duration-300 ease-in-out
                          hover:-translate-y-1 
                          hover:shadow-[6px_6px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)]
                          cursor-pointer'
            >
              {/* Mobile Layout (< 768px) - Stacked vertical layout */}
              <div className='md:hidden space-y-2.5'>
                <div className='flex justify-between items-center gap-2'>
                  <span className='font-semibold text-[#7B00FF] text-xs sm:text-sm' style={{ ...FONTS.heading_06 }}>
                    {classItem.day || '1'}
                  </span>
                  <Button
                    className='bg-[#ebeff3] rounded-lg sm:rounded-xl btnshadow text-[#716F6F] text-[10px] sm:text-xs px-2 sm:px-3 py-1 hover:!text-white btnhovershadow shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] focus:!text-white'
                    variant="outline"
                  >
                    Upcoming
                  </Button>
                </div>
                
                <div className='space-y-1.5 text-[11px] sm:text-xs' style={{ ...FONTS.heading_06 }}>
                  <div className='flex flex-wrap'>
                    <span className='font-semibold text-gray-600 mr-1'>Topic:</span>
                    <span className='break-words'>{classItem.courseDetails.course_name}</span>
                  </div>
                  
                  <div>
                    <span className='font-semibold text-gray-600'>Duration:</span>
                    <span className='ml-1'>{classItem.duration}</span>
                  </div>
                  
                  <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-gray-600'>Join Link:</span>
                    <a 
                      className='!text-[#0400ff] break-all hover:underline' 
                      href={classItem.joinLink}
                    >
                      {classItem?.video_url ? `${classItem?.video_url?.slice(0, 40)}...` : 'nill'}
                    </a>
                  </div>
                </div>
              </div>

              {/* Tablet+ Layout (>= 768px) - Table layout */}
              <div className="hidden md:flex justify-around items-center text-[10px] sm:text-xs lg:text-sm xl:text-base gap-1 sm:gap-2" style={{ ...FONTS.heading_06 }}>
                <div className='flex-1 text-center px-1 min-w-0'>
                  {classItem.day || '1'}
                </div>
                <div className='flex-1 text-center px-1 min-w-0'>
                  <span className='block truncate' title={classItem.courseDetails.course_name}>
                    {classItem.courseDetails.course_name}
                  </span>
                </div>
                <div className='flex-1 text-center px-1 min-w-0'>
                  <a 
                    className='!text-[#0400ff] hover:underline inline-block max-w-full truncate' 
                    href={classItem.joinLink}
                    title={classItem?.video_url}
                  >
                    {classItem?.video_url ? `${classItem?.video_url?.slice(0, 30)}...` : 'nill'}
                  </a>
                </div>
                <div className='flex-1 text-center px-1 min-w-0'>
                  {classItem.duration}
                </div>
                <div className='flex-1 text-center px-1 min-w-0 flex justify-center'>
                  <Button
                    className='bg-[#ebeff3] rounded-lg lg:rounded-xl btnshadow text-[#716F6F] text-[10px] sm:text-xs lg:text-sm hover:!text-white btnhovershadow shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] focus:!text-white px-2 sm:px-3 lg:px-4 py-1 lg:py-1.5 whitespace-nowrap'
                    variant="outline"
                  >
                    Upcoming
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Liveclass;