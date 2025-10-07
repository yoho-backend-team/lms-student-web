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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
      iconActive: NavbarIcons.DashboardActiveImg,
      iconInactive: NavbarIcons.DashboardInActiveImg,
    },
    {
      path: "classes",
      name: "Classes",
      iconActive: NavbarIcons.ClassActiveImg,
      iconInactive: NavbarIcons.ClassInActiveImg,
    },
    {
      path: "courses",
      name: "Courses",
      iconActive: NavbarIcons.CourseActiveImg,
      iconInactive: NavbarIcons.CourseInActiveImg,
    },
    {
      path: "attendance",
      name: "Attendance",
      iconActive: NavbarIcons.AttendanceActiveImg,
      iconInactive: NavbarIcons.AttendanceInActiveImg,
    },
    {
      path: "payment",
      name: "Payment",
      iconActive: NavbarIcons.PaymentActiveImg,
      iconInactive: NavbarIcons.PaymentInActiveImg,
    },
    {
      path: "community",
      name: "Community",
      iconActive: NavbarIcons.CommunityActiveImg,
      iconInactive: NavbarIcons.CommunityInActiveImg,
    },
    {
      path: "placement",
      name: "Placement",
      iconActive: NavbarIcons.PlacementActiveImg,
      iconInactive: NavbarIcons.PlacementInActiveImg,
    },
    {
      path: "spoken-english",
      name: "Spoken English",
      iconActive: NavbarIcons.CommunityActiveImg,
      iconInactive: NavbarIcons.CommunityInActiveImg,
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
        setShowMobileMenu(false);
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
    <nav className="w-full">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center gap-3 px-4 lg:px-6 py-2">
        {/* Logo */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                data-tour="logo"
                src={GetImageUrl(instituteData?.logo) ?? undefined}
                alt={instituteData?.institute_name}
                className="w-12 h-10 lg:w-14 lg:h-12 rounded-full p-1 cursor-pointer flex-shrink-0"
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

        {/* Navigation Items */}
        <div className="flex flex-1 justify-center lg:gap-8 md:gap-4 xl:gap-10 overflow-x-auto scrollbar-hide px-2">
          {navItems.map((item, index) => (
            <TooltipProvider key={item.path || index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    data-tour={`nav-${item.path || "dashboard"}`}
                    onClick={() => setshowProfileSection(false)}
                    className="flex-shrink-0"
                  >
                    <Card
                      className="bg-[#ebeff3] w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:scale-105 transition-transform duration-200"
                      style={{
                        boxShadow: isNavActive(item.path)
                          ? `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px`
                          : undefined,
                      }}
                    >
                      <img
                        src={
                          isNavActive(item.path)
                            ? item.iconActive
                            : item.iconInactive
                        }
                        alt="nav-icon"
                        className="w-5 h-5 lg:w-6 lg:h-6"
                      />
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
        <div className="flex gap-4 lg:gap-6 flex-shrink-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="notifications">
                  <Card
                    data-tour="notifications"
                    className="bg-[#ebeff3] w-10 h-10 lg:w-12 sm:h-12 sm:w-8 lg:h-8 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
                    style={{
                      boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px`,
                    }}
                  >
                    <img
                      src={NavbarIcons.NotificationImg}
                      alt="notification-bell"
                      className="w-5 h-5 lg:w-6 lg:h-6"
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
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-transparent hover:border-[#B200FF] transition-colors duration-200"
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
        </div>

        {/* Profile Dropdown */}
        {showProfileSection && (
          <Card
            className="absolute z-50 right-4 lg:right-6 top-16 lg:top-20 bg-[#ebeff3] px-4 lg:px-5 w-48 lg:w-[200px] py-4"
            style={{
              boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px`,
            }}
          >
            <div className="space-y-3">
              <Card className="bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] h-10 lg:h-12 w-full cursor-pointer flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <Link
                  className="flex items-center gap-2 w-full justify-center"
                  to="profile"
                  onClick={() => setshowProfileSection(false)}
                >
                  <img
                    src={NavbarIcons.CommunityInActiveImg}
                    alt="profile-icon"
                    className="w-6 h-6 lg:w-7 lg:h-7"
                  />
                  <p style={{ ...FONTS.para_01 }} className="text-sm lg:text-base">Profile</p>
                </Link>
              </Card>
              <Button
                className="h-10 lg:h-12 w-full flex items-center justify-center cursor-pointer bg-gradient-to-l from-[#7B00FF] to-[#B200FF] rounded-xl hover:scale-105 transition-transform duration-200"
                onClick={() => setShowLogoutModal(true)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={NavbarIcons.LoginImg}
                    alt="logout-icon"
                    className="w-6 h-6 lg:w-7 lg:h-7"
                  />
                  <p style={{ ...FONTS.para_01, color: COLORS.white }} className="text-sm lg:text-base">
                    Logout
                  </p>
                </div>
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-between items-center px-3 py-2">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <img
            src={GetImageUrl(instituteData?.logo) ?? undefined}
            alt={instituteData?.institute_name}
            className="w-10 h-8 rounded-full flex-shrink-0"
            onClick={() => navigate("/")}
          />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>

        {/* Mobile Notifications and Profile */}
        <div className="flex gap-3">
          <Link to="notifications" className="flex items-center">
            <Card className="bg-[#ebeff3] w-8 h-8 p-1 rounded-full flex items-center justify-center">
              <img
                src={NavbarIcons.NotificationImg}
                alt="notification-bell"
                className="w-8 h-8"
              />
            </Card>
          </Link>

          <div
            className="cursor-pointer"
            onClick={() => setshowProfileSection(!showProfileSection)}
          >
            <img
              src={GetImageUrl(profileDetails?.image) ?? undefined}
              alt={profileDetails?.fullName}
              className="w-9 h-9 rounded-full border-2 border-transparent hover:border-[#B200FF] flex items-center"
            />
          </div>
        </div>

        {/* Mobile Profile Dropdown */}
        {showProfileSection && (
          <Card className="absolute z-50 right-3 top-14 bg-[#ebeff3] px-4 w-40 py-3">
            <div className="space-y-2">
              <Card className="bg-[#ebeff3] shadow-inner h-9 w-full cursor-pointer flex items-center justify-center">
                <Link
                  className="flex items-center gap-2 w-full justify-center"
                  to="profile"
                  onClick={() => setshowProfileSection(false)}
                >
                  <img
                    src={NavbarIcons.CommunityInActiveImg}
                    alt="profile-icon"
                    className="w-5 h-5"
                  />
                  <p className="text-sm">Profile</p>
                </Link>
              </Card>
              <Button
                className="h-9 w-full flex items-center justify-center cursor-pointer bg-gradient-to-l from-[#7B00FF] to-[#B200FF] rounded-xl text-sm"
                onClick={() => setShowLogoutModal(true)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={NavbarIcons.LoginImg}
                    alt="logout-icon"
                    className="w-5 h-5"
                  />
                  <p className="text-white">Logout</p>
                </div>
              </Button>
            </div>
          </Card>
        )}

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="absolute top-16 left-0 right-0 bg-[#ebeff3] z-40 border-t border-gray-200 shadow-lg">
            <div className="grid grid-cols-4 gap-2 p-3">
              {navItems.map((item, index) => (
                <Link
                  key={item.path || index}
                  to={item.path}
                  className="flex flex-col items-center p-2 rounded-lg hover:bg-white transition-colors duration-200"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Card className="bg-[#ebeff3] w-12 h-12 flex items-center justify-center mb-1">
                    <img
                      src={isNavActive(item.path) ? item.iconActive : item.iconInactive}
                      alt="nav-icon"
                      className="w-6 h-6"
                    />
                  </Card>
                  <span className="text-xs text-center text-gray-700 font-medium">
                    {item.name.split(' ')[0]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={cancelLogout}
          ></div>
          <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow hover:scale-105 transition text-sm sm:text-base"
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