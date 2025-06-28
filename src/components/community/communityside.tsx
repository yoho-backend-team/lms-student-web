import {useState} from 'react';
import msgframe from "../../assets/Frame 5185.png";
import doubleicon from '../../assets/Group 210.png';


const communityside = () => {
  const [selectedChat, setSelectedChat] = useState(null);

 const chats = [
    {
      id: 1,
      name: "MERN 2025",
      lastMessage: "Hii",
      time: "1.15pm",
      members: "3 Member",
      userName: "LISTENAL",
      date: "12/11/2025",
      chatTime: "1:00 PM"
    },

  ];

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };


  return (
    <>
      <div className='flex flex-col lg:flex-row p-4 gap-4'>
        <div className="w-full lg:w-[400px] xl:w-[500px] h-[600px] bg-[#EBEFF3] rounded-xl shadow-2xl overflow-hidden 
                      transform transition-all hover:-translate-y-1 hover:shadow-3xl">
          <div className="relative p-4 bg-[#EBEFF3]">
            <div className="absolute inset-0 border-2 border-gray-100 rounded-t-xl pointer-events-none"></div>
                    
                  
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-3 h-10 pl-10 bg-[#EBEFF3] border-2 border-[#F4F7F9] rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          shadow-inner hover:shadow-md transition-shadow"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

         <div className="p-4 bg-[#EBEFF3] h-[calc(600px-80px)] border-2 border-[#EBEFF3] rounded-b-xl relative overflow-y-auto">
            <div className="absolute inset-0 border-2 border-white rounded-b-xl pointer-events-none"></div>


 {chats.map(chat => (          
 <div  key={chat.id}  className={`"relative z-10 flex items-center justify-between p-3 bg-[#EBEFF3] rounded-lg 
                           transform transition-all hover:scale-[1.02] mb-3
                           border border-gray-200 hover:border-blue-200 shadow-lg"
                
                ${selectedChat?.id === chat.id ? 'bg-blue-50 border-blue-300' : ''}`}
              onClick={() => handleChatClick(chat)}
            >

              <div className="flex items-center space-x-3">
                <div className="bg-gray-900 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold
                              shadow-inner hover:shadow-lg transition-shadow">
                  
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{chat.name}</h3>
                  <p className="text-sm text-gray-600">{chat.lastMessage}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xs text-gray-500">{chat.time}</p>
                <img src={doubleicon} className="mt-1 w-4 h-4 opacity-70" alt="Read receipt"/>
              </div>
            </div>
            
         ))}
          </div> 
        </div>
        

           <div className="w-2/3 flex flex-col">
        {selectedChat ? (
          <>
        
            
            <div className="p-4 border-b border-gray-200 bg-[#EBEFF3]  justify-between items-center">
              <div className='bg-gray-900 text-white rounded-full h-12 w-12 pl-10'>
                
                <h2 className="font-bold text-lg text-gray-900 ml-10 w-40">{selectedChat.name}</h2>
                <p className="text-sm text-gray-600 w-40 ml-12">{selectedChat.members}</p>
              </div>
              </div>
        
          
            <div className="flex-1 p-4 bg-[#EBEFF3] overflow-y-auto relative">
              <div className="absolute inset-0 border-2 border-white rounded-xl pointer-events-none"></div>
              
          
              <div className="relative z-10 space-y-3">
                
                <div className="bg-white p-3 rounded-lg max-w-[70%] shadow">
                  <p>Hii</p>
                  <p className="text-xs text-gray-500 text-right mt-1">1:15 PM</p>
                </div>
              </div>
            </div>

           
            <div className="p-4 border-t border-gray-200 bg-[#EBEFF3]">
              <div className="flex items-center">
                <input 
                  type="text" 
                  placeholder="Type a Message" 
                  className="flex w-80 border  border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 w-10 "
                />
                <button className="ml-[400px] bg-gray-500 text-white rounded-full p-2 hover:bg-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
        
<div className="flex-1 min-w-0 bg-[#EBEFF3] rounded-xl 
                        shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]
                        overflow-hidden transform transition-all hover:shadow-2xl shadow-lg">
          <div className="relative p-4 h-full">
            <div className="inset-0 border-2 border-gray-100 rounded-t-xl pointer-events-none"></div>
      
            <div className="p-4 md:p-10 text-center text-gray-500 bg-[#EBEFF3] rounded-b-xl h-[500px] 
                          flex items-center justify-center shadow-inner">
              <img 
                src={msgframe} 
                alt="Message frame" 
                className="max-w-full h-auto object-contain drop-shadow-lg"
              />
            </div> 
          </div>
        </div>
      )}
      </div>
      </div>
      
    </>
  )
}

export default communityside;