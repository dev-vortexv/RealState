import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { deleteApi } from 'views/services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

const DeleteMeeting = ({ open, handleClose, id }) => {
  //handle delete function-------------
  const handleDelete = async () => {
    try {
      let result = await deleteApi(`api/meeting/delete/`, id);
      if (result) {
        toast.success('Meeting Deleted Successfully');
        handleClose();
        setTimeout(() => {
          navigate('/dashboard/meeting');
        }, 500);
      } else {
        toast.error('Cannot delete meeting');
      }
    } catch (error) {
      console.log(error);
      toast.error('Cannot delete meeting');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Meeting</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this Meeting?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMeeting;
