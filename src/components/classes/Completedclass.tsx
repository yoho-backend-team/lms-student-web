/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { COLORS, FONTS } from '@/constants/uiConstants'
import { useNavigate } from 'react-router-dom'

interface CompletedclassProps {
  data: any[];
}

const Completedclass: React.FC<CompletedclassProps> = ({ data }) => {
  const navigate = useNavigate();
  const headers = ['Title', 'Start Date', 'Start Time', 'Duration', 'Action'];

  const handleClassDetailPage = (id: string) => {
    navigate(`/class/${id}`);
  };

  return (
    <div style={{ backgroundColor: COLORS.bg_Colour }} className='mb-4 px-1 xs:px-2 sm:px-3 md:px-4'>
      <Card style={{ backgroundColor: COLORS.bg_Colour }}>
        {/* Header Card - Hidden on mobile, shown on md+ */}
        <Card className="hidden md:block bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white mx-1 xs:mx-2 sm:mx-3 md:mx-4 p-2 md:p-3 lg:p-4">
          <div className="w-full">
            <div className="flex justify-around items-center !text-white text-[9px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-base" style={{ ...FONTS.heading_03 }}>
              {headers.map((title, index) => (
                <div key={index} className='flex-1 text-center px-0.5 md:px-1 lg:px-2'>{title}</div>
              ))}
            </div>
          </div>
        </Card>

        {/* Class Items Container */}
        <div className='px-1 xs:px-2 sm:px-3 md:px-4 py-2 md:py-3 space-y-2 sm:space-y-2.5 md:space-y-3'>
          {data.length > 0 ? (
            data.map((item) => (
              <Card
                key={item.id}
                className='overflow-hidden bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-2 xs:p-2.5 sm:p-3 md:p-3.5 lg:p-4
                          transition-all duration-300 ease-in-out
                          hover:-translate-y-1 
                          hover:shadow-[6px_6px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)]
                          cursor-pointer'
              >
                {/* Mobile Layout (< 768px) - Stacked vertical layout */}
                <div className='md:hidden space-y-2 xs:space-y-2.5'>
                  <div className='flex justify-between items-start gap-1.5 xs:gap-2'>
                    <div className='flex-1 min-w-0'>
                      <div className='font-semibold text-[#7B00FF] text-[11px] xs:text-xs sm:text-sm mb-0.5 xs:mb-1 truncate' style={{ ...FONTS.heading_06 }} title={item.courseDetails.course_name}>
                        {item.courseDetails.course_name}
                      </div>
                      <div className='text-[9px] xs:text-[10px] sm:text-xs text-gray-600'>
                        {(item.start_date).slice(0, 10)} • {(item.start_time).slice(11, 16)}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleClassDetailPage(item.uuid)}
                      className="cursor-pointer bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600
                                shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]
                                text-[9px] xs:text-[10px] sm:text-xs px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 whitespace-nowrap flex-shrink-0"
                    >
                      Completed
                    </Button>
                  </div>
                  
                  <div className='text-[10px] xs:text-[11px] sm:text-xs' style={{ ...FONTS.heading_06 }}>
                    <span className='font-semibold text-gray-600'>Duration:</span>
                    <span className='ml-1'>{item.duration} Min</span>
                  </div>
                </div>

                {/* Tablet+ Layout (>= 768px) - Flexbox layout */}
                <div className="hidden md:flex justify-around items-center text-[9px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-base gap-0.5 md:gap-1 lg:gap-2" style={{ ...FONTS.heading_06 }}>
                  <div className='flex-1 text-center px-0.5 md:px-1 lg:px-2 min-w-0'>
                    <span className='block truncate' title={item.courseDetails.course_name}>
                      {item.courseDetails.course_name}
                    </span>
                  </div>
                  <div className='flex-1 text-center px-0.5 md:px-1 lg:px-2 min-w-0'>
                    <span className='block'>{(item.start_date).slice(0, 10)}</span>
                  </div>
                  <div className='flex-1 text-center px-0.5 md:px-1 lg:px-2 min-w-0'>
                    <span className='block'>{(item.start_time).slice(11, 16)}</span>
                  </div>
                  <div className='flex-1 text-center px-0.5 md:px-1 lg:px-2 min-w-0'>
                    <span className='block'>{item.duration} Min</span>
                  </div>
                  <div className='flex-1 text-center px-0.5 md:px-1 lg:px-2 min-w-0 flex justify-center'>
                    <Button
                      onClick={() => handleClassDetailPage(item.uuid)}
                      className="cursor-pointer bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600
                                shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]
                                text-[9px] md:text-[10px] lg:text-xs xl:text-sm px-1.5 md:px-2 lg:px-3 xl:px-4 py-0.5 md:py-1 lg:py-1.5 whitespace-nowrap"
                    >
                      Completed
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="bg-[#ebeff3] text-black p-3 xs:p-3.5 sm:p-4 text-center text-[11px] xs:text-xs sm:text-sm md:text-base shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]">
              No classes found matching your filters
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Completedclass;