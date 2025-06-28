import React from 'react';
import { Download } from 'lucide-react';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface CertificateData {
  studentName: string;
  course: string;
  completionDate: string;
  certificateId: string;
  issueDate: string;
  grade: string;
  duration: string;
  institution: string;
  courseImage?: string;
}

interface CertificateProps {
  data?: CertificateData[];
}

const Certificate: React.FC<CertificateProps> = ({ data }) => {
  // Sample data - replace with actual data from props or API
  const certificatesData: CertificateData[] = data || [
    {
      studentName: 'Albert Einstein',
      course: 'HTML, CSS',
      completionDate: '2024-12-15',
      certificateId: 'CERT-2024-WEB-001',
      issueDate: '2024-12-20',
      grade: 'A+',
      duration: '3 Months',
      institution: 'Advanced Learning Institute',
      courseImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop'
    },
    {
      studentName: 'Albert Einstein',
      course: 'JavaScript',
      completionDate: '2024-11-10',
      certificateId: 'CERT-2024-JS-002',
      issueDate: '2024-11-15',
      grade: 'A',
      duration: '4 Months',
      institution: 'Advanced Learning Institute',
      courseImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop'
    },
    {
      studentName: 'Albert Einstein',
      course: 'React.js',
      completionDate: '2024-10-05',
      certificateId: 'CERT-2024-REACT-003',
      issueDate: '2024-10-10',
      grade: 'A+',
      duration: '5 Months',
      institution: 'Advanced Learning Institute',
      courseImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop'
    },
    {
      studentName: 'Albert Einstein',
      course: 'Node.js',
      completionDate: '2024-09-20',
      certificateId: 'CERT-2024-NODE-004',
      issueDate: '2024-09-25',
      grade: 'A',
      duration: '4 Months',
      institution: 'Advanced Learning Institute',
      courseImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop'
    },
    {
      studentName: 'Albert Einstein',
      course: 'Python',
      completionDate: '2024-08-15',
      certificateId: 'CERT-2024-PY-005',
      issueDate: '2024-08-20',
      grade: 'A+',
      duration: '6 Months',
      institution: 'Advanced Learning Institute',
      courseImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop'
    },
    {
      studentName: 'Albert Einstein',
      course: 'MongoDB',
      completionDate: '2024-07-10',
      certificateId: 'CERT-2024-MONGO-006',
      issueDate: '2024-07-15',
      grade: 'A',
      duration: '2 Months',
      institution: 'Advanced Learning Institute',
      courseImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop'
    }
  ];

  const handleDownload = (certificateId: string) => {
    // Implement certificate download functionality
  };

  return (
    <div className="w-full">
      <div className="rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] flex flex-col"
        style={{ 
          width: '100%',
          marginTop: '1rem',
          height: '75vh',
          fontFamily: FONTS.para_01.fontFamily
        }}>
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-2xl leading-none" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_01.fontFamily, fontWeight: FONTS.heading_01.fontWeight }}>
              Certificates
            </h2>
          </div>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-hide">
          {/* Course-wise Certificate Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">
            {certificatesData.map((certificate, index) => (
              <div key={index} className="rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] overflow-hidden" style={{ backgroundColor: COLORS.white, fontFamily: FONTS.para_01.fontFamily }}>
                {/* Course Image */}
                <div className="h-48 relative overflow-hidden" style={{ background: `linear-gradient(to bottom right, ${COLORS.light_blue}, ${COLORS.purple_01})` }}>
                  {certificate.courseImage ? (
                    <img 
                      src={certificate.courseImage} 
                      alt={certificate.course}
                      className="w-full h-full object-cover opacity-80"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="font-semibold" style={{ fontFamily: FONTS.heading_05.fontFamily }}>Certificate</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                  
                  {/* Grade Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="font-bold text-sm" style={{ color: COLORS.white, fontFamily: FONTS.heading_06.fontFamily }}>{certificate.grade}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Course Title */}
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_04.fontFamily, fontWeight: FONTS.heading_04.fontWeight }}>
                      {certificate.course}
                    </h3>
                    <div className="flex items-center justify-between text-sm" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>
                      <span className="px-3 py-1 rounded-lg font-medium text-xs shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ backgroundColor: COLORS.bg_Colour, color: COLORS.text_desc }}>
                        Completed
                      </span>
                      <span style={{ color: COLORS.text_desc }}>
                        {new Date(certificate.completionDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-end justify-between">
                    {/* Left side - Course details */}
                    <div className="text-sm" style={{ fontFamily: FONTS.para_01.fontFamily }}>
                      <div className="mb-2">
                        <span className="text-xs" style={{ color: COLORS.text_desc }}>Course Name:</span>
                        <div className="font-semibold" style={{ color: COLORS.text_desc }}>{certificate.course}</div>
                      </div>
                      <div>
                        <span className="text-xs" style={{ color: COLORS.text_desc }}>Duration:</span>
                        <div className="font-semibold" style={{ color: COLORS.text_desc }}>{certificate.duration}</div>
                      </div>
                    </div>

                    {/* Right side - Download button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(certificate.certificateId);
                      }}
                      className="flex items-center justify-center w-12 h-12 rounded-lg shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                      style={{ backgroundColor: COLORS.light_blue, color: COLORS.white, fontFamily: FONTS.para_01.fontFamily }}
                      title="Download Certificate"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {certificatesData.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_04.fontFamily }}>
                No Certificates Available
              </h3>
              <p style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>
                Complete courses to earn certificates
              </p>
            </div>
          )}

          {/* Summary Stats */}
          {certificatesData.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-lg p-6 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ backgroundColor: COLORS.bg_Colour, fontFamily: FONTS.para_01.fontFamily }}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ backgroundColor: COLORS.light_blue }}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: COLORS.white }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="font-bold text-3xl mb-2" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_01.fontFamily }}>{certificatesData.length}</p>
                  <p className="font-medium" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>Total Certificates</p>
                </div>
              </div>

              <div className="rounded-lg p-6 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ backgroundColor: COLORS.bg_Colour, fontFamily: FONTS.para_01.fontFamily }}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ backgroundColor: COLORS.light_blue }}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: COLORS.white }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-bold text-3xl mb-2" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_01.fontFamily }}>{certificatesData.filter(cert => cert.grade.includes('A')).length}</p>
                  <p className="font-medium" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>Grade A & Above</p>
                </div>
              </div>

              <div className="rounded-lg p-6 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ backgroundColor: COLORS.bg_Colour, fontFamily: FONTS.para_01.fontFamily }}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ backgroundColor: COLORS.light_blue }}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: COLORS.white }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-bold text-3xl mb-2" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_01.fontFamily }}>
                    {Math.round(certificatesData.reduce((acc, cert) => acc + parseInt(cert.duration.split(' ')[0]), 0) / certificatesData.length) || 0}
                  </p>
                  <p className="font-medium" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>Avg Duration (Months)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificate;