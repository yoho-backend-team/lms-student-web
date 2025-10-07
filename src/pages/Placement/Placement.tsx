/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useLoader } from '@/context/LoadingContext/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { FONTS } from '@/constants/uiConstants';
import img from '../../../src/assets/classes/Group 197.png'
import { selectPlacementData } from '@/features/placement/reducers/selectors';
import { getPlacementthunks } from '@/features/placement/reducers/thunks';
import { GetLocalStorage } from '@/utils/helper';

interface Company {
  name: string;
  email: string;
  phone: number;
  address: string;
  _id: string;
}

interface Job {
  name: string;
  description: string;
  skils: string[];
  _id: string;
}

interface Schedule {
  interviewDate: string;
  venue: string;
  address: string;
  _id: string;
}

interface PlacementItem {
  _id: string;
  company: Company;
  job: Job;
  schedule: Schedule;
  createdAt: string;
  updatedAt: string;
}

const Placement: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { showLoader, hideLoader } = useLoader();
  const placementData = useSelector(selectPlacementData) as PlacementItem[];
  const studentData = GetLocalStorage('user');

  useEffect(() => {
    dispatch(getPlacementthunks({ studentId: studentData?._id }));
  }, [dispatch, studentData?._id]);

  useEffect(() => {
    (async () => {
      try {
        showLoader();
        const timeoutId = setTimeout(() => {
          hideLoader();
        }, 5000);
        const response = await dispatch(getDashBoardReports());
        if (response) {
          clearTimeout(timeoutId);
        }
      } finally {
        hideLoader();
      }
    })();
  }, [dispatch, hideLoader, showLoader]);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  console.log(placementData, 'placement useselectors');

  return (
    <>
      <div className='p-3 xs:p-4 sm:p-5 lg:p-6'>
        <div>
          <h1 className='text-black text-xl xs:text-2xl sm:text-3xl font-semibold mb-4 xs:mb-5 sm:mb-6' style={{ ...FONTS.heading_01 }}>
            Placement
          </h1>
        </div>

        {placementData && placementData?.length > 0 ? (
          <div className='grid gap-4 xs:gap-5 sm:gap-6'>
            {placementData.map((placement) => (
              <div 
                key={placement._id} 
                className='cursor-pointer grid grid-cols-1 lg:grid-cols-[1fr_2fr] bg-[#EBEFF3] text-[#444447] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-4 xs:p-5 sm:p-6 rounded-lg gap-4 xs:gap-5 sm:gap-6'
              >
                {/* Company Image */}
                <div className='bg-[#EBEFF3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] rounded-md w-full max-w-full lg:max-w-[400px] h-48 xs:h-56 sm:h-64 flex items-center justify-center mx-auto lg:mx-0'>
                  <img 
                    src={img} 
                    className='object-contain w-full h-full p-4' 
                    alt="Company" 
                  />
                </div>
                
                {/* Content Section */}
                <div className='grid gap-4 xs:gap-5 sm:gap-6'>
                  {/* Company and Job Details Row */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6'>
                    {/* Company Details */}
                    <div className='cursor-pointer bg-[#EBEFF3] text-[rgb(68,68,71)] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-4 xs:p-5 sm:p-6 rounded-lg grid gap-3 xs:gap-4'>
                      <h3 className='font-semibold text-base xs:text-lg sm:text-xl' style={{ ...FONTS.heading_04 }}>Company Details</h3>
                      <ul className="grid gap-2 xs:gap-3">
                        <li className="grid grid-cols-[120px_10px_1fr] xs:grid-cols-[140px_10px_1fr] gap-2 xs:gap-3 sm:gap-4">
                          <span className="text-xs xs:text-sm sm:text-base" style={{ ...FONTS.heading_07 }}>Company Name</span>
                          <span>:</span>
                          <span className="text-xs xs:text-sm sm:text-base truncate" style={{ ...FONTS.heading_04 }}>{placement?.company?.name}</span>
                        </li>
                        <li className="grid grid-cols-[120px_10px_1fr] xs:grid-cols-[140px_10px_1fr] gap-2 xs:gap-3 sm:gap-4">
                          <span className="text-xs xs:text-sm sm:text-base" style={{ ...FONTS.heading_07 }}>Company Address</span>
                          <span>:</span>
                          <span className="text-xs xs:text-sm sm:text-base break-words" style={{ ...FONTS.heading_04 }}>{placement?.company?.address}</span>
                        </li>
                        <li className="grid grid-cols-[120px_10px_1fr] xs:grid-cols-[140px_10px_1fr] gap-2 xs:gap-3 sm:gap-4">
                          <span className="text-xs xs:text-sm sm:text-base" style={{ ...FONTS.heading_07 }}>Contact Email</span>
                          <span>:</span>
                          <span className="text-xs xs:text-sm sm:text-base truncate" style={{ ...FONTS.heading_04 }}>{placement?.company?.email}</span>
                        </li>
                        <li className="grid grid-cols-[120px_10px_1fr] xs:grid-cols-[140px_10px_1fr] gap-2 xs:gap-3 sm:gap-4">
                          <span className="text-xs xs:text-sm sm:text-base" style={{ ...FONTS.heading_07 }}>Contact Number</span>
                          <span>:</span>
                          <span className="text-xs xs:text-sm sm:text-base" style={{ ...FONTS.heading_04 }}>{placement?.company?.phone}</span>
                        </li>
                      </ul>
                    </div>

                    {/* Job Details */}
                    <div className='cursor-pointer bg-[#EBEFF3] text-[rgb(68,68,71)] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-4 xs:p-5 sm:p-6 rounded-lg grid gap-3 xs:gap-4'>
                      <h3 className='font-semibold text-base xs:text-lg sm:text-xl' style={{ ...FONTS.heading_04 }}>Job Details</h3>
                      <ul className="grid gap-2 xs:gap-3">
                        <li className="grid grid-cols-[120px_10px_1fr] xs:grid-cols-[140px_10px_1fr] gap-2 xs:gap-3 sm:gap-4">
                          <span className="text-xs xs:text-sm sm:text-base" style={{ ...FONTS.heading_07 }}>Job Name</span>
                          <span>:</span>
                          <span className="text-xs xs:text-sm sm:text-base truncate" style={{ ...FONTS.heading_04 }}>{placement?.job?.name}</span>
                        </li>
                        <li className="grid grid-cols-[120px_10px_1fr] xs:grid-cols-[140px_10px_1fr] gap-2 xs:gap-3 sm:gap-4">
                          <span className="text-xs xs:text-sm sm:text-base" style={{ ...FONTS.heading_07 }}>Job Description</span>
                          <span>:</span>
                          <span className="text-xs xs:text-sm sm:text-base break-words" style={{ ...FONTS.heading_04 }}>{placement?.job?.description}</span>
                        </li>
                        <li className="grid grid-cols-[120px_10px_1fr] xs:grid-cols-[140px_10px_1fr] gap-2 xs:gap-3 sm:gap-4">
                          <span className="text-xs xs:text-sm sm:text-base" style={{ ...FONTS.heading_07 }}>Skills</span>
                          <span>:</span>
                          <span className="text-xs xs:text-sm sm:text-base break-words" style={{ ...FONTS.heading_04 }}>
                            {placement?.job?.skils.join(', ')}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Interview Details */}
                  <div className='cursor-pointer bg-[#EBEFF3] text-[rgb(68,68,71)] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-4 xs:p-5 sm:p-6 rounded-lg grid gap-3 xs:gap-4'>
                    <h3 className='font-semibold text-base xs:text-lg sm:text-xl' style={{ ...FONTS.heading_04 }}>Interview Details</h3>
                    <ul className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4">
                      <li className="flex flex-col gap-1 xs:gap-2">
                        <span className="text-xs xs:text-sm sm:text-base" style={{ ...FONTS.heading_07 }}>Interview Date</span>
                        <span className="text-xs xs:text-sm sm:text-base" style={{ ...FONTS.heading_04 }}>
                          {formatDate(placement?.schedule?.interviewDate)}
                        </span>
                      </li>
                      <li className="flex flex-col gap-1 xs:gap-2">
                        <span className="text-xs xs:text-sm sm:text-base" style={{ ...FONTS.heading_07 }}>Venue</span>
                        <span className="text-xs xs:text-sm sm:text-base break-words" style={{ ...FONTS.heading_04 }}>{placement?.schedule?.venue}</span>
                      </li>
                      <li className="flex flex-col gap-1 xs:gap-2 xs:col-span-2 lg:col-span-1">
                        <span className="text-xs xs:text-sm sm:text-base" style={{ ...FONTS.heading_07 }}>Address</span>
                        <span className="text-xs xs:text-sm sm:text-base break-words" style={{ ...FONTS.heading_04 }}>{placement?.schedule?.address}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex items-center justify-center h-48 xs:h-56 sm:h-64'>
            <p className="text-base xs:text-lg sm:text-xl" style={{ ...FONTS.heading_04 }}>No placement data available</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Placement;