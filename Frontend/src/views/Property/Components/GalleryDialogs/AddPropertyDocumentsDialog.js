import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DialogContent, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { postApi } from 'views/services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const SelectPropertyImagesDialog = ({ open, onClose }) => {
  const navigate = useNavigate();
  const params = useParams();
  const propertyId = params.id;
  const [selectedFiles, setSelectedFiles] = useState(new FormData());

  const handleFileChange = (event) => {
    const files = event.target.files;

    // Use the callback form to get the latest state
    setSelectedFiles((prevFormData) => {
      const newFormData = new FormData();

      // Append entries from the previous FormData
      for (const [key, value] of prevFormData.entries()) {
        newFormData.append(key, value);
      }

      Array.from(files).forEach((file, index) => {
        newFormData.append(`file${index}`, file);
      });

      return newFormData;
    });
  };

  const handleAddImages = async () => {
    try {
      // Check if FormData is empty
      if (!selectedFiles.has('file0')) {
        toast.error('Please select at least one file.');
        return;
      }

      let response = await postApi(`api/property/add-property-documents/${propertyId}`, selectedFiles);
      if (response.status === 200) {
        toast.success('Property Document Added successfully');
        setTimeout(() => {
          navigate(0);
        }, 1000);
        setSelectedFiles(new FormData()); // Reset FormData after successful upload
      } else {
        toast.error('Cannot add Property Document');
      }
    } catch (e) {
      console.error(e);
      toast.error('Cannot add Property Document');
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Select Property Documents</DialogTitle>
      {/* Upload Files Icon */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {/* The form with enctype="multipart/form-data" */}
        <form action="/upload" encType="multipart/form-data">
          <input type="file" id="fileInput" name="property" multiple onChange={handleFileChange} style={{ display: 'none' }} />
          <label htmlFor="fileInput">
            <IconButton color="primary" component="span">
              <CloudUploadIcon fontSize="large" />
            </IconButton>
          </label>
        </form>
      </div>
      {/* Dialog Content */}
      <DialogContent>
        {selectedFiles && (
          <div>
            <Typography variant="h6">Selected Files:</Typography>
            <ul>
              {[...selectedFiles.entries()].map(([key, value], index) => (
                <li key={`${key}_${index}`}>{value.name}</li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <Button startIcon={<AddIcon />} onClick={handleAddImages} color="primary" variant="contained">
          Add Documents
        </Button>
        <Button onClick={onClose} color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectPropertyImagesDialog;
