import React from 'react';

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
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ data }) => {
  const fields = [
    { label: 'Mail Address', value: data.mailAddress, key: 'mailAddress' },
    { label: 'Name', value: data.name, key: 'name' },
    { label: 'Gender', value: data.gender, key: 'gender' },
    { label: 'Contact Number', value: data.contactNumber, key: 'contactNumber' },
    { label: 'Date Of Birth', value: data.dateOfBirth, key: 'dateOfBirth' },
    { label: 'Pin Code', value: data.pinCode, key: 'pinCode' },
    { label: 'Address', value: data.address, key: 'address', fullWidth: true }
  ];

  return (
    <div className="mb-8">
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
        Personal Information
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.key} className={field.fullWidth ? 'col-span-2' : ''}>
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
              className="relative bg-[#ebeff3] rounded-lg px-3 py-2 text-gray-500" 
              style={{
                fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '14px', 
                lineHeight: '1.4', 
                boxShadow: `
                  rgba(255, 255, 255, 0.7) 5px 5px 4px, 
                  rgba(189, 194, 199, 0.75) 2px 2px 3px inset
                `
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

export default PersonalInformation;