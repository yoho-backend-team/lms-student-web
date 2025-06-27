import React from 'react';

interface InstituteInfo {
  course: string;
  batch: string;
  rollNumber: string;
  studentId: string;
}

interface InstituteInformationProps {
  data: InstituteInfo;
}

const InstituteInformation: React.FC<InstituteInformationProps> = ({ data }) => {
  const fields = [
    { label: 'Course', value: data.course, key: 'course' },
    { label: 'Batch', value: data.batch, key: 'batch' },
    { label: 'Roll Number', value: data.rollNumber, key: 'rollNumber' },
    { label: 'Student ID', value: data.studentId, key: 'studentId' }
  ];

  return (
    <div>
      <h2 
        className="font-bold text-gray-900 mb-4" 
        style={{
          fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontWeight: 700,
          fontSize: '28px',
          lineHeight: '100%',
          letterSpacing: '0px'
        }}
      >
        Institute Information
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.key}>
            <label 
              className="block font-medium text-gray-700 mb-2" 
              style={{
                fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '14px', 
                lineHeight: '1.4'
              }}
            >
              {field.label}
            </label>
            <div 
              className="rounded-lg px-3 py-2 text-gray-500" 
              style={{
                backgroundColor: '#D1D5DB', 
                fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '14px', 
                lineHeight: '1.4', 
                boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
              }}
            >
              {field.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstituteInformation;