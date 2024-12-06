import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import InterestedContact from './InterestedContact';
import AddProperty from '../AddProperty';
import DeleteProperty from '../DeleteProperty';
import EditProperty from '../EditProperty';
import Gallery from './Gallery';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { getApi } from 'views/services/api';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function PropertyDashboard() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('1');
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedOption, setSelectedOption] = React.useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue) => {
    setValue(newValue);
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenEditlead = () => setOpenEdit(true);
  const handleCloseEditlead = () => setOpenEdit(false);
  const handleOpenDeleteLead = () => setDeleteDialogOpen(true);
  const handleCloseDeleteLead = () => setDeleteDialogOpen(false);

  //function for fetching property data based on the property id

  // ----------------------------------------------------------------------
  const [propertyData, setPropertyData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [interestedContacts, setInterestedContacts] = useState([]);
  const params = useParams();
  const propertyId = params.id;

  const fetchPropertyData = async () => {
    try {
      const response = await getApi(`api/property/view/${propertyId}`);
      setInterestedContacts(response.data.filteredContacts);
      setPropertyData(response.data.property);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPropertyData();
  }, [openAdd, openEdit, deleteDialogOpen]);

  return (
    <>
      <DeleteProperty open={deleteDialogOpen} handleClose={handleCloseDeleteLead} />
      <AddProperty open={openAdd} handleClose={handleCloseAdd} />
      <EditProperty open={openEdit} handleClose={handleCloseEditlead} data={propertyData} />

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="secondary" indicatorColor="secondary">
              <Tab label="Information" value="1" />
              <Tab label="Gallery" value="2" />
            </TabList>

            {/* //-----------buttons-------------------- */}
            <div>
              <Select value={selectedOption} displayEmpty inputProps={{ 'aria-label': 'Select option' }} sx={{ marginBottom: '12px' }}>
                <MenuItem value="" disabled>
                  Action
                </MenuItem>
                <MenuItem onClick={handleOpenAdd} sx={{ color: '#4CAF50' }}>
                  <AddIcon sx={{ marginRight: 1 }} />
                  Add
                </MenuItem>
                <MenuItem onClick={handleOpenEditlead} sx={{ color: '#2196F3' }}>
                  <EditIcon sx={{ marginRight: 1 }} />
                  Edit
                </MenuItem>
                <MenuItem onClick={handleOpenDeleteLead} sx={{ color: '#FF0000' }}>
                  <DeleteIcon sx={{ marginRight: 1 }} />
                  Delete
                </MenuItem>
              </Select>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{ marginLeft: 2, color: '#673ab7', borderColor: '#673ab7' }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </div>
          </Box>
          <TabPanel value="1">
            <Box sx={{ flexGrow: 1, overflowX: 'auto' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {/* //-------------------- */}
                  <Item sx={{ height: '70%' }}>
                    <Typography variant="h4" fontWeight="bold">
                      Basic Property Information
                    </Typography>
                    <hr />
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Property Type:</Typography>
                        <Typography style={{ color: 'black' }}>{propertyData.propertyType ? propertyData.propertyType : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Year Built :</Typography>
                        <Typography style={{ color: 'black' }}>{propertyData.yearBuilt ? propertyData.yearBuilt : 'N/A'}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Listing Price:</Typography>
                        <Typography style={{ color: 'black' }}>{propertyData.listingPrice ? propertyData.listingPrice : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Square Footage:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {propertyData.squareFootage ? propertyData.squareFootage : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Number Of Bedrooms:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {propertyData.numberofBedrooms ? propertyData.numberofBedrooms : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Number Of Bathrooms :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {propertyData.numberofBathrooms ? propertyData.numberofBathrooms : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Previous Owners :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {propertyData.previousOwners ? propertyData.previousOwners : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Property Address :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {propertyData.propertyAddress ? propertyData.propertyAddress : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} md={12} sx={{ marginTop: '10px' }}>
                      <Typography variant="h5">Property Description :</Typography>
                      <Typography style={{ color: 'black' }}>
                        {propertyData.propertyDescription ? propertyData.propertyDescription : 'N/A'}
                      </Typography>
                    </Grid>
                  </Item>
                  {/* //---------------------------------------Contacts Associated with Property------------------------ */}
                  <Grid item xs={12} md={12} sx={{ marginTop: '8px' }}>
                    {/* //-------------------- */}
                    <Item>
                      <Typography variant="h4" fontWeight="bold">
                        Contacts Associated with Property
                      </Typography>
                      <hr />
                      <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                        <Grid item xs={6} md={5}>
                          <Typography variant="h5">Sellers :</Typography>
                          <Typography style={{ color: 'black' }}>{propertyData.sellers ? propertyData.sellers : 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={5}>
                          <Typography variant="h5">Buyers :</Typography>
                          <Typography style={{ color: 'black' }}>{propertyData.buyers ? propertyData.buyers : 'N/A'}</Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                        <Grid item xs={6} md={5}>
                          <Typography variant="h5">Property Managers :</Typography>
                          <Typography style={{ color: 'black' }}>
                            {propertyData.propertyManagers ? propertyData.propertyManagers : 'N/A'}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={5}>
                          <Typography variant="h5">Contractors Or Service Providers :</Typography>
                          <Typography style={{ color: 'black' }}>
                            {propertyData.contractorsOrServiceProviders ? propertyData.contractorsOrServiceProviders : 'N/A'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                  {/* //Contacts Association------------------------ */}
                </Grid>
                {/* //---------------------------------------      Property Features and Amenities------------------------ */}
                <Grid item xs={12} md={6} sx={{ marginTop: '8px' }}>
                  <Item>
                    <Typography variant="h4" fontWeight="bold">
                      Property Features and Amenities
                    </Typography>
                    <hr />
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'start', marginTop: '1px' }}>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h5">Lot Size:</Typography>
                        <Typography style={{ color: 'black' }}>{propertyData.lotSize ? propertyData.lotSize : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Parking Availability :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {' '}
                          {propertyData.parkingAvailability ? propertyData.parkingAvailability : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'start', marginTop: '1px' }}>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h5">Heating And Cooling Systems:</Typography>
                        <Typography style={{ color: 'black', textAlign: 'justify' }}>
                          {propertyData.heatingAndCoolingSystems ? propertyData.heatingAndCoolingSystems : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Flooring Type:</Typography>
                        <Typography style={{ color: 'black' }}>{propertyData.flooringType ? propertyData.flooringType : 'N/A'}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'start', marginTop: '1px' }}>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h5">Exterior Features:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {propertyData.exteriorFeatures ? propertyData.exteriorFeatures : 'N/A'}.
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Community Amenities :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {propertyData.communityAmenities ? propertyData.communityAmenities : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'start', marginTop: '1px' }}>
                      <Grid item xs={12} md={12}>
                        <Typography variant="h5">Appliances Included :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {propertyData.appliancesIncluded ? propertyData.appliancesIncluded : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                {/* property and features end here  */}
                {/* //---------------------------------------Listing and Marketing Details------------------------ */}
                <Grid item xs={12} md={6} sx={{ marginTop: '35px' }}>
                  {/* //-------------------- */}
                  <Item sx={{ height: '100%' }}>
                    <Typography variant="h4" fontWeight="bold">
                      Listing and Marketing Details
                    </Typography>
                    <hr />
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Listing Status :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {' '}
                          {propertyData.listingStatus ? propertyData.listingStatus : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Listing Agent Or Team :</Typography>
                        {propertyData.listingAgentOrTeam ? propertyData.listingAgentOrTeam : 'N/A'}
                        <Typography style={{ color: 'black' }}></Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Listing Date :</Typography>
                        {propertyData.listingDate ? propertyData.listingDate : 'N/A'}
                        <Typography style={{ color: 'black' }}></Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Multiple Listing Service :</Typography>
                        <Typography style={{ color: 'black' }}>
                          {' '}
                          {propertyData.multipleListingService ? propertyData.multipleListingService : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Marketing Description:</Typography>
                        <Typography style={{ color: 'black' }}>
                          {propertyData.marketingDescription ? propertyData.marketingDescription : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                {/* //Listing and Marketing Details------------------------ */}
                {/* //--------------------------  -------------Financial Information------------------------ */}
                <Grid item xs={12} md={6} sx={{ marginTop: '8px' }}>
                  {/* //-------------------- */}
                  <Item>
                    <Typography variant="h4" fontWeight="bold">
                      Financial Information
                    </Typography>
                    <hr />
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Property Taxes :</Typography>
                        {propertyData.propertyTaxes ? propertyData.propertyTaxes : 'N/A'}
                        <Typography style={{ color: 'black' }}></Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Homeowners Association :</Typography>
                        {propertyData.homeownersAssociation ? propertyData.homeownersAssociation : 'N/A'}
                        <Typography style={{ color: 'black' }}></Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Mortgage Information :</Typography>
                        {propertyData.mortgageInformation ? propertyData.mortgageInformation : 'N/A'}
                        <Typography style={{ color: 'black' }}></Typography>
                      </Grid>
                    </Grid>
                  </Item>

                  {/* //--------------------------  -------------Tags or Categories------------------------ */}
                  <Grid item xs={12} md={12} sx={{ marginTop: '8px' }}>
                    {/* //-------------------- */}
                    <Item>
                      <Typography variant="h4" fontWeight="bold">
                        Tags or Categories
                      </Typography>
                      <hr />
                      <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                        <Grid item xs={6} md={12}>
                          <Typography variant="h5">Internal Notes Or Comments :</Typography>
                          <Typography style={{ color: 'black' }}>
                            {propertyData.internalNotesOrComments ? propertyData.internalNotesOrComments : 'N/A'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                </Grid>

                {/* -------------------------------//Interested contact table ---------------- */}
                <Grid item xs={12} md={12} sx={{ marginTop: '8px' }}>
                  <Item>
                    <InterestedContact allInterestedContacts={interestedContacts} />
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* GALLERY SECTION------------------------------------------------------------------------- */}
          <TabPanel value="2">
            <Gallery propertyData={propertyData} />
          </TabPanel>
        </TabContext>
        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
          <Button
            startIcon={<EditIcon />}
            variant="outlined"
            sx={{ marginLeft: 2, color: '#673ab7', borderColor: '#673ab7' }}
            onClick={handleOpenEditlead}
          >
            Edit
          </Button>
          <Button startIcon={<DeleteIcon />} variant="outlined" color="error" onClick={handleOpenDeleteLead}>
            Delete
          </Button>
        </Grid>
      </Box>
    </>
  );
}
