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

export default PersonalInformation;