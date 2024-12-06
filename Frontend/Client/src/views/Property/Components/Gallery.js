import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import SelectPropertyImagesDialog from './GalleryDialogs/AddPropertyPhotoDialog';
import SelectPropertyVideoDialog from './GalleryDialogs/AddPropertyVideoDialog';
import SelectPropertyFloorDialog from './GalleryDialogs/AddPropertyFloorDialog';
import SelectPropertyDocumentsDialog from './GalleryDialogs/AddPropertyDocumentsDialog';

export default function Gallery({ propertyData }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    // textAlign: 'center',
    color: theme.palette.text.secondary
  }));

  const [openAddPhotosDialog, setOpenAddPhotosDialog] = useState(false);
  const [openAddVideosDialog, setOpenAddVideosDialog] = useState(false);
  const [openAddFloorDialog, setOpenAddFloorDialog] = useState(false);
  const [openAddDocumentsDialog, setOpenAddDocumentsDialog] = useState(false);

  const handleOpenAddPhotos = () => setOpenAddPhotosDialog((prev) => !prev);

  const handleCloseAddPhotos = () => setOpenAddPhotosDialog(false);
  const handleOpenAddVideos = () => setOpenAddVideosDialog(true);
  const handleCloseAddVideos = () => setOpenAddVideosDialog(false);
  const handleOpenAddFloor = () => setOpenAddFloorDialog(true);
  const handleCloseAddFloor = () => setOpenAddFloorDialog(false);
  const handleOpenAddDocuments = () => setOpenAddDocumentsDialog(true);
  const handleCloseAddDocuments = () => setOpenAddDocumentsDialog(false);

  console.log(propertyData?.virtualToursOrVideos, 'property videos');

  return (
    <Box>
      <SelectPropertyImagesDialog open={openAddPhotosDialog} onClose={handleCloseAddPhotos} />
      <SelectPropertyVideoDialog open={openAddVideosDialog} onClose={handleCloseAddVideos} />
      <SelectPropertyFloorDialog open={openAddFloorDialog} onClose={handleCloseAddFloor} />
      <SelectPropertyDocumentsDialog open={openAddDocumentsDialog} onClose={handleCloseAddDocuments} />
      <Box>
        <Grid container sx={{ marginTop: '4px' }} spacing={2}>
          <Grid item xs={6} md={6}>
            <Item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="h5">Property Photos</Typography>

              <Button
                variant="outlined"
                onClick={handleOpenAddPhotos}
                sx={{ color: '#673ab7', borderColor: '#673ab7' }}
                startIcon={<AddIcon />}
              >
                Add Property Photos
              </Button>

              <Grid container sx={{ marginTop: '4px' }} spacing={2}>
                <Grid item xs={6} md={12} sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', marginTop: '7px' }}>
                  {propertyData?.propertyPhotos?.map((photo, index) => (
                    <img src={photo.img} alt="" srcSet="" width={'100px'} height={'100px'} key={index} style={{ borderRadius: '12px' }} />
                  ))}
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="h5">Virtual Tours or Videos</Typography>
              <Button
                variant="outlined"
                onClick={handleOpenAddVideos}
                sx={{ color: '#673ab7', borderColor: '#673ab7' }}
                startIcon={<AddIcon />}
              >
                Add Virtual Tours or Videos
              </Button>
              <Grid container sx={{ marginTop: '4px' }} spacing={2}>
                <Grid item xs={6} md={12} sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', marginTop: '7px' }}>
                  {propertyData?.virtualToursOrVideos?.map((video, index) => (
                    <a key={index} href={video.img} target="_blank" rel="noopener noreferrer">
                      <video width={'150px'} height={'100px'} style={{ borderRadius: '12px' }} controls>
                        <source src={video.img} type="video/mp4" />
                        <track src={video.img} kind="captions" srcLang="en" label="english_captions" />
                      </video>
                    </a>
                  ))}
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="h5">Floor Plans</Typography>
              <Button
                variant="outlined"
                onClick={handleOpenAddFloor}
                sx={{ color: '#673ab7', borderColor: '#673ab7' }}
                startIcon={<AddIcon />}
              >
                Add Floor Plans
              </Button>
              <Grid container sx={{ marginTop: '4px' }} spacing={2}>
                <Grid item xs={6} md={12} sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', marginTop: '7px' }}>
                  {propertyData?.floorPlans?.map((photo, index) => (
                    <img src={photo.img} alt="" srcSet="" width={'100px'} height={'100px'} key={index} style={{ borderRadius: '12px' }} />
                  ))}
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="h5">Property Documents</Typography>
              <Button
                variant="outlined"
                onClick={handleOpenAddDocuments}
                sx={{ color: '#673ab7', borderColor: '#673ab7' }}
                startIcon={<AddIcon />}
              >
                Add Property Documents
              </Button>
              <Grid container sx={{ marginTop: '4px' }} spacing={2}>
                <Grid
                  item
                  xs={6}
                  md={12}
                  sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2, flexWrap: 'wrap', marginTop: '7px' }}
                >
                  {propertyData?.propertyDocuments?.map((photo, index) => (
                    <a key={index} href={photo.img} rel="noopener noreferrer" target="_blank">
                      {photo.filename}
                    </a>
                  ))}
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
