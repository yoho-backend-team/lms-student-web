import { useNavigate, useParams } from 'react-router-dom';
import classImg from '../../assets/classes/Mask group.png';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { COLORS, FONTS } from '@/constants/uiConstants';
import backImg from '../../assets/classes/back.png';

const ClassId = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <div className="mb-4 px-4 sm:px-6">
      {/* Title section - keeping flex-row as requested */}
      <div className="my-4 flex flex-row justify-start items-center gap-5">
        <div 
          onClick={handleBackPage} 
          className="p-2 rounded-lg bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] cursor-pointer"
        >
          <img src={backImg} alt="back-img" className="w-5 h-5" />
        </div>  
        <h1 style={{...FONTS.heading_01}} className="text-xl sm:text-2xl">
          Class Details - {id}
        </h1>
      </div>

      {/* Card section - responsive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Left side card */}
        <Card style={{backgroundColor: COLORS.bg_Colour}} className="px-4 py-1 h-auto min-h-[400px]">
          <CardHeader>
            <CardTitle style={{...FONTS.heading_01}} className="!text-[#7B00FF] mb-4 text-xl sm:text-2xl">
              Batch No: #13
            </CardTitle>
            <CardDescription>
              <h2 style={{...FONTS.heading_02}} className="text-[#2A2A2A] mb-2 text-lg sm:text-xl">
                The Path Of MERN Stack
              </h2>
              <p style={{...FONTS.para_02}} className="text-sm sm:text-base">
                The Path of MERN Stack involves mastering four powerful technologies: MongoDB, Express.js, React.js, and Node.js. This stack enables developers to build full-stack web applications using JavaScript from frontend to backend.
              </p>
            </CardDescription>
          </CardHeader>

          <Card className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] mx-4">
            <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white p-4 mx-4 overflow-x-auto">
              {/* Keeping exact table structure as requested */}
              <table className="w-full table-fixed text-center">
                <thead style={{...FONTS.para_02}} className="!text-[#ffffff]">
                  <tr>
                    <td>Date</td>
                    <td>Start At</td>
                    <td>End At</td>
                    <td>Duration</td>
                  </tr>
                </thead>
                <tbody style={{...FONTS.heading_04}} className="!text-[#ffffff]">
                  <tr>
                    <td>10 Mar 2025</td>
                    <td>9.30 Am</td>
                    <td>6.00 Pm</td>
                    <td>6 Month</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Card>
        </Card>

        {/* Right side card */}
        <Card style={{backgroundColor: COLORS.bg_Colour}} className="px-4 h-auto min-h-[400px]">
          <CardTitle style={{...FONTS.heading_02}} className="text-lg sm:text-xl">
            Session Materials
          </CardTitle>
          <Card style={{...FONTS.para_02}} className="py-1 px-3 bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]">
            Once Class finished study material videos will be upload
          </Card>
          <div className="mx-auto my-auto">
            <img 
              className="w-full max-w-[300px] md:w-[400px]" 
              src={classImg} 
              alt="Class materials" 
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClassId;