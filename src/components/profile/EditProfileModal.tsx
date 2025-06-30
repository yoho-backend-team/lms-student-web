import React, { useState, useRef } from 'react';
import { X, Camera } from 'lucide-react';
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

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalInfo: PersonalInfo;
  profileImage: string;
  onSave: (data: PersonalInfo, imageFile?: File) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  personalInfo,
  profileImage,
  onSave
}) => {
  const [formData, setFormData] = useState<PersonalInfo>(personalInfo);
  const [currentImage, setCurrentImage] = useState(profileImage);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (key: keyof PersonalInfo, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setCurrentImage(previewUrl);
      setSelectedImageFile(file);
    }
  };

  const handleSave = () => {
    onSave(formData, selectedImageFile || undefined);
    onClose();
  };

  const handleCancel = () => {
    // Reset form data
    setFormData(personalInfo);
    setCurrentImage(profileImage);
    setSelectedImageFile(null);
    onClose();
  };

  if (!isOpen) return null;

  // Editable fields only
  const editableFields = [
    { label: 'Name', key: 'name' as keyof PersonalInfo, type: 'text' },
    { label: 'Contact Number', key: 'contactNumber' as keyof PersonalInfo, type: 'tel' },
    { label: 'Date Of Birth', key: 'dateOfBirth' as keyof PersonalInfo, type: 'date' },
    { label: 'Pin Code', key: 'pinCode' as keyof PersonalInfo, type: 'text' },
    { label: 'Address', key: 'address' as keyof PersonalInfo, type: 'textarea', fullWidth: true }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="rounded-2xl shadow-[-8px_-8px_16px_rgba(255,255,255,0.7),_8px_8px_16px_rgba(189,194,199,0.75)] max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: COLORS.bg_Colour }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_01.fontFamily }}>
            Edit Profile
          </h2>
          <button
            onClick={handleCancel}
            className="p-2 rounded-lg shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_3px_3px_5px_rgba(189,194,199,0.75),inset_-3px_-3px_5px_rgba(255,255,255,0.7)] transition-all duration-200"
            style={{ backgroundColor: COLORS.bg_Colour }}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Profile Image Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div 
                className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 shadow-[inset_4px_4px_8px_rgba(189,194,199,0.75),inset_-4px_-4px_8px_rgba(255,255,255,0.7)] cursor-pointer group"
                onClick={handleImageClick}
              >
                <img 
                  src={currentImage}
                  alt="Profile"
                  className="w-full h-full object-cover transition-all duration-200 group-hover:opacity-80"
                />
                {/* Camera overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {editableFields.map((field) => (
              <div key={field.key} className={field.fullWidth ? 'md:col-span-2' : ''}>
                <label className="block font-medium mb-2 text-sm leading-relaxed" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    rows={3}
                    className="w-full rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] border-none focus:outline-none focus:shadow-[inset_3px_3px_6px_rgba(189,194,199,0.8),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] transition-all duration-200 resize-none"
                    style={{
                      backgroundColor: COLORS.bg_Colour,
                      color: COLORS.text_desc,
                      fontFamily: FONTS.para_01.fontFamily,
                      fontSize: FONTS.para_01.fontSize
                    }}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="w-full rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] border-none focus:outline-none focus:shadow-[inset_3px_3px_6px_rgba(189,194,199,0.8),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] transition-all duration-200 min-h-[44px]"
                    style={{
                      backgroundColor: COLORS.bg_Colour,
                      color: COLORS.text_desc,
                      fontFamily: FONTS.para_01.fontFamily,
                      fontSize: FONTS.para_01.fontSize
                    }}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_3px_3px_5px_rgba(189,194,199,0.75),inset_-3px_-3px_5px_rgba(255,255,255,0.7)] text-sm"
            style={{
              backgroundColor: COLORS.bg_Colour,
              color: COLORS.text_desc,
              fontFamily: FONTS.para_01.fontFamily,
              fontSize: FONTS.para_01.fontSize
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_3px_3px_5px_rgba(123,0,255,0.3),inset_-3px_-3px_5px_rgba(255,255,255,0.7)] text-sm"
            style={{
              backgroundColor: COLORS.light_blue,
              color: COLORS.white,
              fontFamily: FONTS.para_01.fontFamily,
              fontSize: FONTS.para_01.fontSize
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;