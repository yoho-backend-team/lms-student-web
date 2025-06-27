import Profile1 from "../../assets/icons/payments/profile-1.png"
import Profile2 from "../../assets/icons/payments/profile-2.png"
import Profile3 from "../../assets/icons/payments/profile-3.png"
import Profile4 from "../../assets/icons/payments/profile-4.png"
import Profile5 from "../../assets/icons/payments/profile-5.png"
import Group from "../../assets/icons/payments/Group.png"
import Frame from "../../assets/icons/payments/Frame.png"
import Star from "../../assets/icons/payments/Star.png"


const Payment = () => {
	return (
		<div className=" flex bg-amber-100 gap-4">

			<div className="w-1/4">
				<h1 className="font-semibold text-2xl py-6">Payment</h1>
				<div className="p-5 grid gap-4 custom-inset-shadow">
					<section className="custom-inset-shadow p-3 grid gap-4">
						<div className="flex gap-3">
							<img src={Profile1} alt="Profile" className="text-" />
							<p>Course Fees</p>
						</div>
						<p className="text-end text-[#18BABA]">$ 100000</p>
					</section>

					<section className="custom-inset-shadow p-3 grid gap-4">
						<div className="flex gap-3">
							<img src={Profile2} alt="Profile" className="text-" />
							<p>Amount Paid</p>
						</div>
						<p className="text-end text-[#11A21E]">$ 100000</p>
					</section>

					<section className="custom-inset-shadow p-3 grid gap-4">
						<div className="flex gap-3">
							<img src={Profile3} alt="Profile" className="text-" />
							<p>Pending Amount</p>
						</div>
						<p className="text-end text-[#C63028]" >$ 100000</p>
					</section>

					<section className="custom-inset-shadow p-3 grid gap-4">
						<div className="flex gap-3">
							<img src={Profile4} alt="Profile" className="text-" />
							<p>Status</p>
						</div>
						<p className="text-end text-[#A32AF3]">Payment Empty</p>
					</section>

					<section className="custom-inset-shadow p-3 grid gap-4">
						<div className="flex gap-3">
							<img src={Profile5} alt="Profile" className="text-" />
							<p>Payment Method</p>
						</div>
						<p className="text-end text-[#E67123]">$ 100000</p>
					</section>

				</div>
			</div>

			<div className="w-3/4 flex gap-3">
				<div className="w-1/2 bg-amber-400">
					<h1 className="font-semibold text-2xl py-6">Courses Details</h1>
					<div className="p-5 grid gap-2 custom-inset-shadow">
						<section className="custom-inset-shadow">
							<img src={Group} alt="Group" className="m-auto" />
						</section>
						<h1 className="font-semibold">MERN STACK</h1>
						<p>Anna University RO Tiruchirappali</p>
						<div className="flex justify-between">
							<section className="flex items-center gap-3 ">
								<div className="custom-inset-shadow p-3">
									<img src={Frame} alt="Frame" className="" />
								</div>
								<h2 className="font-semibold ">6 Modules</h2>
							</section>
							<section className="mt-5">
								<div className=" flex items-center gap-1">
									<div className=" flex justify-end items-center ">
										<img src={Star} alt="Star" className="" />
										<img src={Star} alt="Star" className="" />
										<img src={Star} alt="Star" className="" />
										<img src={Star} alt="Star" className="" />
										<img src={Star} alt="Star" className="" />

									</div>
									<p>4.5</p>
								</div>
								<p className="text-end font-semibold">&#8377; 500000</p>
							</section>

						</div>
					</div>


				</div>
				<div className="w-1/2 bg-blue-500">
					hello
				</div>
			</div>
		</div>
	);
};

export default Payment;
