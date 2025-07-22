import React, { forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import html2pdf from 'html2pdf.js';
import { formatDate, formatTime } from 'utils/formatDate';
import logo from '../../../../assets/images/logo.png';
import sign from '../../../../assets/sign.png';
import paid from '../../../../assets/paid.png';


const InvoiceReceipt = forwardRef(({ feesdata = {} }, ref) => {
  useImperativeHandle(ref, () => ({
    generatePDF: () => {
      const element = document.getElementById('inovioceReceipt');
      const options = {
        margin: [10, 10, 10, 10],
        filename: 'invoice-receipt.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm',  format: 'a4',orientation: 'portrait' }
      };
      html2pdf().from(element).set(options).save();
    }
  }));

  const date = new Date();
  const formattedDate = date.toLocaleDateString();
  const formattedDateTime = date.toISOString().slice(0, 19).replace('T', ' ');

  // Ensure feesdata is treated as an array where needed
  const feesArray = Array.isArray(feesdata.fees) ? feesdata.fees : [];
  const courseArray = Array.isArray(feesdata.course) ? feesdata : [];



  const courseFees = parseFloat(feesdata?.course_fees?.replace(/[^0-9.-]+/g, '') || 0);
  const pendingPayment = parseFloat(feesdata?.pending_payment?.replace(/[^0-9.-]+/g, '') || 0);
  const paidAmount = courseFees - pendingPayment;

  return (
     <Box ref={ref} id="invoiceReceipt" sx={{ width: '595px', margin: '0 auto',  fontFamily: 'Poppins', height: "842px", background: "#FFF" }}>
    

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',  paddingBottom: 2 }}>
         <img src={logo} alt="Logo" style={{ height: '80px' }} />
        
        <Box display="flex" flexDirection="column" alignItems="center" padding={3} width="100%">
          <Typography variant="h6" color="black" align="center" gutterBottom fontSize={"20px"} fontWeight={700} fontFamily={"Inter"} sx={{ marginLeft: '-120px' }}>
            Bill Invoice / Receipt
          </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginLeft: 50,
            marginTop: -9
          }}>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', marginRight: '-120px' }}>

              <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "11px", fontWeight: 600, mr: 1 }}>
                Email:
              </Typography>
              <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "10px", fontWeight: 400 }}>
                marketplace@edutech.in
              </Typography>
            </Box>




            <Box sx={{ display: 'flex', flexDirection: 'row', marginRight: '-120px' }}>

              <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "11px", fontWeight: 600, mr: 1 }}>
                Contact:
              </Typography>
              <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "10px", fontWeight: 400 }}>
                91XXXXXXXXX
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginRight: '-120px' }}>

              <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "11px", fontWeight: 600, mr: 1 }}>
                Website:
              </Typography>
              <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "10px", fontWeight: 400 }}>
                www.marketplace.com
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      


      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, padding: 2, flexDirection: 'row' }}>
        <Box>
         
            {feesArray.map((item, index) => (
                <div key={index}>
                  
                  
                  <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "10px", fontWeight: 800, lineHeight: "normal", mb: 1 }}>Student Details</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "8px", fontWeight: 600, mb: 0.5, mr: 1 }}>
                      Name: 
                    </Typography>
                     <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "8px", fontWeight: 400, mb: 0.5 }}>
                      {item?.student?.full_name}
                    </Typography> 
                    
                
                  </Box>


                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "8px", fontWeight: 600, mb: 0.5, mr: 1 }}>
                      Student ID:
                    </Typography>
                    <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "8px", fontWeight: 400, mb: 0.5 }}>
                      {item?.student?.id}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "8px", fontWeight: 600, mb: 0.5, mr: 1 }}>
                      Mail ID:
                    </Typography>
                    <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "8px", fontWeight: 400, mb: 0.5 }}>
                      {item?.student?.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "8px", fontWeight: 600, mb: 0.5, mr: 1 }}>
                      Contact:
                    </Typography>
                    <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "8px", fontWeight: 400, mb: 0.5 }}>
                      {item?.student?.contact_info?.phone_number}
                    </Typography>
                  </Box>
                </div>
              ))
            }
        </Box>


        <Box>
          <div>
            <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "13px", fontWeight: 800, lineHeight: "normal", p: 0.5, ml: 10 }}>Course Details</Typography>
            {/* <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "10px", fontWeight: 400, lineHeight: "normal", p: 0.5, ml: 10 }}>MEAN</Typography> */}
            <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "13px", fontWeight: 400, lineHeight: "normal", p: 0.5, mb: 0.5, ml: 10 }}>{feesdata?.course?.course_name}</Typography>
            <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "13px", fontWeight: 600, p: 0.5, ml: 10 }}>By Rajalakshmi Institute</Typography>
            <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "10px", fontWeight: 400, lineHeight: "normal", p: 0.5, ml: 10 }}>Duration: {feesdata?.course?.duration}</Typography>
          </div>
        </Box>
        <Box >
          <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "13px", fontWeight: 800, lineHeight: "normal", mb: 1 }}>Fees Details</Typography>
          {/* <Typography sx={{ color: "#2AAD37", fontFamily: "Inter", fontSize: "13px", fontWeight: 800, lineHeight: "14px", mb: 1 }}>{45000}</Typography> */}
          <Typography sx={{ color: "#2AAD37", fontFamily: "Nunito Sans", fontSize: "10px", fontWeight: 800, lineHeight: "14px", mb: 0.5 }}>{feesdata?.course_fees}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', mb: 0.5 }}>
            <Typography sx={{ color: "#000", fontFamily: "Nunito Sans", fontSize: "13px", fontWeight: 800, lineHeight: "14px", mr: 0.5 }}>
              Pending:
            </Typography>
           
            <Typography sx={{ color: "#F00", fontFamily: "Nunito Sans", fontSize: "13px", fontWeight: 800, lineHeight: "14px" }}>
              {feesdata?.pending_payment}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>

            <Typography sx={{ color: "#000", fontFamily: "Nunito Sans", fontSize: "13px", fontWeight: 800, lineHeight: "14px", mr: 0.5 }}>
              Paid:
            </Typography>
            <Typography sx={{ color: "#2AAD37", fontFamily: "Nunito Sans", fontSize: "13px", fontWeight: 800, lineHeight: "14px" }}>
              {40000}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginBottom: -3, padding: 2 }}>
        <div>

          <Typography sx={{ color: "#000", fontFamily: "Inter", fontSize: "13px", fontWeight: 800, lineHeight: "14px", mb: 2 }}>Paid Amount {formatDate(formattedDate)}   {formatTime(formattedDateTime)}</Typography>
          <Typography sx={{ color: "#2AAD37", fontFamily: "Inter", fontSize: "13px", fontWeight: 800, lineHeight: "14px", mb: 6 }}>{40000}</Typography>
        </div>
      </Box>
{/* Transaction Table */}
    <Box sx={{ marginTop: -4, padding: 2 }}>
  
  <Box 
  sx={{ 
    padding: '16px', 
    borderRadius: '8px', 
    backgroundColor: '#f4f4f4', 
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
    border: '2px solid skyblue' // Adding the border color as sky blue
  }}
