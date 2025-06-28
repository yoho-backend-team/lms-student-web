import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ticketicon from '../../assets/icons/Tickets/Mask group.png';
import { COLORS, FONTS } from "@/constants/uiConstants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ticketData = [
  { id: "ANTITS01", date: "28 April", count: 1, status: "open" },
  { id: "ANTITS02", date: "30 June", count: 1, status: "closed" },
  { id: "ANTITS03", date: "2 July", count: 1, status: "closed" },
  { id: "ANTITS04", date: "14 July", count: 1, status: "open" },
];

const Tickets = () => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/tickets/create-ticket');
  };

  const filteredTickets =
    filter === "all"
      ? ticketData
      : ticketData.filter((ticket) => ticket.status === filter);

  return (
    <div className="flex min-h-screen flex-col px-4 md:px-8 py-10">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-bold" style={FONTS.heading_01}>Ticket</h1>
        <Button
          className="bg-[#7b00ff] !text-white hover:bg-[#7b00ff] hover:text-white cursor-pointer"
          style={FONTS.heading_06}
          variant="outline"
          onClick={handleCreate}
        >
          Create Tickets
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {["all", "open", "closed"].map((label) => (
          <Button
            key={label}
            className={`cursor-pointer ${
              filter === label
                ? "bg-[#7b00ff] !text-white hover:bg-[#7b00ff] hover:text-white"
                : "bg-[#ebeff3] !text-black hover:bg-[#ebeff3] hover:text-black"
            } shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]`}
            style={FONTS.heading_05}
            variant="outline"
            onClick={() => setFilter(label)}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
        {filteredTickets.map((ticket) => (
          <Card
            key={ticket.id}
            onClick={() => navigate(`/ticket/${ticket.id}`)}
            className="relative bg-[#ebeff3] min-h-[231px] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] cursor-pointer"
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle style={{ ...FONTS.heading_01, color: COLORS.blue_02, fontSize: '24px' }}>
                    TICKET #{ticket.id}
                  </CardTitle>
                </div>
                <CardAction>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        className="bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                        style={FONTS.heading_06}
                        variant="outline"
                      >
                        {ticket.date}
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardAction>
              </div>
            </CardHeader>

            <CardContent>
              <p className="font-semibold" style={FONTS.heading_04}>
                This ticket created from student mobile app
              </p>
              <p style={FONTS.heading_06}>
                If you can this yes successfully mobile app an android
              </p>
            </CardContent>

            <CardFooter>
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center gap-1">
                  <img
                    src={ticketicon}
                    alt="Prev"
                    className="w-9 h-9 p-2 rounded-lg shadow-[4px_3px_3px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                  />
                  <p className="ml-3" style={FONTS.heading_04}>{ticket.count}</p>
                </div>
                <CardAction>
                  <Dialog>
                    <DialogTrigger className="text-sm font-medium text-primary">
                      <Button
                        className={`${
                          ticket.status === "open"
                            ? "bg-[#7b00ff] !text-white hover:bg-[#7b00ff] hover:text-white"
                            : "bg-[#ebeff3] !text-black"
                        } shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]`}
                        style={FONTS.heading_04}
                        variant="outline"
                      >
                        {ticket.status}
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardAction>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tickets;
