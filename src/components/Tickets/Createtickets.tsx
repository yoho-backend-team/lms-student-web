import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ticketicon from '../../assets/icons/Tickets/back.png';
import ticketsicon from '../../assets/icons/Tickets/image.png';
import uploadicon from '../../assets/icons/Tickets/Frame 5226.png';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { COLORS, FONTS } from "@/constants/uiConstants";

export const Createtickets = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <img
          src={ticketicon}
          alt="Back"
          className="w-12 h-12 cursor-pointer mt-2"
          onClick={() => navigate('/tickets')}
        />
        <h1 className="text-2xl font-semibold"style={{...FONTS.heading_01}}>Create Ticket For Your Problem</h1>
      </div>

     
      <div className="flex flex-col md:flex-row gap-6">
       
        <Card className="w-full md:w-1/2 bg-[#ebeff3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]">
          <CardHeader>
            <CardTitle className="text-base !text-black font-medium"style={{...FONTS.para_01,fontSize:'15px'}}>Select Your Problem</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
          
            <Select>
              <SelectTrigger className="w-full h-12 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="bg-[#ebeff3]">
                <SelectItem value="attendance !text-black"style={{...FONTS.para_01,fontSize:'15px'}}>Attendance issue</SelectItem>
                
              </SelectContent>
            </Select>

           
            <div>
              <label className="text-sm font-medium !text-black mb-2 block"style={{...FONTS.para_01,fontSize:'15px'}}>Query</label>
              <Input
                placeholder=""
                className="w-full mt-2 h-12 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
              />
            </div>

           
            <div>
              <label className="text-sm !text-black font-medium"style={{...FONTS.para_01,fontSize:'15px'}}>Description</label>
              <textarea
                placeholder=""
                className="w-full mt-2 h-24 p-3 resize-none rounded-md bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none text-sm text-gray-700"
              />
            </div>

          
            <div>
              <label className="text-sm !text-black font-medium"style={{...FONTS.para_01,fontSize:'15px'}}>Attachment</label>
              <div
                onClick={handleUploadClick}
                className="mt-2 h-32 p-6 rounded-xl flex flex-col items-center justify-center text-center bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] cursor-pointer"
              >
                <img
                  src={preview || uploadicon}
                  alt="Upload"
                  className="w-10 h-10 object-contain"
                />
                <p className="text-sm mt-2 !text-gray-600"style={{...FONTS.para_01,fontSize:'13px'}}>
                  {preview ? "Image Uploaded" : "Upload File"}
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

          
            <div className="w-full flex justify-end gap-4 mt-8">
              <button
                onClick={() => navigate('/tickets')}
                className="px-4 py-2 rounded-md !text-black !bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"style={{...FONTS.para_01,fontSize:'15px'}}
              >
                Cancel Ticket
              </button>
              <button className="px-4 py-2 rounded-md !bg-[#7b00ff] !text-white !hover:bg-[#6a00e0] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"style={{...FONTS.para_01,fontSize:'15px'}}>
                Confirm Ticket
              </button>
            </div>
          </CardContent>
        </Card>

    
        <Card className="w-full md:w-1/2 flex items-center justify-center p-6 bg-[#ebeff3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]">
          <img
            src={ticketsicon}
            alt="Ticket"
            className="w-2/3 max-w-xs object-contain"
          />
        </Card>
      </div>
    </div>
  );
};