>
  

    <Typography
      sx={{
        color: "#06496E",
        fontFamily: "Inter",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "normal",
        width: '550px',
        paddingBottom: '5px',
        borderBottom: '2px solid #06496E',
        marginBottom: 3
      }}
    >
      Transaction
    </Typography>

    {/* Transaction Table */}
    <TableContainer
      component={Paper}
      sx={{
        width: '540px',
        flexShrink: 0,
        backgroundColor: '#FFF9F9',
        marginTop: 6,
        marginLeft: 1
      }}
    >
      <Table
        sx={{
          '& thead': {
            backgroundColor: '#0051C8',
          },
          '& tbody': {
            backgroundColor: '#ACCDFF',
          },
        }}
      >
        <TableHead sx={{ width: "40.423px", height: "60px", flexShrink: 0, border: '0.477px #FFF9F9' }}>
          <TableRow>
            <TableCell align="center" style={{
              width: '80.423px',
              height: '32.421px',
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '15px',
              padding: '8px',
              border: '1px solid #CCC'
            }}>Payment Type</TableCell>
            <TableCell align="center" style={{
              width: '80.423px',
              height: '32.421px',
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '15px',
              padding: '8px',
              border: '1px solid #CCC'
            }}>GST</TableCell>
            <TableCell align="center" style={{
              width: '80.423px',
              height: '32.421px',
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '15px',
              padding: '8px',
              border: '1px solid #CCC'
            }}>Other Tax</TableCell>
            <TableCell align="center" style={{
              width: '80.423px',
              height: '32.421px',
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '15px',
              padding: '8px',
              border: '1px solid #CCC'
            }}>Total Amount</TableCell>
            <TableCell align="center" style={{
              width: '80.423px',
              height: '32.421px',
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '15px',
              padding: '8px',
              border: '1px solid #CCC'
            }}>Cash / Online</TableCell>
            <TableCell align="center" style={{
              width: '80.423px',
              height: '32.421px',
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '15px',
              padding: '8px',
              border: '1px solid #CCC'
            }}>Payment Method</TableCell>
          </TableRow>
        </TableHead>

        <TableBody sx={{ width: "40.423px", height: "50px", flexShrink: 0, border: '0.477px #FFF9F9' }}>
          <TableRow>
            <TableCell align="center" style={{
              width: '80.423px',
              height: '32.421px',
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '15px',
              padding: '8px',
              border: '1px solid #FFF9F9'
            }}>Monthly</TableCell>
            <TableCell align="center" style={{
              width: '80.423px',
              height: '32.421px',
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '15px',
              padding: '8px',
              border: '1px solid #FFF9F9'
            }}>1800</TableCell>
            <TableCell align="center" style={{
              width: '80.423px',
              height: '32.421px',
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '15px',
              padding: '8px',
              border: '1px solid #FFF9F9'
            }}>200</TableCell>
            <TableCell align="center" style={{
              width: '80.423px',
              height: '32.421px',
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '15px',
              padding: '8px',
              border: '1px solid #FFF9F9'
            }}>{feesdata?.course_fees}</TableCell>
            <TableCell align="center" style={{
              width: '80.423px',
              height: '32.421px',
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '15px',
              padding: '8px',
              border: '1px solid #FFF9F9'
            }}>Online</TableCell>
            <TableCell align="center" style={{
              width: '80.423px',
              height: '32.421px',
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '15px',
              padding: '8px',
              border: '1px solid #FFF9F9'
            }}>Gpay</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
