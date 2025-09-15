/* eslint-disable @typescript-eslint/no-explicit-any */

import jsPDF from "jspdf";
import React, { useRef } from "react";
import { GetImageUrl } from "./helper";
import * as DomToImage from "dom-to-image";

const formatDate = (d: Date) => d.toLocaleDateString("en-GB");
const formatTime = (d: Date) => d.toLocaleTimeString("en-GB");

interface ReceiptModalProps {
  open: boolean;
  onClose: () => void;
  paymentDetails: any;
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  overflow: "auto",
};

const dialogStyle: React.CSSProperties = {
  width: "220mm", // Slightly wider container
  maxHeight: "90vh",
  background: "#f8f9fa",
  borderRadius: "8px",
  padding: "16px",
  margin: "20px auto",
  overflow: "auto",
};

const receiptStyle: React.CSSProperties = {
  width: "210mm", // Exact A4 width
  minHeight: "297mm", // Exact A4 height
  background: "#fff",
  padding: "15mm", // Standard A4 margins
  margin: "0 auto",
  boxSizing: "border-box",
  fontFamily: "Arial, sans-serif",
  fontSize: "12px",
  lineHeight: "1.4",
  color: "#333",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "30px",
  paddingBottom: "0",
  borderBottom: "none",
};

const logoStyle: React.CSSProperties = {
  height: "60px",
  maxWidth: "120px",
  objectFit: "contain",
};

const headerInfoStyle: React.CSSProperties = {
  textAlign: "right" as const,
  fontSize: "12px",
  lineHeight: "1.3",
};

const sectionTitleStyle: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: "14px",
  marginBottom: "12px",
  color: "#000",
  borderBottom: "none",
  paddingBottom: "0",
};

const detailsContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "30px",
  marginBottom: "30px",
  fontSize: "12px",
};

const detailSectionStyle: React.CSSProperties = {
  padding: "0",
  border: "none",
  borderRadius: "0",
  backgroundColor: "transparent",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse" as const,
  marginTop: "10px",
  fontSize: "11px",
};

const tableHeaderStyle: React.CSSProperties = {
  backgroundColor: "#0051C8",
  color: "#fff",
  fontWeight: "bold",
  padding: "10px 8px",
  textAlign: "center" as const,
  border: "1px solid #ddd",
};

const tableCellStyle: React.CSSProperties = {
  padding: "12px 8px",
  textAlign: "center" as const,
  border: "1px solid #ccc",
  backgroundColor: "#fff",
};

const statusContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginBottom: "25px",
  gap: "10px",
};

const statusBadgeStyle: React.CSSProperties = {
  padding: "8px 16px",
  backgroundColor: "transparent",
  color: "#000",
  fontWeight: "bold",
  border: "2px solid #000",
  borderRadius: "6px",
  fontSize: "12px",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center" as const,
  marginTop: "30px",
  borderTop: "2px solid #eee",
  paddingTop: "15px",
};

