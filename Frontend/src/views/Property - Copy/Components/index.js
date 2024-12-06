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
// import EditLead from '../EditLead';
// import EmailGrid from './LeadActivity';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
// import AddLead from '../AddProperty';
// import DeleteLead from '../DeleteLead';
import { useNavigate } from 'react-router';
import InterestedContact from './InterestedContact';
import AddProperty from '../AddProperty';
import DeleteProperty from '../DeleteProperty';
import EditProperty from '../EditProperty';

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

  return (
    <>
      <DeleteProperty open={deleteDialogOpen} handleClose={handleCloseDeleteLead} />
      <AddProperty open={openAdd} handleClose={handleCloseAdd} />
      <EditProperty open={openEdit} handleClose={handleCloseEditlead} />

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
                        <Typography style={{ color: 'black' }}>Thiel, Waelchi and Mayer</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Year Built :</Typography>
                        <Typography style={{ color: 'black' }}>1919</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Listing Price:</Typography>
                        <Typography style={{ color: 'black' }}>Zloty</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Square Footage:</Typography>
                        <Typography style={{ color: 'black' }}>2500</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Number Of Bedrooms:</Typography>
                        <Typography style={{ color: 'black' }}>N/A</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Number Of Bathrooms :</Typography>
                        <Typography style={{ color: 'black' }}>9</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Previous Owners :</Typography>
                        <Typography style={{ color: 'black' }}>3</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Property Address :</Typography>
                        <Typography style={{ color: 'black' }}>2535 Service Place</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} md={12} sx={{ marginTop: '10px' }}>
                      <Typography variant="h5">Property Description :</Typography>
                      <Typography style={{ color: 'black' }}>
                        Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat
                        varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi
                      </Typography>
                    </Grid>
                  </Item>
                  {/* //---------------------------------------Contacts Associated with Property------------------------ */}
                  <Grid item xs={12} md={12} sx={{ marginTop: '8px' }}>
                    {/* //-------------------- */}
                    <Item sx={{ height: '100%' }}>
                      <Typography variant="h4" fontWeight="bold">
                        Contacts Associated with Property
                      </Typography>
                      <hr />
                      <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                        <Grid item xs={6} md={5}>
                          <Typography variant="h5">Sellers :</Typography>
                          <Typography style={{ color: 'black' }}>Dylan Lawleff</Typography>
                        </Grid>
                        <Grid item xs={6} md={5}>
                          <Typography variant="h5">Buyers :</Typography>
                          <Typography style={{ color: 'black' }}>Abdul Reside</Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                        <Grid item xs={6} md={5}>
                          <Typography variant="h5">Property Managers :</Typography>
                          <Typography style={{ color: 'black' }}>Casandra Sturr</Typography>
                        </Grid>
                        <Grid item xs={6} md={5}>
                          <Typography variant="h5">Contractors Or Service Providers :</Typography>
                          <Typography style={{ color: 'black' }}>Green, Considine and Abshire</Typography>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                  {/* //Contacts Association------------------------ */}
                </Grid>
                {/* //---------------------------------------      Property Features and Amenities------------------------ */}
                <Grid item xs={12} md={6}>
                  <Item>
                    <Typography variant="h4" fontWeight="bold">
                      Property Features and Amenities
                    </Typography>
                    <hr />
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'start', marginTop: '1px' }}>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h5">Lot Size:</Typography>
                        <Typography style={{ color: 'black' }}>8.74</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Parking Availability :</Typography>
                        <Typography style={{ color: 'black' }}> No</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'start', marginTop: '1px' }}>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h5">Heating And Cooling Systems:</Typography>
                        <Typography style={{ color: 'black', textAlign: 'justify' }}>
                          Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem
                          mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus
                          semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in
                          lectus. Pellentesque at nulla.
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Flooring Type:</Typography>
                        <Typography style={{ color: 'black' }}>
                          Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.
                          Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer
                          pede justo, lacinia eget, tincidunt eget, tempus vel, pede.
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'start', marginTop: '1px' }}>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h5">Exterior Features:</Typography>
                        <Typography style={{ color: 'black' }}>In blandit ultrices enim.</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Community Amenities :</Typography>
                        <Typography style={{ color: 'black' }}>
                          Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget
                          nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio
                          odio, elementum eu, interdum eu, tincidunt in, leo.
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'start', marginTop: '1px' }}>
                      <Grid item xs={12} md={12}>
                        <Typography variant="h5">Appliances Included :</Typography>
                        <Typography style={{ color: 'black' }}>
                          Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar,
                          nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla
                          suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.
                          Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                {/* property and features end here  */}
                {/* //---------------------------------------Listing and Marketing Details------------------------ */}
                <Grid item xs={12} md={6} sx={{ marginTop: '8px' }}>
                  {/* //-------------------- */}
                  <Item sx={{ height: '100%' }}>
                    <Typography variant="h4" fontWeight="bold">
                      Listing and Marketing Details
                    </Typography>
                    <hr />
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Listing Status :</Typography>
                        <Typography style={{ color: 'black' }}>pending</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Listing Agent Or Team :</Typography>
                        <Typography style={{ color: 'black' }}>Jane Doe Realty</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Listing Date :</Typography>
                        <Typography style={{ color: 'black' }}>09/08/2023</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Multiple Listing Service :</Typography>
                        <Typography style={{ color: 'black' }}>MLS789012</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Marketing Description:</Typography>
                        <Typography style={{ color: 'black' }}>
                          Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras
                          pellentesque volutpat dui.
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
                        <Typography style={{ color: 'black' }}>Yuan Renminbi</Typography>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Typography variant="h5">Homeowners Association :</Typography>
                        <Typography style={{ color: 'black' }}>N/A</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                      <Grid item xs={6} md={12}>
                        <Typography variant="h5">Mortgage Information :</Typography>
                        <Typography style={{ color: 'black' }}>N/A</Typography>
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
                            Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.
                            Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus
                            vestibulum.
                          </Typography>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                </Grid>

                {/* -------------------------------//Interested contact table ---------------- */}
                <Grid item xs={12} md={12} sx={{ marginTop: '8px' }}>
                  <Item>
                    <InterestedContact />
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* //ACTIVITY SECTION ------------------------------------------------------------------ */}
          <TabPanel value="2">{/* <EmailGrid /> */}</TabPanel>
          {/* DOCUMENTS SECTION------------------------------------------------------------------------- */}
          <TabPanel value="3">Document</TabPanel>
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
