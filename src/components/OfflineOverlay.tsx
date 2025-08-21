import { useEffect, useState } from 'react';
import errorC from '@/assets/Network.png';

type OfflineOverlayProps = {
  cover?: 'full' | 'content';
};

const OfflineOverlay = ({ cover = 'full' }: OfflineOverlayProps) => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Hide chatbot when offline
    const chatbotElement = document.querySelector('.chatbot-container');
    if (chatbotElement) {
      if (isOnline) {
        chatbotElement.style.display = 'block';
      } else {
        chatbotElement.style.display = 'none';
      }
    }
  }, [isOnline]);

  if (isOnline) return null;

  const positionClass = cover === 'full' ? 'fixed inset-0' : 'absolute inset-0';

  return (
    <div className={`${positionClass} z-[9999] bg-[#EBEFF3] flex items-center justify-center p-6`}>
      <div className="flex flex-col items-center gap-6 text-center">
        <img src={errorC} alt="Network connection error" className="w-100 h-100 object-contain" />
        <h1 className="text-2xl font-bold text-gray-800">No Internet Connection</h1>
        <p className="text-gray-600">
          Please check your internet connection and try again.
        </p>
      </div>
    </div>
  );
};

export default OfflineOverlay;


