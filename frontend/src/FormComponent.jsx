import React, { useState, useEffect } from "react";
import { TextField, Container, Typography, Box } from "@mui/material";

// calculate the total
const calculateTotal = (quantity, price) => {
  return Number(quantity) * Number(price);
};

const FormComponent = () => {
  // State to hold form values
  const [formData, setFormData] = useState({
    quantity: "",
    price: "",
    total: "",
    profit: "",
  });

  // A flag to know if the user has modified the data.
  // Initially, the data is coming from the API.
  const [userModified, setUserModified] = useState(false);

  // Fetching the default values from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/form-data")
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handleing changes for quantity and price fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Mark that the user has modified the data
    setUserModified(true);

    // Updateing the field in the form data
    const updatedFormData = { ...formData, [name]: value };

    // If quantity or price changes, recalculating the total
    if (name === "quantity" || name === "price") {
      updatedFormData.total = calculateTotal(
        updatedFormData.quantity,
        updatedFormData.price
      );
    }

    setFormData(updatedFormData);
  };

  // Handle changes for profit (independent field)
  const handleProfitChange = (e) => {
    setUserModified(true);
    setFormData({ ...formData, profit: e.target.value });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Dynamic Calculation Form
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Quantity Field */}
        <TextField
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          variant="outlined"
        />

        {/* Price Field */}
        <TextField
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          variant="outlined"
        />

        {/* Total Field */}
        <TextField
          label="Total"
          name="total"
          value={userModified ? formData.total : formData.total} //  if API data is used, we show it. If user modifies, total is recalculated.
          variant="outlined"
          InputProps={{
            readOnly: true, // Total is calculated automatically
          }}
        />

        {/* Profit Field */}
        <TextField
          label="Profit"
          name="profit"
          value={formData.profit}
          onChange={handleProfitChange}
          variant="outlined"
        />
      </Box>
    </Container>
  );
};

export default FormComponent;
