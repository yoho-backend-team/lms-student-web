import React, { useEffect, useState, useRef } from 'react';
import { Download, X, Eye } from 'lucide-react';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useDispatch, useSelector } from 'react-redux';
import { selectcertificate } from '@/features/certificate/reducers/selectors';
import { getAllcertificatesstudent } from '@/features/certificate/reducers/thunks';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  const [certificatesData, setCertificatesData] = useState<CertificateData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<any>();
  const certificate = useSelector(selectcertificate);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getAllcertificatesstudent({ studentId: '67f3b8feb8d2634300cc8819' }));
  }, [dispatch]);

  useEffect(() => {
    if (certificate) {
      if (Array.isArray(certificate) && certificate.length > 0) {
        const mappedCertificates = certificate.map((item: any) => ({
          studentName: item?.student?.[0]?.full_name || 'Student Name',
          course: item?.certificate_name || 'Course Name',
          completionDate: item?.updatedAt || item?.createdAt || new Date().toISOString(),
          certificateId: item?._id || 'CERT-UNKNOWN',
          issueDate: item?.createdAt || new Date().toISOString(),
          grade: 'A+',
          duration: '3 Months',
          institution: 'Advanced Learning Institute',
          courseImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop'
        }));
        setCertificatesData(mappedCertificates);
      } else {
        setCertificatesData([
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
        ]);
      }
    } else if (data) {
      setCertificatesData(data);
    }
    setIsLoading(false);
  }, [certificate, data]);

  const handleViewCertificate = (certificate: CertificateData) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleDownload = async (certificateId: string) => {
    if (!certificateRef.current) return;
    
    try {
      // Capture the certificate as an image
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });
      
      // Convert canvas to image data
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // If the content is taller than a page, add additional pages
      let heightLeft = imgHeight;
      let position = 0;
      
      // First page already added above
      heightLeft -= pageHeight;
      
      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Download the PDF
      pdf.save(`certificate-${certificateId}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center" style={{ height: '75vh' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: COLORS.light_blue }}></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Certificate Modal */}
      {isModalOpen && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Certificate Preview</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="overflow-y-auto p-6 flex-1">
              {/* Certificate Design - Add ref for PDF generation */}
              <div 
                ref={certificateRef}
                className="border-4 border-gold-500 p-8 rounded-lg bg-white shadow-lg" 
                style={{ background: "linear-gradient(to bottom right, #fdf6e3, #faf0e6)" }}
              >
                <div className="text-center mb-8">
                  <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-2" style={{ color: COLORS.text_title, fontFamily: "'Playfair Display', serif" }}>CERTIFICATE OF COMPLETION</h1>
                    <div className="w-32 h-1 bg-gold-500 mx-auto"></div>
                  </div>
                  
                  <p className="text-lg mb-2">This is to certify that</p>
                  <h2 className="text-3xl font-bold mb-6" style={{ color: COLORS.light_blue, fontFamily: "'Cursive', 'Dancing Script', cursive" }}>
                    {selectedCertificate.studentName}
                  </h2>
                  
                  <p className="text-lg mb-6">has successfully completed the course</p>
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: COLORS.text_title }}>{selectedCertificate.course}</h3>
                  
                  <p className="text-md mb-2">with a grade of <span className="font-bold">{selectedCertificate.grade}</span></p>
                  <p className="text-md mb-6">on {new Date(selectedCertificate.completionDate).toLocaleDateString()}</p>
                  
                  <div className="flex justify-between items-center mt-10">
                    <div className="text-center">
                      <div className="h-0.5 w-32 bg-black mx-auto mb-2"></div>
                      <p>Instructor</p>
                    </div>
                    
                    <div className="w-24 h-24 border-2 border-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-center text-xs font-bold">SEAL</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="h-0.5 w-32 bg-black mx-auto mb-2"></div>
                      <p>Director</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-sm">
                    <p>Certificate ID: {selectedCertificate.certificateId}</p>
                    <p>Issued by: {selectedCertificate.institution}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="flex justify-end p-4 border-t gap-3">
              <button 
                onClick={() => handleDownload(selectedCertificate.certificateId)}
                className="flex items-center px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: COLORS.light_blue }}
              >
                <Download size={18} className="mr-2" />
                Download as PDF
              </button>
              <button 
                onClick={closeModal}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
              <div key={index} className="rounded-lg p-6 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] overflow-hidden" style={{ backgroundColor: COLORS.bg_Colour, fontFamily: FONTS.para_01.fontFamily }}>
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

                    {/* Right side - View and Download buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewCertificate(certificate);
                        }}
                        className="flex items-center justify-center w-12 h-12 rounded-lg shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                        style={{ backgroundColor: COLORS.purple_01, color: COLORS.white, fontFamily: FONTS.para_01.fontFamily }}
                        title="View Certificate"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
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