import React, { useEffect, useState } from "react";
import API from '../Service/api';


import {
  Card, CardContent, Typography, Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Accordion, AccordionSummary,
  Grid, Modal
} from "@mui/material";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const PastOrders = () => {

  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (!username) {
      console.error("No username found in session storage!");
      return;
    }

    API.get(`/gethistory/${username}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []); 


  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ flexGrow: 1, maxWidth: 900, width: "100%", mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 5, mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#223747" }}>
            Past Orders
          </Typography>
        </Box>

        {orders.length === 0 ? (
          <Typography>No past orders found.</Typography>
        ) : (
          <Grid container spacing={3} justifyContent="flex-end" direction="row-reverse">
            {orders.map((order) => (
              <Grid item xs={12} sm={6} key={order.invoiceNumber}>
                <Accordion onClick={() => handleOpenModal(order)}>
                  <AccordionSummary>
                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {order.modelName}
                      </Typography>
                      <Typography variant="body2">Invoice: {order.invoiceNumber}</Typography>
                      <Typography variant="body2">Total: ${order.finalTotalPrice.toFixed(2)}</Typography>
                    </Box>
                  </AccordionSummary>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Modal for Order Details */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', width: 600,
          bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
        }}>
          {selectedOrder && (
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  Invoice #{selectedOrder.invoiceNumber}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="h6">
                    <strong>Manufacturer:</strong> {selectedOrder.manufacturer}
                  </Typography>
                  <Typography variant="h6">
                    <strong>Model:</strong> {selectedOrder.modelName}
                  </Typography>
                </Box>
                <Typography variant="body1">
                  <strong>Base Price:</strong> Rs.{selectedOrder.basePrice.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  <strong>Tax:</strong> Rs.{selectedOrder.tax.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  <strong>Quantity:</strong> {selectedOrder.quantity}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
                  Total: Rs.{selectedOrder.finalTotalPrice.toFixed(2)}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                  Ordered By:
                </Typography>
                <Typography variant="body1">{selectedOrder.user.userName} ({selectedOrder.user.companyName})</Typography>
                <Typography variant="body1">Email: {selectedOrder.user.email}</Typography>
                <Typography variant="body1">Contact: {selectedOrder.user.contactNumber}</Typography>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                  Components:
                </Typography>
                <Box sx={{ maxHeight: 200, overflowY: "auto", mt: 1 }}>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Component Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.components.map((component, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{component}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Modal>
      <Footer />
    </Box>
  );
};

export default PastOrders;
