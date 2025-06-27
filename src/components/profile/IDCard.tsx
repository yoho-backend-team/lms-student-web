import React from 'react';
import { Download, QrCode } from 'lucide-react';

interface IDCardData {
  studentName: string;
  studentId: string;
  course: string;
  batch: string;
  rollNumber: string;
  validFrom: string;
  validUntil: string;
  institution: string;
  profileImage: string;
  bloodGroup?: string;
  emergencyContact?: string;
}

interface IDCardProps {
  data?: IDCardData;
}

const IDCard: React.FC<IDCardProps> = ({ data }) => {
  // Sample data - replace with actual data from props or API
  const idCardData: IDCardData = data || {
    studentName: 'Albert Einstein',
    studentId: 'U56TRN241',
    course: 'Theoretical Physics',
    batch: 'Batch 2024-25',
    rollNumber: 'PHY001',
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    institution: 'Classie',
    profileImage: 'https://img.freepik.com/premium-photo/character-portrait-albert-einstein-generate-by-ai_978242-594.jpg?w=2000',
    bloodGroup: 'O+',
    emergencyContact: '+1 234 567 8900'
  };

  const handleDownload = () => {
    // Implement ID card download functionality
  };

  return (
    <div className="w-full">
      <div className="rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] font-['Quicksand'] flex flex-col"
        style={{ 
          width: '110%',
          marginTop: '1rem',
          height: '73vh',
        }}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-gray-900 font-['Quicksand'] text-2xl leading-none">
              Student ID Card
            </h2>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 scrollbar-hide">
          {/* ID Card Preview */}
          <div className="mb-8 flex justify-center">
            <div className="w-80 h-[500px] bg-gradient-to-br from-[#7b00ff] to-[#9333ea] rounded-2xl shadow-[3px_3px_20px_rgba(123,0,255,0.4)] relative overflow-hidden">
              {/* Card Front */}
              <div className="h-full p-6 text-white relative flex flex-col">
                {/* Header */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold font-['Quicksand'] mb-1">{idCardData.institution}</h3>
                  <p className="text-sm font-['Quicksand'] opacity-90">STUDENT ID CARD</p>
                  <div className="w-16 h-0.5 bg-white/50 mx-auto mt-2"></div>
                </div>

                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full border-4 border-white/30 overflow-hidden bg-white/10">
                    <img 
                      src={idCardData.profileImage} 
                      alt={idCardData.studentName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Student Info */}
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold font-['Quicksand'] mb-1">{idCardData.studentName}</h4>
                  <p className="text-sm font-['Quicksand'] opacity-90">{idCardData.course}</p>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm font-['Quicksand'] flex-1">
                  <div className="flex justify-between">
                    <span className="opacity-80">Student ID:</span>
                    <span className="font-semibold">{idCardData.studentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Roll No:</span>
                    <span className="font-semibold">{idCardData.rollNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Batch:</span>
                    <span className="font-semibold">{idCardData.batch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Valid Until:</span>
                    <span className="font-semibold">{new Date(idCardData.validUntil).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex items-end justify-between mt-4">
                  {/* Left side - Course details */}
                  <div className="text-xs font-['Quicksand']">
                    <div className="mb-1">
                      <span className="opacity-80">Course Name:</span>
                      <div className="font-semibold">{idCardData.course}</div>
                    </div>
                    <div>
                      <span className="opacity-80">Duration:</span>
                      <div className="font-semibold">6 Months</div>
                    </div>
                  </div>

                  {/* Right side - Download button */}
                  <button
                    onClick={handleDownload}
                    className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                    title="Download ID Card"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>

                {/* QR Code - moved to top right */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <QrCode className="w-6 h-6" />
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              </div>
            </div>
          </div>

          {/* ID Card Details */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-6 font-['Quicksand'] text-xl leading-none">
              ID Card Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Student Name
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {idCardData.studentName}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Student ID
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {idCardData.studentId}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Course
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {idCardData.course}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Batch
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {idCardData.batch}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Roll Number
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {idCardData.rollNumber}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Blood Group
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {idCardData.bloodGroup || 'Not provided'}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Valid From
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {new Date(idCardData.validFrom).toLocaleDateString()}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Valid Until
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {new Date(idCardData.validUntil).toLocaleDateString()}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Institution
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {idCardData.institution}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Emergency Contact
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {idCardData.emergencyContact || 'Not provided'}
                </div>
              </div>
            </div>
          </div>

          {/* Card Status */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4 font-['Quicksand'] text-xl leading-none">
              Card Status
            </h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-green-800 font-['Quicksand']">Active ID Card</p>
                  <p className="text-sm text-green-600 font-['Quicksand']">Your student ID card is active and valid.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Digital Features */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4 font-['Quicksand'] text-xl leading-none">
              Digital Features
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-[#ebeff3] rounded-lg p-4 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                <div className="flex items-center gap-3">
                  <QrCode className="w-8 h-8 text-[#7b00ff]" />
                  <div>
                    <p className="font-semibold text-gray-800 font-['Quicksand']">QR Code Access</p>
                    <p className="text-sm text-gray-600 font-['Quicksand']">Quick verification and access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDCard;