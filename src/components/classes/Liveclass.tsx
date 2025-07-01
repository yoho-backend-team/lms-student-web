import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { getLiveClassDetails } from '@/features/classes/services';
import { useEffect } from 'react';

interface ClassItem {
  day: string;
  topic: string;
  joinLink: string;
  duration: string;
}

const Liveclass = () => {

  const classes: ClassItem[] = [
    {
      day: 'Day 1',
      topic: 'HTML',
      joinLink: 'www.google.com',
      duration: '45 min'
    },
    {
      day: 'Day 2',
      topic: 'CSS',
      joinLink: 'www.example.com',
      duration: '60 min'
    }
  ];

  // Header data
  const headers = ['Day', 'Topic', 'Join Link', 'Duration', 'Action'];

  return (
    <div className='m-2'>
      <Card style={{ backgroundColor: COLORS.bg_Colour }}>
        {/* Header Card */}
        <Card className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white mx-4 p-4'>
          <table className="w-full">
            <thead>
              <tr className='flex justify-around items-center !text-white' style={{ ...FONTS.heading_03 }}>
                  {headers.map((header, index) => (
                  <td key={index}>{header}</td>
                ))}
              </tr>
            </thead>
          </table>
        </Card>

        {/* Class Items */}
        {classes.map((classItem, index) => (
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
                  <td>{classItem.day}</td>
                  <td>{classItem.topic}</td>
                  <td>
                    <a className='!text-[#0400ff]' href={classItem.joinLink}>
                      {classItem.joinLink}
                    </a>
                  </td>
                  <td>{classItem.duration}</td>
                  <td>
                    <Button
                      className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
                      variant="outline"
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