import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export const createTour = () => {
  return driver({
    showProgress: true,
    onDestroyed: () => {
      localStorage.setItem('hasSeenTour', 'true');
    },
    steps: [
      {
        element: '[data-tour="logo"]',
        popover: {
          title: 'Institute Logo',
          description: 'Your institute logo and quick access to dashboard',
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '[data-tour="nav-dashboard"]',
        popover: {
          title: 'Dashboard',
          description: 'View your overview and key metrics',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '[data-tour="nav-classes"]',
        popover: {
          title: 'Classes',
          description: 'Access your scheduled classes and recordings',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '[data-tour="nav-courses"]',
        popover: {
          title: 'Courses',
          description: 'Browse and manage your enrolled courses',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '[data-tour="nav-attendance"]',
        popover: {
          title: 'Attendance',
          description: 'Track your attendance records',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '[data-tour="nav-payment"]',
        popover: {
          title: 'Payment',
          description: 'Manage your payments and billing',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '[data-tour="nav-community"]',
        popover: {
          title: 'Community',
          description: 'Connect with peers and instructors',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '[data-tour="nav-placement"]',
        popover: {
          title: 'Placement',
          description: 'Access placement opportunities and resources',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '[data-tour="notifications"]',
        popover: {
          title: 'Notifications',
          description: 'Stay updated with important announcements',
          side: 'left',
          align: 'center'
        }
      },
      {
        element: '[data-tour="profile"]',
        popover: {
          title: 'Profile Menu',
          description: 'Access your profile settings and logout',
          side: 'left',
          align: 'center'
        }
      },

    ],
    popoverClass: 'tour-popover',
    overlayColor: 'rgba(0, 0, 0, 0.4)',
    smoothScroll: true,
    allowClose: true,
    disableActiveInteraction: false
  });
};

export const tourTheme = `
  .tour-popover {
    background: linear-gradient(135deg, #ebeff3 0%, #f8fafc 100%);
    border: 1px solid rgba(189, 194, 199, 0.3);
    border-radius: 12px;
  }
  
  .tour-popover .driver-popover-title {
    color: #1f2937;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  .tour-popover .driver-popover-description {
    color: #4b5563;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .tour-popover .driver-popover-next-btn {
    background: linear-gradient(135deg, #7B00FF 0%, #B200FF 100%);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: 500;
    
  }
  
  .tour-popover .driver-popover-prev-btn {
    background: #ebeff3;
    color: #4b5563;
    border: 1px solid rgba(189, 194, 199, 0.3);
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: 500;
  }
  
  .tour-popover .driver-popover-close-btn {
    background: #f3f4f6;
    color: #6b7280;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;