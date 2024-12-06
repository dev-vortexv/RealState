import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import { propertySchema } from 'schema';
import { FormLabel, FormControl } from '@mui/material';
import { postApi } from 'views/services/api';
import { toast } from 'react-toastify';

const AddProperty = (props) => {
  const { open, handleClose } = props;
  const initialValues = {
    propertyType: '',
    propertyAddress: '',
    listingPrice: '',
    squareFootage: '',
    numberofBedrooms: '',
    numberofBathrooms: '',
    yearBuilt: '',
    propertyDescription: '',
    lotSize: '',
    parkingAvailability: 'default',
    appliancesIncluded: '',
    heatingAndCoolingSystems: '',
    flooringType: '',
    exteriorFeatures: '',
    communityAmenities: '',

    listingStatus: 'default',
    listingAgentOrTeam: '',
    listingDate: '',
    marketingDescription: '',
    multipleListingService: '',
    previousOwners: '',
    // purchaseHistory: '',
    propertyTaxes: '',
    homeownersAssociation: '',
    mortgageInformation: '',
    sellers: '',
    buyers: '',
    propertyManagers: '',
    contractorsOrServiceProviders: '',
    internalNotesOrComments: ''
  };

  const AddData = async (values, resetForm) => {
    try {
      values.createBy = JSON.parse(localStorage.getItem('user'))._id;
      let response = await postApi('api/property/addMany', values);
      if (response.status === 200) {
        toast.success('Property Added successfully');
        handleClose();
        // resetForm();
      } else {
        toast.error('cannot add property');
      }
    } catch (e) {
      console.log(e);
      toast.error('cannot add property');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: propertySchema,
    onSubmit: async (values, { resetForm }) => {
      console.log('propertyValues', values);
      AddData(values, resetForm);
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Add New Property</Typography>
          <Typography>
            <Button onClick={handleClose} style={{ color: 'red' }}>
              Cancel
            </Button>
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            {/* Basic Property Information */}
            <Typography style={{ marginBottom: '15px' }} variant="h6">
              Basic Property Information
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Property Type</FormLabel>
                <TextField
                  id="propertyType"
                  name="propertyType"
                  label=""
                  size="small"
                  placeholder="Enter Property Type"
                  fullWidth
                  value={formik.values.propertyType}
                  onChange={formik.handleChange}
                  error={formik.touched.propertyType && Boolean(formik.errors.propertyType)}
                  helperText={formik.touched.propertyType && formik.errors.propertyType}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Year Built</FormLabel>
                <TextField
                  id="yearBuilt"
                  name="yearBuilt"
                  label=""
                  placeholder="Enter Year"
                  size="small"
                  fullWidth
                  value={formik.values.yearBuilt}
                  onChange={formik.handleChange}
                  error={formik.touched.yearBuilt && Boolean(formik.errors.yearBuilt)}
                  helperText={formik.touched.yearBuilt && formik.errors.yearBuilt}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Property Address</FormLabel>
                <TextField
                  id="propertyAddress"
                  name="propertyAddress"
                  label=""
                  size="small"
                  multiline
                  placeholder="Enter Property Address"
                  rows={5}
                  fullWidth
                  value={formik.values.propertyAddress}
                  onChange={formik.handleChange}
                  error={formik.touched.propertyAddress && Boolean(formik.errors.propertyAddress)}
                  helperText={formik.touched.propertyAddress && formik.errors.propertyAddress}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Listing Price</FormLabel>
                <TextField
                  id="listingPrice"
                  name="listingPrice"
                  label=""
                  size="small"
                  placeholder="Enter Listing Price"
                  fullWidth
                  value={formik.values.listingPrice}
                  onChange={formik.handleChange}
                  error={formik.touched.listingPrice && Boolean(formik.errors.listingPrice)}
                  helperText={formik.touched.listingPrice && formik.errors.listingPrice}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Square Footage</FormLabel>
                <TextField
                  id="squareFootage"
                  name="squareFootage"
                  label=""
                  size="small"
                  placeholder="Enter Square Footage"
                  fullWidth
                  value={formik.values.squareFootage}
                  onChange={formik.handleChange}
                  error={formik.touched.squareFootage && Boolean(formik.errors.squareFootage)}
                  helperText={formik.touched.squareFootage && formik.errors.squareFootage}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Number of Bedrooms</FormLabel>
                <TextField
                  id="numberofBedrooms"
                  name="numberofBedrooms"
                  type="number"
                  size="small"
                  placeholder="Enter Number of Bedrooms"
                  fullWidth
                  value={formik.values.numberofBedrooms}
                  onChange={formik.handleChange}
                  error={formik.touched.numberofBedrooms && Boolean(formik.errors.numberofBedrooms)}
                  helperText={formik.touched.numberofBedrooms && formik.errors.numberofBedrooms}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Number of Bathrooms</FormLabel>
                <TextField
                  id="numberofBathrooms"
                  name="numberofBathrooms"
                  type="number"
                  size="small"
                  placeholder="Enter Number of Bathrooms"
                  fullWidth
                  value={formik.values.numberofBathrooms}
                  onChange={formik.handleChange}
                  error={formik.touched.numberofBathrooms && Boolean(formik.errors.numberofBathrooms)}
                  helperText={formik.touched.numberofBathrooms && formik.errors.numberofBathrooms}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <FormLabel>Property Description</FormLabel>
                <TextField
                  id="propertyDescription"
                  name="propertyDescription"
                  label=""
                  size="small"
                  multiline
                  rows={3}
                  placeholder="Enter Property Description"
                  fullWidth
                  value={formik.values.propertyDescription}
                  onChange={formik.handleChange}
                  error={formik.touched.propertyDescription && Boolean(formik.errors.propertyDescription)}
                  helperText={formik.touched.propertyDescription && formik.errors.propertyDescription}
                />
              </Grid>
            </Grid>
            {/* Property Features and Amenities */}
            <Typography style={{ marginBottom: '15px', marginTop: '15px' }} variant="h6">
              Property Features and Amenities
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Lot Size</FormLabel>
                <TextField
                  id="lotSize"
                  name="lotSize"
                  label=""
                  size="small"
                  placeholder="Enter Lot Size"
                  fullWidth
                  value={formik.values.lotSize}
                  onChange={formik.handleChange}
                  error={formik.touched.lotSize && Boolean(formik.errors.lotSize)}
                  helperText={formik.touched.lotSize && formik.errors.lotSize}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Appliances Included</FormLabel>
                <TextField
                  id="appliancesIncluded"
                  name="appliancesIncluded"
                  label=""
                  size="small"
                  placeholder="Enter Appliances Included"
                  fullWidth
                  value={formik.values.appliancesIncluded}
                  onChange={formik.handleChange}
                  error={formik.touched.appliancesIncluded && Boolean(formik.errors.appliancesIncluded)}
                  helperText={formik.touched.appliancesIncluded && formik.errors.appliancesIncluded}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Heating and Cooling Systems</FormLabel>
                <TextField
                  id="heatingAndCoolingSystems"
                  name="heatingAndCoolingSystems"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Enter Heating and Cooling Systems "
                  value={formik.values.heatingAndCoolingSystems}
                  onChange={formik.handleChange}
                  error={formik.touched.heatingAndCoolingSystems && Boolean(formik.errors.heatingAndCoolingSystems)}
                  helperText={formik.touched.heatingAndCoolingSystems && formik.errors.heatingAndCoolingSystems}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Flooring Type</FormLabel>
                <TextField
                  id="flooringType"
                  name="flooringType"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Enter Flooring Type "
                  value={formik.values.flooringType}
                  onChange={formik.handleChange}
                  error={formik.touched.flooringType && Boolean(formik.errors.flooringType)}
                  helperText={formik.touched.flooringType && formik.errors.flooringType}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Exterior Features</FormLabel>
                <TextField
                  id="exteriorFeatures"
                  name="exteriorFeatures"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Enter Exterior Features"
                  value={formik.values.exteriorFeatures}
                  onChange={formik.handleChange}
                  error={formik.touched.exteriorFeatures && Boolean(formik.errors.exteriorFeatures)}
                  helperText={formik.touched.exteriorFeatures && formik.errors.exteriorFeatures}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Community Amenities</FormLabel>
                <TextField
                  id="communityAmenities"
                  name="communityAmenities"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Enter Community Amenities"
                  value={formik.values.communityAmenities}
                  onChange={formik.handleChange}
                  error={formik.touched.communityAmenities && Boolean(formik.errors.communityAmenities)}
                  helperText={formik.touched.communityAmenities && formik.errors.communityAmenities}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={12}>
                <FormControl fullWidth>
                  <FormLabel>Parking Availability</FormLabel>
                  <Select
                    id="parkingAvailability"
                    name="parkingAvailability"
                    label=""
                    size="small"
                    fullWidth
                    placeholder=""
                    value={formik.values.parkingAvailability}
                    onChange={formik.handleChange}
                    error={formik.touched.parkingAvailability && Boolean(formik.errors.parkingAvailability)}
                  >
                    <MenuItem value="default" disabled>
                      Select Parking Availability
                    </MenuItem>

                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Listing and Marketing Details */}
            <Typography style={{ marginBottom: '15px', marginTop: '15px' }} variant="h6">
              Listing and Marketing Details
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth>
                  <FormLabel>Listing Status</FormLabel>
                  <Select
                    id="listingStatus"
                    name="listingStatus"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.listingStatus}
                    onChange={formik.handleChange}
                    error={formik.touched.listingStatus && Boolean(formik.errors.listingStatus)}
                  >
                    <MenuItem value="default" disabled>
                      Select Listing Status
                    </MenuItem>

                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Sold">Sold</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <FormLabel>Listing Agent Or Team</FormLabel>
                <TextField
                  id="listingAgentOrTeam"
                  name="listingAgentOrTeam"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Enter Listing Agent Or Team"
                  value={formik.values.listingAgentOrTeam}
                  onChange={formik.handleChange}
                  error={formik.touched.listingAgentOrTeam && Boolean(formik.errors.listingAgentOrTeam)}
                  helperText={formik.touched.listingAgentOrTeam && formik.errors.listingAgentOrTeam}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Listing Date</FormLabel>

                <TextField
                  id="listingDate"
                  name="listingDate"
                  label=""
                  type="date"
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={formik.values.listingDate}
                  onChange={formik.handleChange}
                  error={formik.touched.listingDate && Boolean(formik.errors.listingDate)}
                  helperText={formik.touched.listingDate && formik.errors.listingDate}
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <FormLabel>Marketing Description</FormLabel>
                <TextField
                  id="marketingDescription"
                  name="marketingDescription"
                  label=""
                  size="small"
                  multiline
                  rows={5}
                  fullWidth
                  placeholder="Enter Marketing Description"
                  value={formik.values.marketingDescription}
                  onChange={formik.handleChange}
                  error={formik.touched.marketingDescription && Boolean(formik.errors.marketingDescription)}
                  helperText={formik.touched.marketingDescription && formik.errors.marketingDescription}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Multiple Listing Service</FormLabel>
                <TextField
                  id="multipleListingService"
                  name="multipleListingService"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Enter Multiple Listing Services"
                  value={formik.values.multipleListingService}
                  onChange={formik.handleChange}
                  error={formik.touched.multipleListingService && Boolean(formik.errors.multipleListingService)}
                  helperText={formik.touched.multipleListingService && formik.errors.multipleListingService}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Previous Owners</FormLabel>
                <TextField
                  id="previousOwners"
                  name="previousOwners"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Enter Previous Owners"
                  value={formik.values.previousOwners}
                  onChange={formik.handleChange}
                  error={formik.touched.previousOwners && Boolean(formik.errors.previousOwners)}
                  helperText={formik.touched.previousOwners && formik.errors.previousOwners}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Property Taxes</FormLabel>
                <TextField
                  id="propertyTaxes"
                  name="propertyTaxes"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Property Taxes"
                  value={formik.values.propertyTaxes}
                  onChange={formik.handleChange}
                  error={formik.touched.propertyTaxes && Boolean(formik.errors.propertyTaxes)}
                  helperText={formik.touched.propertyTaxes && formik.errors.propertyTaxes}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <FormLabel>Homeowners Association</FormLabel>
                <TextField
                  id="homeownersAssociation"
                  name="homeownersAssociation"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Homeowners Association"
                  value={formik.values.homeownersAssociation}
                  onChange={formik.handleChange}
                  error={formik.touched.homeownersAssociation && Boolean(formik.errors.homeownersAssociation)}
                  helperText={formik.touched.homeownersAssociation && formik.errors.homeownersAssociation}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <FormLabel>Mortgage Information</FormLabel>
                <TextField
                  id="mortgageInformation"
                  name="mortgageInformation"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Mortgage Information"
                  value={formik.values.mortgageInformation}
                  onChange={formik.handleChange}
                  error={formik.touched.mortgageInformation && Boolean(formik.errors.mortgageInformation)}
                  helperText={formik.touched.mortgageInformation && formik.errors.mortgageInformation}
                />
              </Grid>
            </Grid>

            {/* Involved Parties */}
            <Typography style={{ marginBottom: '15px', marginTop: '15px' }} variant="h6">
              Involved Parties
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Sellers</FormLabel>
                <TextField
                  id="sellers"
                  name="sellers"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Sellers"
                  value={formik.values.sellers}
                  onChange={formik.handleChange}
                  error={formik.touched.sellers && Boolean(formik.errors.sellers)}
                  helperText={formik.touched.sellers && formik.errors.sellers}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Buyers</FormLabel>
                <TextField
                  id="buyers"
                  name="buyers"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Buyers"
                  value={formik.values.buyers}
                  onChange={formik.handleChange}
                  error={formik.touched.buyers && Boolean(formik.errors.buyers)}
                  helperText={formik.touched.buyers && formik.errors.buyers}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel>Property Managers</FormLabel>
                <TextField
                  id="propertyManagers"
                  name="propertyManagers"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Property Managers"
                  value={formik.values.propertyManagers}
                  onChange={formik.handleChange}
                  error={formik.touched.propertyManagers && Boolean(formik.errors.propertyManagers)}
                  helperText={formik.touched.propertyManagers && formik.errors.propertyManagers}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={12}>
                <FormLabel>Contractors or Service Providers</FormLabel>
                <TextField
                  id="contractorsOrServiceProviders"
                  name="contractorsOrServiceProviders"
                  label=""
                  size="small"
                  fullWidth
                  placeholder="Contractors or service providers "
                  value={formik.values.contractorsOrServiceProviders}
                  onChange={formik.handleChange}
                  error={formik.touched.contractorsOrServiceProviders && Boolean(formik.errors.contractorsOrServiceProviders)}
                  helperText={formik.touched.contractorsOrServiceProviders && formik.errors.contractorsOrServiceProviders}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Internal Notes or Comments</FormLabel>
                <TextField
                  id="internalNotesOrComments"
                  name="internalNotesOrComments"
                  label=""
                  size="small"
                  multiline
                  rows={5}
                  placeholder="Internal notes or comments"
                  fullWidth
                  value={formik.values.internalNotesOrComments}
                  onChange={formik.handleChange}
                  error={formik.touched.internalNotesOrComments && Boolean(formik.errors.internalNotesOrComments)}
                  helperText={formik.touched.internalNotesOrComments && formik.errors.internalNotesOrComments}
                />
              </Grid>
            </Grid>

            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                Add Property
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProperty;
