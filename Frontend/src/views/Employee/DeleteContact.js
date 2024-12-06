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

const DeleteContact = ({ open, handleClose, id }) => {
  const params = useParams();
  const contactId = params.id;
  const navigate = useNavigate();
  //handle delete function-------------
  const handleDelete = async () => {
    try {
      let result = await deleteApi(`api/contact/delete/`, contactId || id);
      if (result) {
        toast.success('Contact Deleted Successfully');
        handleClose();
        setTimeout(() => {
          navigate('/dashboard/contact');
        }, 500);
      } else {
        toast.error('Cannot delete contact');
      }
    } catch (error) {
      console.log(error);
      toast.error('Cannot delete contact');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Contact</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this Contact?</p>
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

export default DeleteContact;
