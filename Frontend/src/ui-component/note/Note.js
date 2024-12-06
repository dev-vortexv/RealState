/* eslint-disable react/prop-types */
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import NotesIcon from '@mui/icons-material/Notes';
import Addnotes from './AddNotes';
import ViewNote from './ViewEdit';
import TableStyleTwo from '../../ui-component/TableStyleTwo';

const Notes = ({ toggleVisibilityNotes, isVisibleNotes }) => {
  const [openNoteView, setOpenNoteView] = useState(false);
  //   const [noteId, setNoteId] = useState('');
  // const handleOpenNoteView = () => setOpenNoteView(true);
  const handleCloseNoteView = () => setOpenNoteView(false);
  const rows = [];

  const columns = [
    {
      field: 'subject',
      headerName: 'Subject',
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      flex: 1
      //   renderCell: (params) => {
      //     const handleFirstNameClick = () => {
      //       handleOpenNoteView();
      //       setNoteId(params?.row?._id);
      //     };

      //     return <Box onClick={handleFirstNameClick}>{params.value}</Box>;
      //   }
    },
    {
      field: 'createdOn',
      headerName: 'Date Created',
      flex: 1
      //   valueFormatter: (params) => {
      //     const date = new Date(params.value);
      //     return date.toLocaleString();
      //   }
    },
    {
      field: 'modifiedOn',
      headerName: 'Date Modified',
      flex: 1
      //   valueFormatter: (params) => {
      //     const date = new Date(params.value);
      //     return date.toLocaleString();
      //   }
    }
  ];

  // open note model
  const [openNote, setOpenNote] = useState(false);
  const handleOpenNote = () => {
    setOpenNote(true);
  };
  const handleCloseNote = () => setOpenNote(false);

  return (
    <div>
      {/* VIew model */}
      <ViewNote open={openNoteView} handleClose={handleCloseNoteView} />

      {/* Add Notes */}
      <Addnotes open={openNote} handleClose={handleCloseNote} />

      <Box p={2} style={{ cursor: 'pointer' }}>
        <Grid container display="flex" alignItems="center">
          <Stack direction="row" alignItems="center" justifyContent={'space-between'} width={'100%'}>
            <Stack direction="row" spacing={1} alignItems={'center'}>
              <Button
                onClick={toggleVisibilityNotes}
                color="primary"
                variant="contained"
                sx={{ width: '28px', minWidth: '0px', padding: '0px', height: '25px' }}
              >
                {isVisibleNotes ? <RemoveIcon /> : <AddIcon />}
              </Button>
              <NotesIcon />
              <Typography variant="h5">Notes</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
              {isVisibleNotes && (
                <Button variant="contained" color="secondary" size="small" startIcon={<AddIcon />} onClick={handleOpenNote}>
                  Create Note
                </Button>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Box>
      {isVisibleNotes && (
        <TableStyleTwo>
          <Box width="100%" height="30vh">
            <DataGrid rows={rows} columns={columns} getRowId={(row) => row._id} columnHeaderHeight={40} />
          </Box>
        </TableStyleTwo>
      )}
    </div>
  );
};

export default Notes;
