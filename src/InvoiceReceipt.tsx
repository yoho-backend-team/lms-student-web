import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
// @ts-ignore
import * as html2pdf from "html2pdf.js";
import { GetImageUrl } from "./utils/helper";

// ✅ Dummy data
const feesArray = [
  {
    student: {
      full_name: "John Doe",
      id: "STU12345",
      email: "john.doe@example.com",
      contact_info: {
        phone_number: "+91 9876543210",
      },
    },
  },
];

const feesdata = {
  course: {
    course_name: "Full Stack Development",
    duration: "6 Months",
  },
  course_fees: 50000,
  pending_payment: 10000,
};

const sign =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Signature_of_Albert_Einstein.svg/1280px-Signature_of_Albert_Einstein.svg.png";
const paid =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Stamp_Paid.svg/512px-Stamp_Paid.svg.png";

const formatDate = (d: Date) => d.toLocaleDateString("en-GB");
const formatTime = (d: Date) => d.toLocaleTimeString("en-GB");

interface ReceiptModalProps {
  open: boolean;
  onClose: () => void;
  paymentDetails:any
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ open, onClose ,paymentDetails}) => {
  console.log(paymentDetails,"hdsuhushsuh")
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (receiptRef.current) {
      const element = receiptRef.current;
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `receipt-${Date.now()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      html2pdf().from(element).set(opt).save();
    }
  };

  const instituteData = paymentDetails?.fees?.[0]?.institute_id
    const studentData = paymentDetails?.fees?.[0]?.student



  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent
        sx={{
          p: 3,
          background: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Download Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          sx={{ mb: 2, alignSelf: "flex-end" }}
        >
          Download PDF
        </Button>

        {/* RECEIPT CONTENT */}
        <Box
          ref={receiptRef}
          sx={{
            width: "100%",
            background: "#fff",
            p: 4,
            borderRadius: 2,
            boxShadow: 2,
            fontFamily: "Inter",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              alignItems: "center",
            }}
          >
            <img
              src={GetImageUrl(instituteData?.logo)}
              alt="Logo"
              style={{ height: "60px" }}
            />
            <Box textAlign="right">
              <Typography fontWeight={700}>Bill Invoice / Receipt</Typography>
              <Typography fontSize={12}>{instituteData?.email}</Typography>
              <Typography fontSize={12}>{instituteData?.contact_info.phone_no}</Typography>
              <Typography fontSize={12}>{instituteData?.website}</Typography>
            </Box>
          </Box>

          {/* DETAILS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
              gap: 3,
            }}
          >
            {/* Student details */}
            <Box flex={1}>
              <Typography fontWeight={700} mb={1}>
                Student Details
              </Typography>
              {feesArray.map((item, idx) => (
                <Box key={idx} sx={{ mb: 1 }}>
                  <Typography fontSize={12}>
                    <b>Name:</b> {item.student.full_name}
                  </Typography>
                  <Typography fontSize={12}>
                    <b>ID:</b> {item.student.id}
                  </Typography>
                  <Typography fontSize={12}>
                    <b>Email:</b> {item.student.email}
                  </Typography>
                  <Typography fontSize={12}>
                    <b>Contact:</b> {item.student.contact_info.phone_number}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Course details */}
            <Box flex={1}>
              <Typography fontWeight={700} mb={1}>
                Course Details
              </Typography>
              <Typography fontSize={12}>
                {feesdata.course.course_name}
              </Typography>
              <Typography fontSize={12}>By Rajalakshmi Institute</Typography>
              <Typography fontSize={12}>
                Duration: {feesdata.course.duration}
              </Typography>
            </Box>

            {/* Fees details */}
            <Box flex={1}>
              <Typography fontWeight={700} mb={1}>
                Fees Details
              </Typography>
              <Typography fontSize={12}>
                Course Fees: ₹{feesdata.course_fees}
              </Typography>
              <Typography fontSize={12} color="error">
                Pending: ₹{feesdata.pending_payment}
              </Typography>
              <Typography fontSize={12} color="green">
                Paid: ₹{feesdata.course_fees - feesdata.pending_payment}
              </Typography>
            </Box>
          </Box>

          {/* Paid Amount */}
          <Box sx={{ mb: 3 }}>
            <Typography fontWeight={700}>
              Paid Amount on {formatDate(new Date())} at{" "}
              {formatTime(new Date())}
            </Typography>
            <Typography color="green" fontWeight={700}>
              ₹{feesdata.course_fees - feesdata.pending_payment}
            </Typography>
          </Box>

          {/* Transaction Table */}
          <Box
            sx={{
              p: 2,
              border: "2px solid skyblue",
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 18,
                mb: 2,
                pb: 1,
                borderBottom: "2px solid #06496E",
                color: "#06496E",
              }}
            >
              Transaction
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ background: "#0051C8" }}>
                  <TableRow>
                    {[
                      "Payment Type",
                      "GST",
                      "Other Tax",
                      "Total Amount",
                      "Mode",
                      "Method",
                    ].map((head, i) => (
                      <TableCell
                        key={i}
                        sx={{ color: "#fff", fontWeight: 600, textAlign: "center" }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">Monthly</TableCell>
                    <TableCell align="center">1800</TableCell>
                    <TableCell align="center">200</TableCell>
                    <TableCell align="center">{feesdata.course_fees}</TableCell>
                    <TableCell align="center">Online</TableCell>
                    <TableCell align="center">Gpay</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Status */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
            <Typography fontWeight={700} mr={2}>
              Status:
            </Typography>
            <Box
              sx={{
                px: 3,
                py: 1,
                backgroundColor: "#D2FDD6",
                color: "#2AAD37",
                fontWeight: 700,
                border: "2px solid #2AAD37",
                borderRadius: 1,
              }}
            >
              Payment Success
            </Box>
          </Box>

          {/* Signature */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
            <Typography fontWeight={700} mr={2}>
              Signature:
            </Typography>
            <Box textAlign="center">
              <img src={sign} alt="Signature" style={{ height: 40 }} />
              <img
                src={paid}
                alt="Paid"
                style={{ height: 50, marginTop: -20 }}
              />
            </Box>
          </Box>

          {/* Footer */}
          <Typography textAlign="center" fontWeight={700} mb={1}>
            Thank You
          </Typography>
          <Box
            sx={{
              textAlign: "center",
              fontSize: 12,
              background: "#ACC1E1",
              py: 1,
              borderRadius: 1,
            }}
          >
            All Rights Reserved @2024 Regulations
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
