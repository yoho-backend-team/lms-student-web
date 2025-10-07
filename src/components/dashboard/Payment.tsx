import React, { useEffect, useState } from "react";
import payments from "../../assets/dashboard/payments.png";
import { FONTS } from "@/constants/uiConstants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentPaymentThunk } from "@/features/Payment/reducers/thunks";
import { GetLocalStorage } from "@/utils/helper";

const Payment: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const storedData = GetLocalStorage("user");
    console.log("StoreData", storedData);  
    setStudent(storedData);
  }, []);

  useEffect(() => {
    if (student?.uuid) {
      dispatch(getStudentPaymentThunk({ paymentId: student.uuid }));
    }
  }, [dispatch, student]);

  const paymentData: any = useSelector((state: any) => state.PaymentSlice.data);
  // console.log("payment", paymentData);
  const paymentHistory = paymentData?.payment_history ?? [];
  const currentPending = paymentHistory[paymentHistory.length - 1] || null;

  return (
    <div className="flex flex-row p-5 gap-10 divshadow w-full h-[300px] rounded-[16px]">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <h1 style={{ ...FONTS.heading_02 }}>Payment</h1>
          <p style={{ ...FONTS.heading_06 }} className="w-[300px] ">
            Due date:{" "}
            <span style={{ ...FONTS.heading_04 }}>
              {currentPending?.duepaymentdate || "N/A"}
            </span>
          </p>
          <p style={{ ...FONTS.heading_06 }}>Amount to pay:</p>
          <p style={{ ...FONTS.heading_03, fontSize: "30px" }}>
            ₹{currentPending?.balance || 0}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/payment")}
          className="btnshadow w-[145px] h-[42px] rounded-xl btnhovershadow hover:!text-white focus:!text-white"
          style={{ ...FONTS.heading_06 }}
        >
          Check Payments
        </button>
      </div>
      <div>
        <img src={payments} alt="Payments" className="mt-10" />
      </div>
    </div>
  );
};

export default Payment;
