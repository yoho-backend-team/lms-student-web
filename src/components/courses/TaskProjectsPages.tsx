import { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { FONTS } from '@/constants/uiConstants'
import { useNavigate } from 'react-router-dom'
import navigationicon from "../../assets/courses icons/navigation arrow.svg"
import CourseButton from './coursebutton'

// Modal Component (Assessment Page Style)
const TaskModal = ({ show, onClose, task }: { show: boolean; onClose: () => void; task: any }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const [showNote, setShowNote] = useState(false)

  if (!show || !task) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    if (selectedFile) {
      console.log("File submitted:", selectedFile)
      alert(`File "${selectedFile.name}" uploaded successfully!`)
      setSelectedFile(null)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <Card className="w-[800px] bg-[#EBEFF3] p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Assessment Page</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">Instructor Name</label>
            <input className="w-full p-2 rounded-lg bg-white shadow-inner" value={task.name} readOnly />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Task Type</label>
            <input className="w-full p-2 rounded-lg bg-white shadow-inner" value={task.type} readOnly />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Task Name</label>
            <input className="w-full p-2 rounded-lg bg-white shadow-inner" value={task.task} readOnly />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Task Overview</label>
            <input className="w-full p-2 rounded-lg bg-white shadow-inner" value={task.overview ?? "N/A"} readOnly />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Deadline</label>
            <input className="w-full p-2 rounded-lg bg-white shadow-inner" value={task.deadline} readOnly />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Question</label>
            <Button 
              className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white"
              onClick={() => setShowQuestion(true)}
            >
              View
            </Button>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Score</label>
            <input className="w-full p-2 rounded-lg bg-white shadow-inner" value={task.score ?? "-"} readOnly />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Status</label>
            <div className="flex">
              <Button
                className={`rounded-xl px-4 py-1 text-sm cursor-default
                  ${task.status === 'completed'
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                    : 'bg-gray-200 text-[#716F6F] hover:bg-gradient-to-l hover:from-[#7B00FF] hover:to-[#B200FF] hover:text-white'
                  }`}
              >
                {task.status}
              </Button>
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600 mb-1">Note</label>
            <Button 
              className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white"
              onClick={() => setShowNote(true)}
            >
              View
            </Button>
          </div>
        </div>

        {/* Question Popup */}
        {showQuestion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Question</h3>
              <p className="text-gray-700">{task.question ?? "No question available"}</p>
              <Button onClick={() => setShowQuestion(false)} className="mt-4 bg-gray-200 text-black hover:bg-gray-300">
                Close
              </Button>
            </Card>
          </div>
        )}

        {/* Note Popup */}
        {showNote && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Note</h3>
              <p className="text-gray-700">{task.note ?? "No note available"}</p>
              <Button onClick={() => setShowNote(false)} className="mt-4 bg-gray-200 text-black hover:bg-gray-300">
                Close
              </Button>
            </Card>
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          {/* Only show upload if status = pending */}
          {task.status === 'pending' && (
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileChange}
                className="block text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 
                           file:rounded-lg file:border-0 file:text-sm 
                           file:font-semibold file:bg-gradient-to-r 
                           file:from-[#7B00FF] file:to-[#B200FF] file:text-white 
                           hover:file:opacity-90"
              />
              {selectedFile && (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white"
                >
                  Submit
                </Button>
              )}
            </div>
          )}

          <Button onClick={onClose} className="bg-gray-200 text-black hover:bg-gray-300 ml-auto">
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}

const Taskprojects = () => {
  const navigate = useNavigate()
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const tasks = [
    { name: 'Raji sukla', type: 'task', task: 'Larum ipsum', overview: 'Overview of task A', question: 'What is React?', note: 'Please read documentation', deadline: '26.08.2025', status: 'completed' },
    { name: 'Thamo', type: 'task', task: 'Lorem ipsum', overview: 'Overview of task B', question: 'Explain hooks', note: 'Revise useEffect', deadline: '12-06-2025', status: 'pending' },
    { name: 'Dhinesh', type: 'task', task: 'Lorem ipsum', overview: 'Overview of task C', question: 'What is Redux?', note: 'Revise state management', deadline: '21-09-2025', status: 'pending' },
    { name: 'M S Dhoni', type: 'task', task: 'Lorem ipsum', overview: 'Overview of task D', question: 'Explain lifecycle methods', note: 'Practice examples', deadline: '21-09-2025', status: 'completed' },
  ]

  return (
    <div className="w-full mx-auto p-4">
      {/* Top Bar */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#EBEFF3] text-[#333] cursor-pointer hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow"
        >
          <img src={navigationicon} />
        </Button>
        <h1 className="text-black text-2xl font-semibold">Task Projects</h1>
      </div>

      <CourseButton activeTabs={"task"} />

      <Card className="overflow-hidden bg-[#EBEFF3]">
        <div className="flex flex-col">
          {/* Header */}
          <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white p-6 ml-4 mr-4 sticky top-0 z-10 mb-4">
            <div className="grid grid-cols-5 gap-4">
              <div className="text-center" style={{ ...FONTS.heading_02 }}>Name</div>
              <div className="text-center" style={{ ...FONTS.heading_02 }}>Type</div>
              <div className="text-center" style={{ ...FONTS.heading_02 }}>Task Name</div>
              <div className="text-center" style={{ ...FONTS.heading_02 }}>Deadline</div>
              <div className="text-center" style={{ ...FONTS.heading_02 }}>Status</div>
            </div>
          </Card>

          {/* Body */}
          <div className="min-h-[500px] overflow-y-auto mx-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
            {tasks.map((task, index) => (
              <Card
                key={index}
                className="bg-[#ebeff3] p-4 mb-2 cursor-pointer hover:shadow-lg"
                onClick={() => { setSelectedTask(task); setShowModal(true) }}
              >
                <div className="grid grid-cols-5 gap-4 items-center">
                  <div className="text-center text-gray-600" style={{ ...FONTS.para_01 }}>{task.name}</div>
                  <div className="text-center text-gray-600 capitalize" style={{ ...FONTS.para_01 }}>{task.type}</div>
                  <div className="text-center text-gray-600" style={{ ...FONTS.para_01 }}>{task.task}</div>
                  <div className="text-center text-gray-600" style={{ ...FONTS.para_01 }}>{task.deadline}</div>

                  {/* Status as Button */}
                  <div className="flex justify-center">
                    <Button
                      className={`rounded-xl px-4 py-1 text-sm cursor-pointer 
                        ${task.status === 'completed'
                          ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                          : 'bg-gray-200 text-[#716F6F] hover:bg-gradient-to-l hover:from-[#7B00FF] hover:to-[#B200FF] hover:text-white'
                        }`}
                    >
                      {task.status}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      {/* Modal */}
      <TaskModal show={showModal} onClose={() => setShowModal(false)} task={selectedTask} />
    </div>
  )
}

export default Taskprojects