const ReceiptModal: React.FC<ReceiptModalProps> = ({
  open,
  onClose,
  paymentDetails,
}) => {

  const receiptRef = useRef<HTMLDivElement>(null);
  const instituteData = paymentDetails?.fees?.[0]?.institute_id;
  const studentData = paymentDetails?.fees?.[0]?.student;
  const courseData = paymentDetails?.fees?.[0]?.course_id;

  const handleDownload = async () => {
    if (!receiptRef.current) return;

    try {
      const dataUrl = await DomToImage.toPng(receiptRef.current, {
        quality: 1.0,
        bgcolor: '#ffffff',
        width: receiptRef.current.scrollWidth,
        height: receiptRef.current.scrollHeight,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const img = new Image();

      img.onload = () => {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Calculate proper scaling
        const imgAspectRatio = img.width / img.height;
        // const pageAspectRatio = pageWidth / pageHeight;

        let imgWidth = pageWidth;
        let imgHeight = pageWidth / imgAspectRatio;

        // If image is taller than page, scale to fit height
        if (imgHeight > pageHeight) {
          imgHeight = pageHeight;
          imgWidth = pageHeight * imgAspectRatio;
        }

        // Center the image on the page
        const xOffset = (pageWidth - imgWidth) / 2;
        const yOffset = (pageHeight - imgHeight) / 2;

        pdf.addImage(img, "PNG", xOffset, yOffset, imgWidth, imgHeight);
        pdf.save(`receipt-${Date.now()}.pdf`);
      };

      img.src = dataUrl;
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        {/* Control Buttons */}
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "#dc3545",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "10px",
              fontSize: "14px",
            }}
          >
            ✕ Close
          </button>
          <button
            onClick={handleDownload}
            style={{
              border: "none",
              background: "#0d6efd",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            📄 Download PDF
          </button>
        </div>

        <div ref={receiptRef} style={receiptStyle}>
          <div style={headerStyle}>
            <img
              src={GetImageUrl(instituteData?.logo) ?? undefined}
              alt="Institute Logo"
              style={logoStyle}
            />
            <div style={headerInfoStyle}>
              <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "5px" }}>
                Bill Invoice / Receipt
              </div>
              <div>{instituteData?.email}</div>
              <div>{instituteData?.contact_info?.phone_no}</div>
              <div>{instituteData?.website}</div>
            </div>
          </div>

          <div style={detailsContainerStyle}>
            <div style={detailSectionStyle}>
              <div style={sectionTitleStyle}>Student Details</div>
              <div style={{ lineHeight: "1.6" }}>
                <div><strong>Name:</strong> {studentData?.full_name}</div>
                <div><strong>ID:</strong> {studentData?.roll_no}</div>
                <div><strong>Email:</strong> {studentData?.email}</div>
                <div><strong>Contact:</strong> {studentData?.contact_info?.phone_number}</div>
              </div>
            </div>

            <div style={detailSectionStyle}>
              <div style={sectionTitleStyle}>Course Details</div>
              <div style={{ lineHeight: "1.6" }}>
                <div><strong>Course:</strong> {courseData?.course_name}</div>
                <div><strong>Institute:</strong> {instituteData?.institute_name}</div>
                <div><strong>Duration:</strong> {courseData?.duration}</div>
              </div>
            </div>

            <div style={detailSectionStyle}>
              <div style={sectionTitleStyle}>Fees Details</div>
              <div style={{ lineHeight: "1.6" }}>
                <div><strong>Course Fees:</strong> {paymentDetails?.course_fees}</div>
                <div style={{ color: "#dc3545" }}>
                  <strong>Pending:</strong> {paymentDetails?.pending_payment}
                </div>
                <div style={{ color: "#28a745" }}>
                  <strong>Paid:</strong> {paymentDetails?.totalAmount}
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginBottom: "30px",
            padding: "0",
            backgroundColor: "transparent",
            borderRadius: "0"
          }}>
            <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "8px" }}>
              Payment Made on {formatDate(new Date())} at {formatTime(new Date())}
            </div>
            <div style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: "16px"
            }}>
              Amount Paid: {paymentDetails?.totalAmount}
            </div>
          </div>

          <div style={{
            padding: "0",
            border: "none",
            borderRadius: "0",
            marginBottom: "30px",
          }}>
            <div style={{
              fontWeight: "bold",
              fontSize: "16px",
              marginBottom: "15px",
              paddingBottom: "0",
              borderBottom: "none",
              color: "#000",
            }}>
              Transaction Details
            </div>

            <table style={tableStyle}>
              <thead>
                <tr>
                  {[
                    "Payment Type",
                    "GST (₹)",
                    "Other Tax (₹)",
                    "Total Amount (₹)",
                    "Mode",
                    "Method",
                  ].map((header) => (
                    <th key={header} style={tableHeaderStyle}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tableCellStyle}>Monthly</td>
                  <td style={tableCellStyle}>{paymentDetails?.fees[0]?.gst}</td>
                  <td style={tableCellStyle}>{paymentDetails?.fees[0].other_taxes}</td>
                  <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                    {paymentDetails?.totalAmount}
                  </td>
                  <td style={tableCellStyle}>Offline</td>
                  <td style={tableCellStyle}>Cash</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Status Section */}
          <div style={statusContainerStyle}>
            <span style={{ fontWeight: "bold" }}>Status:</span>
            <div style={statusBadgeStyle}>
              ✓ Payment Success
            </div>
          </div>

          <div style={footerStyle}>
            <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "10px" }}>
              Thank You for Your Payment!
            </div>
            <div style={{
              fontSize: "11px",
              backgroundColor: "#ACC1E1",
              padding: "10px",
              borderRadius: "4px",
              color: "#333",
            }}>
              All Rights Reserved © 2024 {instituteData?.institute_name} | This is a computer-generated receipt
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;