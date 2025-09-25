/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
// import style from './style.module.css'
import InstituteDetails from "@/components/dashboard/InstituteDetails";
import ProfileCard from "@/components/dashboard/ProfileCard";
import CourseProgress from "@/components/dashboard/CourseProgress";
import Attendance from "@/components/dashboard/Attendance";
import Payment from "@/components/dashboard/Payment";
import Assesments from "@/components/dashboard/Assesments";
import Updates from "@/components/dashboard/Updates";
import { FONTS } from "@/constants/uiConstants";
import { TabViewResponsive } from "@/hooks/TabViewResponce/TabViewResponsive";
import DashCalender from "@/components/ui/calendarDash";
import { useDispatch } from "react-redux";
import { getDashBoardReports } from "@/features/Dashboard/reducers/thunks";
import { useLoader } from "@/context/LoadingContext/Loader";
import TourButton from "@/components/ui/TourButton";

const Dashboard: React.FC = () => {
  const { TabView } = TabViewResponsive();
  const dispatch = useDispatch<any>();
  const { showLoader, hideLoader } = useLoader();
  // const storedData = GetLocalStorage('user');

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

  return (
    <>
      <div
        className="flex flex-col h-full w-full p-5 gap-5 overflow-x-hidden "
        style={{ scrollbarWidth: "none" }}
      >
        <div className="animate-slide-down">
          <TourButton />
        </div>

        {TabView ? (
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-row gap-5">
              <div className="transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg">
                <InstituteDetails />
              </div>
              <div className="transform transition-all duration-700 ease-out hover:scale-[1.02]">
                <ProfileCard />
              </div>
            </div>
            <div className="flex flex-row gap-5">
              <div className="transform transition-all *:h-80 duration-500 ease-out hover:scale-[1.02] hover:shadow-lg">
                <Assesments />
              </div>
              <div className="transform transition-all *:h-80 duration-500 ease-out hover:scale-[1.02] hover:shadow-lg">
                <CourseProgress />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-8 gap-5 justify-between ">
            <div className="col-span-2 col-start-1 transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg">
              <InstituteDetails />
            </div>
            <div className="col-span-4 transform transition-all duration-700 ease-out hover:scale-[1.02]">
              <ProfileCard />
            </div>
            <div className="col-span-2 transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg">
              <CourseProgress />
            </div>
          </div>
        )}

        {TabView ? (
          <div className="flex flex-col gap-5 animate-fade-in-up animation-delay-200">
            <div className="flex flex-row gap-5">
              <div className="transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg">
                <Attendance />
              </div>
              <div className="transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg">
                <Payment />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {/* <div className='transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg'>
								<DashCalender />
							</div> */}
            </div>
            <div className="transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg">
              <Updates />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            <div className="transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg">
              <Attendance />
            </div>
            <div className="transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg">
              <Payment />
            </div>
            <div className="transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg">
              <Assesments />
            </div>
          </div>
        )}

        {!TabView && (
          <div className="grid grid-cols-3 gap-5 ">
            <div className="col-span-2 transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg">
              <Updates />
            </div>
            <div className="transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg">
              <DashCalender />
            </div>
          </div>
        )}

        <div className="flex flex-row justify-between ">
          <div className="divshadow p-2 rounded-xl transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50">
            <p style={{ ...FONTS.heading_06 }}>
              Course Name:{" "}
              <span style={{ ...FONTS.heading_04 }}>MEARN STACK 2024</span>
            </p>
          </div>
          <div className="divshadow p-2 rounded-xl transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50">
            <p style={{ ...FONTS.heading_06 }}>
              Projects:{" "}
              <span style={{ ...FONTS.heading_04 }}>Web Development</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
