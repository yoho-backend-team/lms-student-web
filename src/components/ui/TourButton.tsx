import React, { useEffect } from 'react';
import { createTour, tourTheme } from '@/utils/tourConfig';

const TourButton: React.FC = () => {
  const startTour = () => {
    const styleElement = document.createElement('style');
    styleElement.textContent = tourTheme;
    document.head.appendChild(styleElement);
    
    const tour = createTour();
    tour.drive();
  };

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        startTour();
        localStorage.setItem('hasSeenTour', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
};

export default TourButton;