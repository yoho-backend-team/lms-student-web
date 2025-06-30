import React, { useState } from 'react';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface PersonalInfo {
  mailAddress: string;
  name: string;
  gender: string;
  contactNumber: string;
  dateOfBirth: string;
  pinCode: string;
  address: string;
}

interface PersonalInformationProps {
  data: PersonalInfo;
  onDataChange?: (data: PersonalInfo) => void;
  isEditing?: boolean;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ data, onDataChange, isEditing = false }) => {
  const [formData, setFormData] = useState<PersonalInfo>(data);

  const handleInputChange = (key: keyof PersonalInfo, value: string) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    onDataChange?.(updatedData);
  };

  // Define which fields are editable
  const editableFields = ['name', 'contactNumber', 'dateOfBirth', 'pinCode', 'address'];

  const fields = [
    { label: 'Mail Address', key: 'mailAddress' as keyof PersonalInfo, type: 'email', editable: false },
    { label: 'Name', key: 'name' as keyof PersonalInfo, type: 'text', editable: true },
    { label: 'Gender', key: 'gender' as keyof PersonalInfo, type: 'select', options: ['Male', 'Female', 'Other'], editable: false },
    { label: 'Contact Number', key: 'contactNumber' as keyof PersonalInfo, type: 'tel', editable: true },
    { label: 'Date Of Birth', key: 'dateOfBirth' as keyof PersonalInfo, type: 'date', editable: true },
    { label: 'Pin Code', key: 'pinCode' as keyof PersonalInfo, type: 'text', editable: true },
    { label: 'Address', key: 'address' as keyof PersonalInfo, type: 'textarea', fullWidth: true, editable: true }
  ];

  return (
    <div className="mb-8">
      <h2 className="font-bold mb-6 text-2xl leading-none" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_01.fontFamily, fontWeight: FONTS.heading_01.fontWeight }}>
        Personal Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.key} className={field.fullWidth ? 'md:col-span-2' : ''}>
            <label className="block font-medium mb-2 text-sm leading-relaxed" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>
              {field.label}
            </label>
            {isEditing && field.editable ? (
              // Editable fields with colored border to indicate editability
              field.type === 'select' ? (
                <select
                  value={formData[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="w-full rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] border-2 focus:outline-none focus:shadow-[inset_3px_3px_6px_rgba(189,194,199,0.8),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] transition-all duration-200 min-h-[44px]"
                  style={{
                    backgroundColor: COLORS.bg_Colour,
                    color: COLORS.text_desc,
                    fontFamily: FONTS.para_01.fontFamily,
                    borderColor: `${COLORS.light_blue}33`,
                    fontSize: FONTS.para_01.fontSize
                  }}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  value={formData[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  rows={3}
                  className="w-full rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] border-2 focus:outline-none focus:shadow-[inset_3px_3px_6px_rgba(189,194,199,0.8),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] transition-all duration-200 resize-none"
                  style={{
                    backgroundColor: COLORS.bg_Colour,
                    color: COLORS.text_desc,
                    fontFamily: FONTS.para_01.fontFamily,
                    borderColor: `${COLORS.light_blue}33`,
                    fontSize: FONTS.para_01.fontSize
                  }}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              ) : (
                <input
                  type={field.type}
                  value={formData[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="w-full rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] border-2 focus:outline-none focus:shadow-[inset_3px_3px_6px_rgba(189,194,199,0.8),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] transition-all duration-200 min-h-[44px]"
                  style={{
                    backgroundColor: COLORS.bg_Colour,
                    color: COLORS.text_desc,
                    fontFamily: FONTS.para_01.fontFamily,
                    borderColor: `${COLORS.light_blue}33`,
                    fontSize: FONTS.para_01.fontSize
                  }}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              )
            ) : (
              // Read-only display
              <div className="relative rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center"
                style={{
                  backgroundColor: COLORS.bg_Colour,
                  fontFamily: FONTS.para_01.fontFamily,
                  color: field.editable && !isEditing ? COLORS.text_desc : COLORS.text_desc,
                  fontSize: FONTS.para_01.fontSize
                }}>
                {formData[field.key] || 'Not provided'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInformation;