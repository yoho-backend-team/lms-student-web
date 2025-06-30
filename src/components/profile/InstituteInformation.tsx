import React, { useState } from 'react';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface InstituteInfo {
  course: string;
  batch: string;
  rollNumber: string;
  studentId: string;
}

interface InstituteInformationProps {
  data: InstituteInfo;
  onDataChange?: (data: InstituteInfo) => void;
  isEditing?: boolean;
}

const InstituteInformation: React.FC<InstituteInformationProps> = ({ data, onDataChange, isEditing = false }) => {
  const [formData, setFormData] = useState<InstituteInfo>(data);

  const handleInputChange = (key: keyof InstituteInfo, value: string) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    onDataChange?.(updatedData);
  };

  // All institute fields are read-only (not editable)
  const fields = [
    { label: 'Course', key: 'course' as keyof InstituteInfo, type: 'text', editable: false },
    { label: 'Batch', key: 'batch' as keyof InstituteInfo, type: 'text', editable: false },
    { label: 'Roll Number', key: 'rollNumber' as keyof InstituteInfo, type: 'text', editable: false },
    { label: 'Student ID', key: 'studentId' as keyof InstituteInfo, type: 'text', editable: false }
  ];

  return (
    <div>
      <h2 className="font-bold mb-6 text-2xl leading-none" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_01.fontFamily, fontWeight: FONTS.heading_01.fontWeight }}>
        Institute Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block font-medium mb-2 text-sm leading-relaxed" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>
              {field.label}
            </label>
            {/* Institute information is always read-only */}
            <div className="relative rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center"
              style={{
                backgroundColor: COLORS.bg_Colour,
                color: COLORS.text_desc,
                fontFamily: FONTS.para_01.fontFamily,
                fontSize: FONTS.para_01.fontSize
              }}>
              {formData[field.key] || 'Not provided'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstituteInformation;