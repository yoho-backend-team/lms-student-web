import React from 'react';


interface Task {
  name: string;
  task: string;
  deadline: string;
  status: 'Completed' | 'Pending';
}

const Task_Projects: React.FC = () => {
  const tasks: Task[] = [
    { name: 'vijay', task: 'Lorem Ipsum', deadline: '26-06-2025', status: 'Completed' },
    { name: 'Kamal', task: 'Lorem Ipsum', deadline: '26-06-2025', status: 'Pending' },
    { name: 'Rajini', task: 'Lorem Ipsum', deadline: '26-06-2025', status: 'Completed' },
    { name: 'Surya', task: 'Lorem Ipsum', deadline: '26-06-2025', status: 'Completed' },
    { name: 'Ajith', task: 'Lorem Ipsum', deadline: '26-06-2025', status: 'Pending' },
  ];

  return (
    <div className="px-4 py-6 w-full">
      <h1 className="text-black text-2xl font-semibold mb-6">Task & Projects</h1>

     
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        <button className="bg-[#EBEFF3] text-black px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
          About
        </button>
        <button className="bg-[#EBEFF3] text-black px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
          Class Notes & Materials
        </button>
        <button className="bg-[#7b00ff] text-white px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
          Task & Projects
        </button>
        <button className="bg-[#EBEFF3] text-black px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
          Course Track
        </button>
      </div>

  
      <div className="bg-[#EBEFF3] p-6 rounded-lg w-full max-w-full shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)]">
        
        <div
          className="grid grid-cols-4 p-4 text-center font-semibold text-white rounded-lg mb-4"
          style={{
            background: 'linear-gradient(90deg, #7b00ff, #a633ff)',
            boxShadow: '-4px -4px 4px rgba(255,255,255,0.7), 5px 5px 4px rgba(189,194,199,0.75)',
          }}
        >
          <span>Name</span>
          <span>Task Name</span>
          <span>Deadline</span>
          <span>Status</span>
        </div>

        {/* Task Rows */}
        {tasks.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-4 text-center items-center p-4 mb-4 rounded-lg text-gray-700 font-medium bg-[#F4F6F8] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
          >
            <span>{item.name}</span>
            <span>{item.task}</span>
            <span>{item.deadline}</span>
            <span>
              <span
                className={`px-3 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] text-sm ${
                  item.status === 'Completed'
                    ? 'bg-green-500 text-white'
                    : 'bg-[#EBEFF3] text-gray-700'
                }`}
              >
                {item.status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task_Projects;
