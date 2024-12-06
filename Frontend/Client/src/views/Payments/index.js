import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Grid, Typography, Button, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import americanexpress from 'assets/images/payments/americanexpress.png';
import mastercard from 'assets/images/payments/mastercard.png';
import visa from 'assets/images/payments/visa.png';

// ----------------------------------------------------------------------
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  amount: Yup.number().min(0, 'Amount must be greater than or equal to 0').required('Amount is required')
});

const initialValues = {
  name: '',
  email: '',
  amount: ''
};

const Payments = () => {
  return (
    <Box sx={{ flexGrow: 1, overflowX: 'auto' }}>
      <Grid container spacing={2} justifyContent={'center'}>
        {/* Payment Form */}
        <Grid item xs={12} md={8}>
          <Item>
            <Typography variant="h5" gutterBottom>
              Payments
            </Typography>
            <Grid container justifyContent="center">
              <div
                style={{
                  width: '50px',
                  height: '40px',
                  margin: 'auto',
                  overflow: 'hidden'
                }}
              >
                <img src={americanexpress} alt="1" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              <div
                style={{
                  width: '50px',
                  height: '40px',
                  // margin: 'auto',
                  overflow: 'hidden'
                }}
              >
                <img src={mastercard} alt="2" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              <div
                style={{
                  width: '50px',
                  height: '40px',
                  margin: 'auto',
                  overflow: 'hidden'
                }}
              >
                <img src={visa} alt="3" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </Grid>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                // Handle form submission logic here
                console.log(values);
                setSubmitting(false);
              }}
            >
              <Form>
                <Box sx={{ marginBottom: 2 }}>
                  <Field name="name" as={TextField} label="Name" fullWidth />
                  <ErrorMessage name="name" component="div" sx={{ color: 'red' }} />
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Field name="email" as={TextField} label="Email" fullWidth />
                  <ErrorMessage name="email" component="div" sx={{ color: 'red' }} />
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Field name="amount" as={TextField} label="Amount" fullWidth type="number" />
                  <ErrorMessage name="amount" component="div" sx={{ color: 'red' }} />
                </Box>

                <Button type="submit" variant="contained" color="primary">
                  Pay
                </Button>
              </Form>
            </Formik>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payments;
