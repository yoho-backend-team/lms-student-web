import { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { COLORS, FONTS } from '@/constants/uiConstants'
import filterImg from '../../assets/classes/filter.png'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

interface DropdownOption {
  value: string;
  label: string;
}

interface FilterGroup {
  title: string;
  options: DropdownOption[];
}

interface CompletedclassProps {
  data: any[]; 
}

const Completedclass: React.FC<CompletedclassProps> = ({ data }) => {
  const months: DropdownOption[] = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const currentYear = new Date().getFullYear();
  const years: DropdownOption[] = Array.from({ length: 5 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString()
  }));

  const courses: DropdownOption[] = [
    { value: 'html', label: 'HTML' },
    { value: 'js', label: 'JAVA SCRIPT' },
    { value: 'css', label: 'CSS' },
    { value: 'react', label: 'React' },
  ];

  const classes: DropdownOption[] = Array.from({ length: 4 }, (_, i) => ({
    value: `class-${i+1}`,
    label: `class ${i+1}`
  }));

  const filterGroups: FilterGroup[] = [
    { title: 'Month', options: months },
    { title: 'Year', options: years },
    { title: 'Courses', options: courses },
    { title: 'Classes', options: classes }
  ];

  const navigate = useNavigate();
  const headers = ['Title', 'Start Date', 'Start Time', 'Duration', 'Action'];

  const [showFilters, setShowFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [filteredData, setFilteredData] = useState(data);

  const handleClassDetailPage = (id: string) => {
    navigate(`/class/${id}`);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setOpenDropdown(null);
  };

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const selectOption = (groupTitle: string, value: string) => {
    const newFilters = { ...selectedFilters, [groupTitle]: value };
    setSelectedFilters(newFilters);
    setOpenDropdown(null);
    applyFilters(newFilters);
  };

  const clearFilter = (groupTitle: string) => {
    const newFilters = { ...selectedFilters };
    delete newFilters[groupTitle];
    setSelectedFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters: Record<string, string>) => {
    let result = [...data];
    
    if (filters.Month) {
      result = result.filter(item => {
        const date = new Date(item.start_date);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return month === filters.Month;
      });
    }

    if (filters.Year) {
      result = result.filter(item => {
        const date = new Date(item.start_date);
        return date.getFullYear().toString() === filters.Year;
      });
    }

    if (filters.Courses) {
      result = result.filter(item => 
        item.courseDetails.course_name.toLowerCase().includes(filters.Courses.toLowerCase())
      );
    }

    if (filters.Classes) {
      result = result.filter(item => 
        item.class_name?.toLowerCase().includes(filters.Classes.toLowerCase())
      );
    }

    setFilteredData(result);
  };

  return (
    <div style={{ backgroundColor: COLORS.bg_Colour }} className='mb-4'>
      <Card style={{ backgroundColor: COLORS.bg_Colour }} className='h-[80px] mb-3' >
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
      </Card>

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

        {filteredData.length > 0 ? (
          filteredData.map((item) => (
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
                    <td>{(item.start_date).slice(0,10)}</td>
                    <td>{(item.start_time).slice(11,16)}</td>
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

export default Completedclass;