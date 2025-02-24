import React, { useState } from 'react';
import API from '../Service/api';
import { Box, TextField, Button, Typography, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";

const Gst_rex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;

export default function FormComponent() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    authorizedPersonName: '',
    designation: '',
    companyName: '',
    gstNumber: '',
    contactNumber: '',
    telephone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (!Gst_rex.test(formData.gstNumber)) {
      alert("Invalid GST Number format.");
      return;
    }
  
    try {
      const response = await API.post("/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Response:", response.data);
      alert("Registration successful!");
      navigate("/LoginPage"); // Redirect user to Login page
    } catch (error) {
      console.error("Error during sign-up:", error.response?.data || error.message);
      alert("Registration failed!");
    }
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: 1000 },
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          color="#223747"
          textAlign="center"
          fontFamily="Poppins"
          gutterBottom
        >
          Registration
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {/* Left Column */}               
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, marginRight: '16px' }}>
              <Fade cascade={false} delay={100} direction="up">
                <TextField label="Username" name="username" value={formData.username} onChange={handleChange} required fullWidth />
              </Fade>
              <Fade cascade={false} delay={200} direction="up">
                <TextField type="email" label="Email" name="email" value={formData.email} onChange={handleChange} required fullWidth />
              </Fade>
              <Fade cascade={false} delay={300} direction="up">
                <TextField type="password" label="Password" name="password" value={formData.password} onChange={handleChange} required fullWidth />
              </Fade>
              <Fade cascade={false} delay={400} direction="up">
                <TextField label="Authorized Person Name" name="authorizedPersonName" value={formData.authorizedPersonName} onChange={handleChange} required fullWidth />
              </Fade>
              <Fade cascade={false} delay={500} direction="up">
                <TextField label="Designation" name="designation" value={formData.designation} onChange={handleChange} required fullWidth />
              </Fade>
              <Fade cascade={false} delay={600} direction="up">
                <TextField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} required fullWidth />
              </Fade>
              <Fade cascade={false} delay={700} direction="up">
                <TextField label="GST No" name="gstNumber" value={formData.gstNumber} onChange={handleChange} required fullWidth />
              </Fade>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              <Fade cascade={false} delay={800} direction="up">
                <TextField label="Contact No" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required fullWidth />
              </Fade>
              <Fade cascade={false} delay={900} direction="up">
                <TextField label="Telephone No (Optional)" name="telephone" value={formData.telephone} onChange={handleChange} fullWidth />
              </Fade>
              <Fade cascade={false} delay={1000} direction="up">
                <TextField label="Address Line 1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} required fullWidth />
              </Fade>
              <Fade cascade={false} delay={1100} direction="up">
                <TextField label="Address Line 2 (Optional)" name="addressLine2" value={formData.addressLine2} onChange={handleChange} fullWidth />
              </Fade>
              <Fade cascade={false} delay={1200} direction="up">
                <TextField label="City" name="city" value={formData.city} onChange={handleChange} required fullWidth />
              </Fade>
              <Fade cascade={false} delay={1300} direction="up">
                <TextField label="State" name="state" value={formData.state} onChange={handleChange} required fullWidth />
              </Fade>
              <Fade cascade={false} delay={1400} direction="up">
                <TextField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} required fullWidth />
              </Fade>
            </div>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px', width: '100%' }}>
              Submit
            </Button>
          </form>

          {/* Already a user? Login */}
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ marginTop: 2 }}
          >
            Already a user?{" "}
            <span
              style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate("/LoginPage")}
            >
              Login
            </span>
          </Typography>
        </CardContent>
      </Box>
    </Box>
  );
}