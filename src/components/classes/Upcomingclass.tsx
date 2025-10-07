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

        {/* Class Items */}
        {data.map((classItem, index) => (
          <Card
            key={index}
            className='overflow-y-auto scrollbar-hide bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black mx-4 p-4
                        transition-all duration-300 ease-in-out
                        hover:-translate-y-1 
                        hover:shadow-[6px_6px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)]
                        cursor-pointer"'          >
            <table className="">
              <tbody>
                <tr className='flex justify-center items-center gap-24' style={{ ...FONTS.heading_06 }}>
                  <td className='w-32 text-center'>{index + 1}</td>
                  <td className='w-52'>{classItem.courseDetails.course_name}</td>
                  <td className='w-72'>
                    <a className='!text-[#0400ff] text-wrap' href={classItem.joinLink}>
                      {classItem?.video_url ? `${classItem?.video_url?.slice(0, 30)}...` : 'nill'}
                    </a>
                  </td>
                  <td className='w-32'>{classItem.duration}</td>
                  <td className='w-52'>
                    <Button
                      className='bg-[#ebeff3] rounded-xl btnshadow text-[#716F6F] text-[14px] hover:!text-white btnhovershadow shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] focus:!text-white'
                      variant="outline"
                    >
                      Upcoming
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        ))}
      </Card>
    </div>
  );
};

export default Liveclass;