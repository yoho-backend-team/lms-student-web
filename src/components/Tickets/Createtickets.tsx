import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ticketicon from '../../assets/icons/Tickets/Frame 301.png';
import ticketsicon from '../../assets/icons/Tickets/image.png';
import uploadicon from '../../assets/icons//Tickets/Frame 5226.png'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const Createtickets = () => {
  return (
    <div className="p-6">

      <div className="flex items-center gap-2 mb-6">
        <img
          src={ticketicon}
          alt="Back"
          className="w-12 h-12 cursor-pointer mt-2"
        />
        <h1 className="text-2xl font-semibold">Create Ticket For Your Problem</h1>
      </div>


      <div className="flex flex-col md:flex-row gap-6">

        <Card className="w-full md:w-1/2   bg-[#ebeff3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]">
          <CardHeader>
            <CardTitle className="text-base font-medium ">
              Select Your Problem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 ">

            <Select>
              <SelectTrigger
                className="w-[650px] h-12  shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] "
              >
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="bg-[#ebeff3]">
                <SelectItem value="attendance">Attendance issue</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <label className="text-sm font-medium mb-2 block">Query</label>
              <Input
                placeholder=""
                className="w-full mt-5 h-12  shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder=""
                className="w-full mt-5 h-30  shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
              />
            </div>


            <div>
              <label className="text-sm font-medium">Attachment</label>
              <div className="mt-5 h-30  p-6 rounded-xl flex flex-col items-center justify-center text-center bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none">
                <img
                  src={uploadicon}
                  alt="Upload"
                  className="w-10 h-10"
                />
                <p className="text-sm mt-2 text-gray-600">Upload File</p>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card className="w-full md:w-1/2 flex items-center justify-center p-6 bg-[#ebeff3]  shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]">
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
