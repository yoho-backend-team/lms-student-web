/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { COLORS, FONTS } from '@/constants/uiConstants'
import { useNavigate } from 'react-router-dom'


// interface DropdownOption {
//   value: string;
//   label: string;
// }

// interface FilterGroup {
//   title: string;
//   options: DropdownOption[];
// }

interface CompletedclassProps {
  data: any[];
}

const Completedclass: React.FC<CompletedclassProps> = ({ data }) => {

  const navigate = useNavigate();
  const headers = ['Title', 'Start Date', 'Start Time', 'Duration', 'Action'];

  // const [showFilters, setShowFilters] = useState(false);
  // const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  // const [filteredData] = useState(data);

  const handleClassDetailPage = (id: string) => {
    navigate(`/class/${id}`);
  };

  // const toggleFilters = () => {
  //   setShowFilters(!showFilters);
  //   setOpenDropdown(null);
  // };

  // const toggleDropdown = (title: string) => {
  //   setOpenDropdown(openDropdown === title ? null : title);
  // };

  // const selectOption = (groupTitle: string, value: string) => {
  //   const newFilters = { ...selectedFilters, [groupTitle]: value };
  //   setSelectedFilters(newFilters);
  //   setOpenDropdown(null);
  //   applyFilters(newFilters);
  // };

  // const clearFilter = (groupTitle: string) => {
  //   const newFilters = { ...selectedFilters };
  //   delete newFilters[groupTitle];
  //   setSelectedFilters(newFilters);
  //   applyFilters(newFilters);
  // };

  // const applyFilters = (filters: Record<string, string>) => {
  //   let result = [...data];

  //   if (filters.Month) {
  //     result = result.filter(item => {
  //       const date = new Date(item.start_date);
  //       const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //       return month === filters.Month;
  //     });
  //   }

  //   if (filters.Year) {
  //     result = result.filter(item => {
  //       const date = new Date(item.start_date);
  //       return date.getFullYear().toString() === filters.Year;
  //     });
  //   }

  //   if (filters.Courses) {
  //     result = result.filter(item =>
  //       item.courseDetails.course_name.toLowerCase().includes(filters.Courses.toLowerCase())
  //     );
  //   }

  //   if (filters.Classes) {
  //     result = result.filter(item =>
  //       item.class_name?.toLowerCase().includes(filters.Classes.toLowerCase())
  //     );
  //   }

  //   setFilteredData(result);
  // };

  return (
    <div style={{ backgroundColor: COLORS.bg_Colour }} className='mb-4'>
      {/* <Card style={{ backgroundColor: COLORS.bg_Colour }} className='h-[80px] mb-3' >
        {showFilters && (
          <div className='ml-6 grid lg:grid-cols-8 md:grid-cols-6 justify-between gap-2'>
            {filterGroups.map((group) => (
              <div key={group.title} className="relative">
                <Button
                  style={{...FONTS.heading_07}}
                  variant="outline"
                  className="cursor-pointer w-[120px] justify-between bg-[#ebeff3] 
                            shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]"
                  onClick={() => toggleDropdown(group.title)}
                >
                  {selectedFilters[group.title] || group.title}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>

                {openDropdown === group.title && (
                  <div className="absolute z-50 w-[120px] mt-2 bg-[#ebeff3] 
                              shadow-[2px_2px_3px_rgba(189,194,199,0.75)_inset] rounded-md p-1">
                    {selectedFilters[group.title] && (
                      <div
                        style={{...FONTS.para_02}}
                        className="p-2 m-2 cursor-pointer rounded-sm bg-[#ebeff3] hover:bg-[#dde1e5]
                                  shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]"
                        onClick={() => clearFilter(group.title)}
                      >
                        Clear
                      </div>
                    )}
                    {group.options.map((option) => (
                      <div
                        style={{...FONTS.para_02}}
                        key={option.value}
                        className={`p-2 m-2 cursor-pointer rounded-sm
                                  ${selectedFilters[group.title] === option.value 
                                    ? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white' 
                                    : 'bg-[#ebeff3] hover:bg-[#dde1e5]'}
                                  shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]`}
                        onClick={() => selectOption(group.title, option.value)}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div>
          <img 
            src={filterImg} 
            alt="filter" 
            className="absolute right-[60px] top-[255px] cursor-pointer p-2 rounded-lg bg-[#ebeff3] 
                      shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]"
            onClick={toggleFilters}
          />
        </div>
      </Card> */}

      <Card style={{ backgroundColor: COLORS.bg_Colour }}>
        <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white mx-2 p-4">
          <table className="w-full">
            <thead>
              <tr className="flex justify-around items-center !text-white" style={{ ...FONTS.heading_03 }}>
                {headers.map((title, index) => (
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </thead>
          </table>
        </Card>

        {data.length > 0 ? (
          data.map((item) => (
            <Card
              key={item.id}
              className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black mx-4 p-4
                        transition-all duration-300 ease-in-out
                        hover:-translate-y-1 
                        hover:shadow-[6px_6px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)]
                        cursor-pointer'
            >
              <table className="w-full">
                <tbody>
                  <tr className="flex justify-around items-center my-1" style={{ ...FONTS.heading_06 }}>
                    <td>{item.courseDetails.course_name}</td>
                    <td>{(item.start_date).slice(0, 10)}</td>
                    <td>{(item.start_time).slice(11, 16)}</td>
                    <td>{item.duration} Min</td>
                    <td>
                      <Button
                        onClick={() => handleClassDetailPage(item.uuid)}
                        className="cursor-pointer bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600
                                  shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]"
                      >
                        Completed
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          ))
        ) : (
          <Card className="bg-[#ebeff3] text-black mx-4 p-4 text-center">
            No classes found matching your filters
          </Card>
        )}
      </Card>
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { COLORS, FONTS } from '@/constants/uiConstants'
import { useNavigate } from 'react-router-dom'

interface CompletedclassProps {
  data: any[];
}

const Completedclass: React.FC<CompletedclassProps> = ({ data }) => {
  const navigate = useNavigate();
  const headers = ['Title', 'Start Date', 'Start Time', 'Duration', 'Action'];

  const handleClassDetailPage = (id: string) => {
    navigate(`/class/${id}`);
  };

  return (
    <div style={{ backgroundColor: COLORS.bg_Colour }} className='mb-4 px-2 sm:px-4'>
      <Card style={{ backgroundColor: COLORS.bg_Colour }}>
        {/* Header Card - Hidden on mobile, shown on md+ */}
        <Card className="hidden md:block bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white mx-2 sm:mx-3 lg:mx-4 p-2 sm:p-3 lg:p-4">
          <div className="w-full">
            <div className="flex justify-around items-center !text-white text-[10px] sm:text-xs lg:text-sm xl:text-base" style={{ ...FONTS.heading_03 }}>
              {headers.map((title, index) => (
                <div key={index} className='flex-1 text-center px-1'>{title}</div>
              ))}
            </div>
          </div>
        </Card>

        {/* Class Items Container */}
        <div className='px-2 sm:px-3 lg:px-4 py-2 sm:py-3 space-y-2 sm:space-y-3'>
          {data.length > 0 ? (
            data.map((item) => (
              <Card
                key={item.id}
                className='overflow-hidden bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-2 sm:p-3 lg:p-4
                          transition-all duration-300 ease-in-out
                          hover:-translate-y-1 
                          hover:shadow-[6px_6px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)]
                          cursor-pointer'
              >
                {/* Mobile Layout (< 768px) - Stacked vertical layout */}
                <div className='md:hidden space-y-2.5'>
                  <div className='flex justify-between items-start gap-2'>
                    <div className='flex-1'>
                      <div className='font-semibold text-[#7B00FF] text-xs sm:text-sm mb-1' style={{ ...FONTS.heading_06 }}>
                        {item.courseDetails.course_name}
                      </div>
                      <div className='text-[10px] sm:text-xs text-gray-600'>
                        {(item.start_date).slice(0, 10)} • {(item.start_time).slice(11, 16)}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleClassDetailPage(item.uuid)}
                      className="cursor-pointer bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600
                                shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]
                                text-[10px] sm:text-xs px-2 sm:px-3 py-1 whitespace-nowrap"
                    >
                      Completed
                    </Button>
                  </div>
                  
                  <div className='text-[11px] sm:text-xs' style={{ ...FONTS.heading_06 }}>
                    <span className='font-semibold text-gray-600'>Duration:</span>
                    <span className='ml-1'>{item.duration} Min</span>
                  </div>
                </div>

                {/* Tablet+ Layout (>= 768px) - Table layout */}
                <div className="hidden md:flex justify-around items-center text-[10px] sm:text-xs lg:text-sm xl:text-base gap-1 sm:gap-2" style={{ ...FONTS.heading_06 }}>
                  <div className='flex-1 text-center px-1 min-w-0'>
                    <span className='block truncate' title={item.courseDetails.course_name}>
                      {item.courseDetails.course_name}
                    </span>
                  </div>
                  <div className='flex-1 text-center px-1 min-w-0'>
                    {(item.start_date).slice(0, 10)}
                  </div>
                  <div className='flex-1 text-center px-1 min-w-0'>
                    {(item.start_time).slice(11, 16)}
                  </div>
                  <div className='flex-1 text-center px-1 min-w-0'>
                    {item.duration} Min
                  </div>
                  <div className='flex-1 text-center px-1 min-w-0 flex justify-center'>
                    <Button
                      onClick={() => handleClassDetailPage(item.uuid)}
                      className="cursor-pointer bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600
                                shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]
                                text-[10px] sm:text-xs lg:text-sm px-2 sm:px-3 lg:px-4 py-1 lg:py-1.5 whitespace-nowrap"
                    >
                      Completed
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="bg-[#ebeff3] text-black p-4 text-center text-xs sm:text-sm lg:text-base shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]">
              No classes found matching your filters
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Completedclass;