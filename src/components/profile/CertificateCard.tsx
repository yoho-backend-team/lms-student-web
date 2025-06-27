import React from 'react';
import { Download, Award, Calendar, Clock } from 'lucide-react';

interface CertificateData {
  studentName: string;
  courseName: string;
  completionDate: string;
  duration: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  institution: string;
  certificateId?: string;
  grade?: string;
  instructor?: string;
}

interface CertificateCardProps {
  data?: CertificateData;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ data }) => {
  // Sample data - replace with actual data from props or API
  const certificateData: CertificateData = data || {
    studentName: 'Albert Einstein',
    courseName: 'HTML, CSS',
    completionDate: '15/12/2024',
    duration: '3 Months',
    status: 'Completed',
    institution: 'Classie',
    certificateId: 'CERT-HTML-CSS-2024-001',
    grade: 'A+',
    instructor: 'John Doe'
  };

  const handleDownload = () => {
    // Implement certificate download functionality
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'In Progress':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
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
              Course Certificate
            </h2>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 scrollbar-hide">
          {/* Certificate Preview */}
          <div className="mb-8 flex justify-center">
            <div className="w-96 h-[550px] bg-gradient-to-br from-[#7b00ff] to-[#9333ea] rounded-2xl shadow-[3px_3px_20px_rgba(123,0,255,0.4)] relative overflow-hidden">
              {/* Certificate Front */}
              <div className="h-full p-8 text-white relative flex flex-col">
                {/* Decorative border */}
                <div className="absolute inset-4 border-2 border-white/30 rounded-xl"></div>
                <div className="absolute inset-6 border border-white/20 rounded-lg"></div>
                
                {/* Header */}
                <div className="text-center mb-6 relative z-10">
                  <div className="flex justify-center mb-3">
                    <Award className="w-12 h-12 text-yellow-300" />
                  </div>
                  <h3 className="text-2xl font-bold font-['Quicksand'] mb-2">CERTIFICATE</h3>
                  <p className="text-lg font-['Quicksand'] opacity-90">OF COMPLETION</p>
                  <div className="w-24 h-0.5 bg-white/50 mx-auto mt-3"></div>
                </div>

                {/* Institution */}
                <div className="text-center mb-6 relative z-10">
                  <p className="text-sm font-['Quicksand'] opacity-80">This is to certify that</p>
                  <h4 className="text-xl font-bold font-['Quicksand'] mt-2 mb-2">{certificateData.studentName}</h4>
                  <p className="text-sm font-['Quicksand'] opacity-80">has successfully completed the course</p>
                </div>

                {/* Course Info */}
                <div className="text-center mb-6 relative z-10">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <h5 className="text-lg font-bold font-['Quicksand'] mb-2">{certificateData.courseName}</h5>
                    <div className="flex justify-center items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{certificateData.completionDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{certificateData.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Institution and Certificate ID */}
                <div className="mt-auto relative z-10">
                  <div className="flex justify-between items-end">
                    <div className="text-left">
                      <p className="text-xs font-['Quicksand'] opacity-80">Issued by</p>
                      <p className="font-semibold font-['Quicksand']">{certificateData.institution}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-['Quicksand'] opacity-80">Certificate ID</p>
                      <p className="font-semibold font-['Quicksand'] text-xs">{certificateData.certificateId}</p>
                    </div>
                  </div>
                </div>

                {/* Download button */}
                <button
                  onClick={handleDownload}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all duration-200 z-10"
                  title="Download Certificate"
                >
                  <Download className="w-5 h-5" />
                </button>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="absolute top-1/2 left-0 w-16 h-16 bg-white/5 rounded-full -translate-x-8"></div>
                <div className="absolute top-1/3 right-0 w-20 h-20 bg-white/5 rounded-full translate-x-10"></div>
              </div>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-6 font-['Quicksand'] text-xl leading-none">
              Certificate Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Student Name
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {certificateData.studentName}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Course Name
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {certificateData.courseName}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Completion Date
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {certificateData.completionDate}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Duration
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {certificateData.duration}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Certificate ID
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {certificateData.certificateId}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Grade
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {certificateData.grade || 'Not provided'}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                  Institution
                </label>
                <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                  {certificateData.institution}
                </div>
              </div>

              {certificateData.instructor && (
                <div className="md:col-span-2">
                  <label className="block font-medium text-gray-700 mb-2 font-['Quicksand'] text-sm leading-relaxed">
                    Instructor
                  </label>
                  <div className="bg-[#ebeff3] rounded-lg px-4 py-3 font-['Quicksand'] text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center text-gray-600">
                    {certificateData.instructor}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Certificate Status */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4 font-['Quicksand'] text-xl leading-none">
              Certificate Status
            </h3>
            <div className={`border rounded-lg p-4 ${getStatusColor(certificateData.status)}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  certificateData.status === 'Completed' ? 'bg-green-500' : 
                  certificateData.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500'
                }`}>
                  {certificateData.status === 'Completed' ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <Clock className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <p className={`font-semibold font-['Quicksand'] ${
                    certificateData.status === 'Completed' ? 'text-green-800' : 
                    certificateData.status === 'In Progress' ? 'text-blue-800' : 'text-gray-800'
                  }`}>
                    {certificateData.status} Certificate
                  </p>
                  <p className={`text-sm font-['Quicksand'] ${
                    certificateData.status === 'Completed' ? 'text-green-600' : 
                    certificateData.status === 'In Progress' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {certificateData.status === 'Completed' 
                      ? 'Your certificate is ready for download.' 
                      : certificateData.status === 'In Progress'
                      ? 'Course in progress. Certificate will be available upon completion.'
                      : 'Course not started yet.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Features */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4 font-['Quicksand'] text-xl leading-none">
              Certificate Features
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-[#ebeff3] rounded-lg p-4 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-[#7b00ff]" />
                  <div>
                    <p className="font-semibold text-gray-800 font-['Quicksand']">Digital Certificate</p>
                    <p className="text-sm text-gray-600 font-['Quicksand']">Downloadable and shareable digital format</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#ebeff3] rounded-lg p-4 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8 text-[#7b00ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800 font-['Quicksand']">Verified Completion</p>
                    <p className="text-sm text-gray-600 font-['Quicksand']">Officially verified course completion</p>
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

export default CertificateCard;