import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ticketicon from '../../assets/icons/Tickets/Mask group.png';

const ticketData = [
	{ id: "ANTITS01", date: "28 April", count: 1, status: "open" },
	{ id: "ANTITS02", date: "30 June", count: 1, status: "closed" },
	{ id: "ANTITS03", date: "2 July", count: 1, status: "closed" },
	{ id: "ANTITS04", date: "14 July", count: 1, status: "open" },
];

const Tickets = () => {
	const [filter, setFilter] = useState<"all" | "open" | "closed">("all");

	const filteredTickets =
		filter === "all"
			? ticketData
			: ticketData.filter((ticket) => ticket.status === filter);

	return (
		<div className="flex min-h-screen flex-col px-8 py-10 ">

			<div className="w-full flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Ticket</h1>
				<Button
					className="bg-[#7b00ff] text-white hover:bg-[#7b00ff] hover:text-white"
					variant="outline"
				>
					Create Tickets
				</Button>

			</div>
			<div className="flex flex-row gap-3 mb-8 ">
				{["all", "open", "closed"].map((label) => (
					<Button
						key={label}
						className={`
    ${filter === label
								? "bg-[#7b00ff] text-white hover:bg-[#7b00ff] hover:text-white"
								: "bg-[#ebeff3] text-black hover:bg-[#ebeff3] hover:text-black"} 
    shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]
  `}
						variant="outline"
						onClick={() => setFilter(label as "all" | "open" | "closed")}
					>
						{label.charAt(0).toUpperCase() + label.slice(1)}
					</Button>

				))}
			</div>


			<div className="grid md:grid-cols-2 gap-6 w-full">
				{filteredTickets.map((ticket) => (
					<Card
						key={ticket.id}
						className="relative bg-[#ebeff3] h-[231px] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]"
					>
						<CardHeader>
							<div className="flex justify-between items-center">
								<div>
									<CardTitle className="text-chart-3">
										TICKET #{ticket.id}
									</CardTitle>
									<CardDescription />
								</div>
								<CardAction>
									<Dialog>
										<DialogTrigger>
											<Button
												className="bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
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
							<p className="font-semibold">
								This ticket created from student mobile app
							</p>
							<p>
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
									<p className="ml-3">{ticket.count}</p>
								</div>
								<CardAction>
									<Dialog>
										<DialogTrigger className="text-sm font-medium text-primary">
											<Button
												className="bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
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
