/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
//import { useEffect } from 'react';


interface LiveclassProps {
  data: any[];
}

const Liveclass: React.FC<LiveclassProps> = ({ data }) => {

  console.log(data,"data in live class")


  // Header data
  const headers = ['Day', 'Topic', 'Join Link', 'Duration', 'Action'];

  const handeljoin = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className='m2-2 w-full'>
      <Card style={{ backgroundColor: COLORS.bg_Colour }} className='w-full'>
        {/* Header Card */}
        <Card className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white mx-4 p-4'>
          <table className="w-full">
            <thead>
              <tr className='flex justify-center gap-56 items-center !text-white' style={{ ...FONTS.heading_03 }}>
                {headers?.map((header, index) => (
                  <td key={index}>{header}</td>
                ))}
              </tr>
            </thead>
          </table>
        </Card>

        {/* Class Items */}
        {data?.map((classItem, index) => (
          <Card
            key={index}
            className='overflow-y-auto scrollbar-hide bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black mx-4 p-4
                        transition-all duration-300 ease-in-out
                        hover:-translate-y-1 
                        hover:shadow-[6px_6px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)]
                        cursor-pointer"'          >
            <table className="w-full">
              <tbody>
                <tr className='flex justify-around items-center' style={{ ...FONTS.heading_06 }}>
                  <td>{classItem.day || '1'}</td>
                  <td>{classItem?.class_name}</td>
                  <td className=''>
                    <a className='!text-[#0400ff]' href={classItem.joinLink}>
                      {classItem?.video_url ? `${classItem?.video_url?.slice(0, 30)}...` : 'nill'}
                    </a>
                  </td>
                  <td>{classItem?.duration}</td>
                  <td>
                    <Button
                      className='bg-[#ebeff3] rounded-xl btnshadow text-[#716F6F] text-[14px] hover:!text-white btnhovershadow  shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] focus:!text-white'
                      variant="outline"
                      onClick={() => handeljoin(classItem?.video_url)}
                    >
                      Join Now
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