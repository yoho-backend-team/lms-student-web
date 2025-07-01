import Completedclass from '@/components/classes/Completedclass';
import Liveclass from '@/components/classes/Liveclass';
import Upcomingclass from '@/components/classes/Upcomingclass';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { FONTS, COLORS } from '@/constants/uiConstants';
import { getLiveClassDetails } from '@/features/classes/liveclassdetails';

const Classes = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'completed'>('live');

  
  const books_valid = async () => {
      try {
        const response = await getLiveClassDetails({});
        console.log(response);
      }
      catch(error) {
        console.log('error on data :' ,error)
      }
  
    useEffect(() => {
      books_valid();
    }, []);
  }
  

  return (
    <div style={{ backgroundColor: COLORS.bg_Colour }} className='mt-2 px-4'>
      <h1 style={{ ...FONTS.heading_01 }} className='mb-4'>Classes</h1>

      <Card style={{ backgroundColor: COLORS.bg_Colour }} className="p-4">
        <h2 style={{ ...FONTS.heading_02 }} className='mb-4'>Online Classes</h2>

        <div className='flex flex-wrap gap-3 justify-start'>
          <Button
            style={{ ...FONTS.heading_07, color: activeTab === 'live' ? COLORS.white : undefined }}
            onClick={() => setActiveTab('live')}
            className={`w-full sm:w-auto px-5 min-w-[120px] rounded-[6px] cursor-pointer ${
              activeTab === 'live'
                ? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
                : 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
            }`}
            variant={activeTab === 'live' ? 'default' : 'outline'}
          >
            Live Class
          </Button>

          <Button
            style={{ ...FONTS.heading_07, color: activeTab === 'upcoming' ? COLORS.white : undefined }}
            onClick={() => setActiveTab('upcoming')}
            className={`w-full sm:w-auto px-5 min-w-[120px] cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
                : 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
            }`}
            variant={activeTab === 'upcoming' ? 'default' : 'outline'}
          >
            Upcoming Classes
          </Button>

          <Button
            style={{ ...FONTS.heading_07, color: activeTab === 'completed' ? COLORS.white : undefined }}
            onClick={() => setActiveTab('completed')}
            className={`w-full sm:w-auto px-5 min-w-[120px] cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
                : 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
            }`}
            variant={activeTab === 'completed' ? 'default' : 'outline'}
          >
            Completed Classes
          </Button>
        </div>
      </Card>

      <div className="mt-6">
        {activeTab === 'live' && <Liveclass />}
        {activeTab === 'upcoming' && <Upcomingclass />}
        {activeTab === 'completed' && <Completedclass />}
      </div>
    </div>
  );
};

export default Classes;
