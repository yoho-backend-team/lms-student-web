import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ticketicon from "../../assets/icons/Tickets/Mask group.png";
import { COLORS, FONTS } from "@/constants/uiConstants";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentticket } from "@/features/Tickets/reducer/thunks";
import type { AppDispatch } from "@/store/store";
import { selectTicket } from "@/features/Tickets/reducer/selectors";

interface Ticket {
  _id: string;
  ticket_id: string;
  query: string;
  description: string;
  status: string;
  date: string;
  messages?: any[];
}

const Tickets = () => {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const dispatch = useDispatch<AppDispatch>();
  const ticketData = useSelector(selectTicket);

  const memoizedTickets = useMemo(() => {
    return ticketData?.data?.tickets || [];
  }, [ticketData]);

  const totalPages = ticketData?.data?.totalPages || 1

  const handleCreate = () => {
    navigate("/tickets/create-ticket");
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  useEffect(() => {
    dispatch(
      getStudentticket({
        page: currentPage,
        limit: itemsPerPage,
        status: filter === "all" ? undefined : filter === "open" ? "opened" : "closed",
      }),
    )
  }, [dispatch, currentPage, filter, itemsPerPage])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex min-h-screen flex-col px-4 md:px-8 py-10">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold" style={FONTS.heading_01}>
          Ticket
        </h1>
        <Button
          className="bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white rounded-sm cursor-pointer shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] py-4 sm:py-5"
          style={FONTS.heading_07}
          variant="outline"
          onClick={handleCreate}
        >
          Create Tickets
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
        {["all", "open", "closed"].map((label) => (
          <Button
            key={label}
            className={`cursor-pointer rounded-sm ${filter === label
              ? "bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]"
              : "bg-[#ebeff3] !text-black shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
              }`}
            style={FONTS.heading_05}
            variant="outline"
            onClick={() => handleFilterChange(label)}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
        {memoizedTickets.map((ticket: Ticket) => (
          <Card
            key={ticket._id}
            onClick={() => navigate(`/ticket/${ticket.ticket_id}`, { state: ticket })}
            className="relative bg-[#ebeff3] min-h-[220px] sm:min-h-[231px] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] cursor-pointer"
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle style={{ ...FONTS.heading_01, color: COLORS.blue_02, fontSize: "20px" }} className="sm:text-[24px]">
                  TICKET #{ticket.ticket_id}
                </CardTitle>
                <CardAction>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        className="bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] text-sm sm:text-base"
                        style={FONTS.heading_06}
                        variant="outline"
                      >
                        {formatDate(ticket.date)}
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardAction>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-semibold" style={FONTS.heading_04}>
                {ticket.query || "No Title"}
              </p>
              <p style={FONTS.heading_06}>{ticket.description}</p>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center gap-1">
                  <img
                    src={ticketicon}
                    alt="Prev"
                    className="w-8 sm:w-9 h-8 sm:h-9 p-2 rounded-lg shadow-[4px_3px_3px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                  />
                  <p className="ml-2 sm:ml-3" style={FONTS.heading_04}>
                    {ticket.messages?.length || 0}
                  </p>
                </div>
                <CardAction>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        className={`rounded-sm cursor-pointer ${ticket.status === "opened"
                          ? "bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]"
                          : "bg-[#ebeff3] !text-black shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                          }`}
                        style={FONTS.heading_04}
                        variant="outline"
                      >
                        {ticket.status === "opened" ? "Open" : "Closed"}
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardAction>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-10 gap-3">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            size="icon"
            className="rounded-full cursor-pointer bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
          >
            <ChevronLeft size={20} />
          </Button>

          <div className="flex items-center px-3 py-1 bg-[#ebeff3] rounded-full shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
            <span style={FONTS.heading_05} className="text-black text-sm sm:text-base">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="icon"
            className="rounded-full cursor-pointer bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      )}

    </div>
  );
};

export default Tickets;
