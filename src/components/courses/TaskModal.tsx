/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { updatetaskdata } from '@/features/Course/services/Course'
import { uploadticketfile } from '@/features/Tickets/services/Tickets'
import { GetLocalStorage } from '@/utils/helper'

interface TaskModalProps {
  show: boolean
  onClose: () => void
  task: any
}

const TaskModal = ({ show, onClose, task }: TaskModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const [showNote, setShowNote] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const user = GetLocalStorage('user')

  if (!show || !task) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setError(null)
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload')
      return
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Only PDF or image files (jpg, jpeg, png) are allowed')
      return
    }

    if (!task._id && !task.id) {
      setError('Task ID is missing. Cannot update task.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      let fileUrl: string | null = null
      const fileFormData = new FormData()
      fileFormData.append('file', selectedFile)

      const uploadResponse = await uploadticketfile(fileFormData)
      if (uploadResponse?.data?.file) {
        fileUrl = uploadResponse.data.file
      }

      const taskUpdateData = {
        student: user?._id,
        taskid: task.id,
        file: fileUrl,
        status: 'completed',
        submittedAt: new Date().toISOString(),
      }

      const response = await updatetaskdata(taskUpdateData)

      if (response && response.success) {
        alert(`File "${selectedFile.name}" uploaded successfully!`)
        setSelectedFile(null)
        onClose()
      } else {
        throw new Error(response?.message || 'Failed to update task')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit task. Please try again.')
      console.error('Submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  console.log(task, "task")

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
      <Card className="w-full max-w-sm sm:w-[800px] bg-[#EBEFF3] p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
        <h2 className="text-xl sm:text-xl font-semibold mb-4 sm:mb-6">Assessment Page</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1 text-sm">Instructor Name</label>
            <input className="w-full p-2 rounded-lg bg-white shadow-inner text-sm" value={task.name} readOnly />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 text-sm">Task Type</label>
            <input className="w-full p-2 rounded-lg bg-white shadow-inner text-sm" value={task.type} readOnly />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 text-sm">Task Name</label>
            <input className="w-full p-2 rounded-lg bg-white shadow-inner text-sm" value={task.task} readOnly />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 text-sm">Task Overview</label>
            <input className="w-full p-2 rounded-lg bg-white shadow-inner text-sm" value={task.overview ?? 'N/A'} readOnly />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 text-sm">Deadline</label>
            <input className="w-full p-2 rounded-lg bg-white shadow-inner text-sm" value={task.deadline} readOnly />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 text-sm">Question</label>
            <Button
              className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white w-full text-sm py-2"
              onClick={() => setShowQuestion(true)}
              disabled={isSubmitting}
            >
              View
            </Button>
          </div>

          <div>
            <label className="block text-gray-600 mb-1 text-sm">Score</label>
            <input className="w-full p-2 rounded-lg bg-white shadow-inner text-sm" value={task.score ?? '-'} readOnly />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 text-sm">Status</label>
            <div className="flex">
              <Button
                className={`rounded-xl px-4 py-1 text-sm cursor-default w-full
                  ${task.status === 'completed'
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                    : 'bg-gray-200 text-[#716F6F]'
                  }`}
              >
                {task?.answers[0]?.status}
              </Button>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-600 mb-1 text-sm">Note</label>
            <Button
              className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white w-full text-sm py-2"
              onClick={() => setShowNote(true)}
              disabled={isSubmitting}
            >
              View
            </Button>
          </div>
        </div>

        {showQuestion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
              <h3 className="text-lg font-semibold mb-4">Question</h3>
              <p className="text-gray-700 text-sm">{task.question ?? 'No question available'}</p>
              <Button
                onClick={() => setShowQuestion(false)}
                className="mt-4 bg-gray-200 text-black hover:bg-gray-300 w-full text-sm"
              >
                Close
              </Button>
            </Card>
          </div>
        )}

        {showNote && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
              <h3 className="text-lg font-semibold mb-4">Note</h3>
              <p className="text-gray-700 text-sm">{task.note ?? 'No note available'}</p>
              <Button
                onClick={() => setShowNote(false)}
                className="mt-4 bg-gray-200 text-black hover:bg-gray-300 w-full text-sm"
              >
                Close
              </Button>
            </Card>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          {task.answers.status === 'pending' && (
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 
                           file:rounded-lg file:border-0 file:text-sm 
                           file:font-semibold file:bg-gradient-to-r 
                           file:from-[#7B00FF] file:to-[#B200FF] file:text-white 
                           hover:file:opacity-90"
                disabled={isSubmitting}
              />
              {selectedFile && (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white w-full sm:w-auto text-sm py-2 px-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              )}
            </div>
          )}

          <Button
            onClick={onClose}
            className="bg-gray-200 text-black hover:bg-gray-300 w-full sm:w-auto text-sm py-2 px-4 mt-2 sm:mt-0"
            disabled={isSubmitting}
          >
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default TaskModal