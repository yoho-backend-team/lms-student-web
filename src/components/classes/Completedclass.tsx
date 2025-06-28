import React from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { COLORS, FONTS } from '@/constants/uiConstants'
import filterImg from '../../assets/classes/filter.png'
import { useNavigate } from 'react-router-dom'

interface CompletedItem {  
  title: string;
  date: string;
  time: string;
  duration: string;
  id: string;
}

const Completedclass = () => {
  const completed: CompletedItem[] = [
    {
      id: '1',
      title: 'HTML,CSS',
      date: "10-03-2025",
      time: '9.00 AM',
      duration: '45 min'
    },
    {
      id: '2',
      title: 'JavaScript',
      date: "10-03-2025",
      time: '9.00 AM',
      duration: '45 min'
    },
    {
      id: '3',
      title: 'React',
      date: "23-04-2025",
      time: '9.00 AM',
      duration: '45 min'
    }
  ];

  const navigate = useNavigate();
  const headers = ['Title', 'Start Date', 'Start Time', 'Duration', 'Action']; // lowercase for const

  const handleClassDetailPage = (id: string) => {
    navigate(`/class/${id}`);
  };

  return (
    <div style={{ backgroundColor: COLORS.bg_Colour }} className='mb-4'>
      <div className='flex flex-row justify-end m-3 items-center'>
        <img 
          className='p-2 rounded-lg bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] cursor-pointer' 
          src={filterImg} 
          alt="filter" 
        />
      </div>

      <Card style={{ backgroundColor: COLORS.bg_Colour }}>
        {/* Header Row */}
        <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white mx-4 p-4">
          <table className="w-full">
            <thead>
              <tr className="flex justify-around items-center !text-white" style={{ ...FONTS.heading_03 }}>
                {headers.map((title, index) => (
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </thead>
          </table>
        </Card>

        {completed.map((item) => (
          <Card 
            key={item.id}
            className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black mx-4 p-4 mb-4
                      transition-all duration-300 ease-in-out
                      hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            onClick={() => handleClassDetailPage(item.id)}
          >
            <table className="w-full">
              <tbody>
                <tr className="flex justify-around items-center" style={{ ...FONTS.heading_06 }}>
                  <td>{item.title}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.duration}</td>
                  <td>
                    <Button 
                      className="bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600
                                shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]"
                    >
                      Completed
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

export default Completedclass;