</Box>



      
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5, paddingRight: 2 }}>
  <Typography sx={{
    marginRight: 6, color: "#000", fontFamily: "Nunito Sans",
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 800,  // This ensures the text is bold
    lineHeight: '24px'
  }}>
    Status:
  </Typography>
       
      <Box
  sx={{
    padding: '10px 20px',
    backgroundColor: '#D2FDD6',
    fontFamily: 'Nunito Sans',
    color: '#2AAD37',
    border: '2px solid #2AAD37',
    borderRadius: 2, // Slightly rounded corners
    fontWeight: 800,
    lineHeight: '24px',
    width: '150px', // Set a fixed width
    height: '40px', // Set a fixed height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  }}
>
  Payment Success
</Box>
</Box>

      
<Box
  sx={{
    display: 'flex',
    justifyContent: 'flex-end', 
    alignItems: 'center',
    marginTop: 4,
    paddingRight: 19
  }}
>
  {/* "Signature" Label */}
  <Typography
    sx={{
      marginRight: 1,  // Adjusted spacing
      color: "#000",
      fontFamily: "Nunito Sans",
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 800,  // Ensuring bold text
      lineHeight: '24px',
      ml: 30, // Removed unnecessary margin
      mb:15
    }}
  >
    Signature:
  </Typography>

 
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 7 }}>
  <img
    src={sign}
    alt="Signature"
    style={{ height: '50px', marginBottom: '5px' }} // Kept slight bottom margin for spacing
  />
  <img
    src={paid}
    alt="Paid"
    style={{ height: '60px', marginTop: '-35px', marginRight: '-30px' }} // Adjusted left margin
  />
</Box>

</Box>


      
      <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', marginBottom: 20 }}>
  <Typography
    sx={{
      marginRight: 6,
      color: "#000",
      fontFamily: "Nunito Sans",
      fontSize: '14px',  // Corrected capitalization
      fontStyle: 'normal',  
      fontWeight: 800,  // Corrected capitalization
      lineHeight: '24px',  
       mb: 10
    }}
  >
    Thank You
  </Typography>
</Box>

      <Box sx={{
        textAlign: 'center', marginTop: 4, fontSize: 12, fontFamily: "Nunito Sans", color: '#000', fontWeight: 300, width: '595px', height: '30px', flexshrink: 0, background: "#ACC1E1", display: 'flex',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <Typography>All Rights Reserved @2024 Regulations</Typography>
      </Box>
    </Box>
  );
});

export default InvoiceReceipt;