/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card } from "../ui/card";
import { NavbarIcons } from "@/assets/icons/navbar";
import { COLORS, FONTS } from "@/constants/uiConstants";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext/AuthContext";
import { getStudentLogoutClient } from "@/features/Authentication/services";
import { toast } from "react-toastify";
import { GetImageUrl } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile } from "@/features/Profile/reducers/selectors";
import { getStudentProfileThunk } from "@/features/Profile/reducers/thunks";
import type { AppDispatch } from "@/store/store";
import { useInstituteData } from "@/hooks/DashboardData/useInstitute";
import { MdManageAccounts } from "react-icons/md";

import { SiEngadget } from "react-icons/si";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { IoBriefcase } from "react-icons/io5";
import { IoLogoWechat } from "react-icons/io5";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileSection, setshowProfileSection] = useState(false);
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const profileDetails = useSelector(selectProfile);
  const instituteData = useInstituteData();

  useEffect(() => {
    dispatch(getStudentProfileThunk({}));
  }, [dispatch]);

  const navItems = [
    {
      path: "",
      name: "Dashboard",
      iconActive: <RiDashboardHorizontalFill style={{ width: 24, height: 24, color: "#7B00FF" }} />,
      iconInactive: <RiDashboardHorizontalFill style={{ width: 24, height: 24, color: "#716F6F" }} />,
    },
    {
      path: "classes",
      name: "Classes",
      iconActive: <MdGroups style={{ width: 24, height: 24, color: "#7B00FF" }} />,
      iconInactive: <MdGroups style={{ width: 24, height: 24, color: "#716F6F" }} />,
    },
    {
      path: "courses",
      name: "Courses",
      iconActive: <GoClockFill style={{ width: 24, height: 24, color: "#7B00FF" }} />,
      iconInactive: <GoClockFill style={{ width: 24, height: 24, color: "#716F6F" }} />,
    },
    {
      path: "attendance",
      name: "Attendance",
      iconActive: <FaCalendarAlt style={{ width: 24, height: 24, color: "#7B00FF" }} />,
      iconInactive: <FaCalendarAlt style={{ width: 24, height: 24, color: "#716F6F" }} />,
    },
    {
      path: "payment",
      name: "Payment",
      iconActive: <MdPayment style={{ width: 24, height: 24, color: "#7B00FF" }} />,
      iconInactive: <MdPayment style={{ width: 24, height: 24, color: "#716F6F" }} />,
    },
    {
      path: "community",
      name: "Community",
      iconActive: <IoLogoWechat style={{ width: 24, height: 24, color: "#7B00FF" }} />,
      iconInactive: <IoLogoWechat style={{ width: 24, height: 24, color: "#716F6F" }} />,
    },
    {
      path: "placement",
      name: "Placement",
      iconActive: <IoBriefcase style={{ width: 24, height: 24, color: "#7B00FF" }} />,
      iconInactive: <IoBriefcase style={{ width: 24, height: 24, color: "#716F6F" }} />,
    },
    {
      path: "spoken-english",
      name: "Spoken English",
      iconActive: <SiEngadget style={{ width: 24, height: 24, color: "#7B00FF" }} />,
      iconInactive: <SiEngadget style={{ width: 24, height: 24, color: "#716F6F" }} />,
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await getStudentLogoutClient({});
      if (response) {
        toast.success("Logout successful!", {
          style: { backgroundColor: "green", color: "white" },
        });
        setshowProfileSection(false);
        setShowLogoutModal(false);
        logout();
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error("Logout failed. Please try again.", {
        style: { backgroundColor: "red", color: "white" },
      });
      setShowLogoutModal(false);
    }
  };

  const cancelLogout = () => setShowLogoutModal(false);

  const isNavActive = (itemPath: string) => {
    if (itemPath === "" && location.pathname === "/") return true;
    if (
      location.pathname === `/${itemPath}` ||
      location.pathname.startsWith(`/${itemPath}/`)
    ) {
      return true;
    }
    if (itemPath === "courses" && location.pathname.startsWith("/course/")) {
      return true;
    }

    return false;
  };

  return (
    <nav>
      <div className="flex justify-between gap-3 px-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                data-tour="logo"
                src={GetImageUrl(instituteData?.logo) ?? undefined}
                alt={instituteData?.institute_name}
                className="w-14 h-12 rounded-full p-1 cursor-pointer"
                onClick={() => {
                  navigate("/");
                  setshowProfileSection(false);
                }}
              />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="bg-[#B200FF] text-white px-3 py-2 rounded-md"
            >
              <p>Dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex lg:gap-10 md:gap-5">
          {navItems.map((item, index) => (
            <TooltipProvider key={item.path || index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    data-tour={`nav-${item.path || "dashboard"}`}
                    onClick={() => setshowProfileSection(false)}
                  >
                    <Card
                      className="bg-[#ebeff3] w-[48px] h-[48px] flex items-center justify-center shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                      style={{
                        boxShadow: isNavActive(item.path)
                          ? `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px`
                          : undefined,
                      }}
                    >
                      <div>
                        {isNavActive(item.path) ? item.iconActive : item.iconInactive}
                      </div>
                      {/* <img
                        src={
                          isNavActive(item.path)
                            ? item.iconActive
                            : item.iconInactive
                        }
                        alt="nav-icon"
                        style={{ width: 24, height: 24 }}
                      /> */}
                    </Card>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#B200FF] text-white px-3 py-2 rounded-md"
                >
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* Notifications and Profile */}
        <div className="flex gap-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="notifications">
                  <Card
                    data-tour="notifications"
                    className="bg-[#ebeff3] w-[48px] h-[48px] rounded-full flex items-center justify-center"
                    style={{
                      boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px`,
                    }}
                  >
                    <img
                      src={NavbarIcons.NotificationImg}
                      alt="notification-bell"
                      style={{ width: 24, height: 24 }}
                    />
                  </Card>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-[#B200FF] text-white px-3 py-2 rounded-md"
              >
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="cursor-pointer"
                  data-tour="profile"
                  onClick={() => setshowProfileSection(!showProfileSection)}
                >
                  <img
                    src={GetImageUrl(profileDetails?.image) ?? undefined}
                    alt={profileDetails?.fullName}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-[#B200FF] text-white px-3 py-2 rounded-md"
              >
                <p>Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Profile Dropdown */}
          {showProfileSection && (
            <Card
              className="absolute z-50 right-6 top-20 bg-[#ebeff3] px-5 w-[200px] h-[156px]"
              style={{
                boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px`,
              }}
            >
              <Card style={{ ...FONTS.para_01 }} className="bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] h-[48px] w-[160px] cursor-pointer flex gap-2 justify-center btnhovershadow hover:!text-white">
                <Link
                  className="flex justify-center gap-2"
                  to="profile"
                  onClick={() => setshowProfileSection(false)}
                >
                  <MdManageAccounts style={{ width: 28, height: 28 }} />
                  <p className=" hover:!text-white">Profile</p>
                </Link>
              </Card>
              <Button
                className="h-[48px] w-[160px] flex justify-center cursor-pointer
                                bg-gradient-to-l from-[#7B00FF] to-[#B200FF] rounded-xl"
              >
                <div
                  className="flex gap-2"
                  onClick={() => setShowLogoutModal(true)}
                >
                  <img
                    src={NavbarIcons.LoginImg}
                    alt="logout-icon"
                    style={{ width: 28, height: 28 }}
                  />
                  <p style={{ ...FONTS.para_01, color: COLORS.white }}>
                    Logout
                  </p>
                </div>
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={cancelLogout}
          ></div>
          <div className="relative bg-white w-96 rounded-2xl shadow-xl p-6 text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow hover:scale-105 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;