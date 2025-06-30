import Completedclass from '@/components/classes/Completedclass';
import Liveclass from '@/components/classes/Liveclass';
import Upcomingclass from '@/components/classes/Upcomingclass';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { FONTS, COLORS } from '@/constants/uiConstants';

const Classes = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'completed'>('live');

  return (
    <div style={{backgroundColor:COLORS.bg_Colour}} className='mt-2'>
      <h1 style={{...FONTS.heading_01}} className='mb-4'>Classes</h1>

      <Card style={{backgroundColor:COLORS.bg_Colour}}>
		<h2 style={{...FONTS.heading_02}} className='ml-6'>Online Classes</h2>
		<div className='grid grid-cols-8 items-start mb-2 px-6 gap-4'>
        <Button 
		  style={{...FONTS.heading_07, color: activeTab === 'live' ? COLORS.white : undefined}}
          onClick={() => setActiveTab('live')}
          className={`px-5 min-w-[120px] rounded-[6px]  ${
            activeTab === 'live' 
              ? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
              : 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
          }`}
		  variant={activeTab === 'live' ? 'default' : 'outline'}
        >
          Live Class
        </Button>
        <Button 
		style={{...FONTS.heading_07, color: activeTab === 'upcoming' ? COLORS.white : undefined}}
          onClick={() => setActiveTab('upcoming')}
          className={`px-5 min-w-[120px] ${
            activeTab === 'upcoming'
              ? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
              : 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
          }`}
          variant={activeTab === 'upcoming' ? 'default' : 'outline'}
        >
          Upcoming Classes
        </Button>
        <Button 
		style={{...FONTS.heading_07, color: activeTab === 'completed' ? COLORS.white : undefined}}
          onClick={() => setActiveTab('completed')}
          className={`px-5 min-w-[120px] ${
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

      <div className="mt-4">
        {activeTab === 'live' && <Liveclass />}
        {activeTab === 'upcoming' && <Upcomingclass />}
        {activeTab === 'completed' && <Completedclass />}
      </div>
    </div>
  );
};

export default Classes;