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

      console.log(taskUpdateData, "fata")
      const response = await updatetaskdata(taskUpdateData)
      console.log(response, 'update api response')

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <Card className="w-[800px] bg-[#EBEFF3] p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Assessment Page</h2>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Details */}
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
            <input className="w-full p-2 rounded-lg bg-white shadow-inner" value={task.overview ?? 'N/A'} readOnly />
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
              disabled={isSubmitting}
            >
              View
            </Button>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Score</label>
            <input className="w-full p-2 rounded-lg bg-white shadow-inner" value={task.score ?? '-'} readOnly />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Status</label>
            <div className="flex">
              <Button
                className={`rounded-xl px-4 py-1 text-sm cursor-default
                  ${task.status === 'completed'
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                    : 'bg-gray-200 text-[#716F6F]'
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
              disabled={isSubmitting}
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
              <p className="text-gray-700">{task.question ?? 'No question available'}</p>
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
              <p className="text-gray-700">{task.note ?? 'No note available'}</p>
              <Button onClick={() => setShowNote(false)} className="mt-4 bg-gray-200 text-black hover:bg-gray-300">
                Close
              </Button>
            </Card>
          </div>
        )}

        {/* File Upload */}
        <div className="mt-6 flex justify-between items-center">
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
                disabled={isSubmitting}
              />
              {selectedFile && (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              )}
            </div>
          )}

          <Button
            onClick={onClose}
            className="bg-gray-200 text-black hover:bg-gray-300 ml-auto"
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
