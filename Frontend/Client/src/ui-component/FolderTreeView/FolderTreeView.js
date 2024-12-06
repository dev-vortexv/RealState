import React, { useState } from 'react';
import { deleteApi, getApi } from 'views/services/api';
import { toast } from 'react-toastify';
import { Link as LinkIcon, Delete as DeleteIcon } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { constant } from 'views/constant';
import { useNavigate } from 'react-router';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

import {
  Collapse,
  IconButton,
  List,
  ListItem,
  Typography,
  Menu,
  MenuItem,
  TextField // Add TextField import
} from '@mui/material';
import {
  InsertDriveFile as FileIcon,
  Folder as FolderIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ChevronDownIcon,
  GetApp as DownloadIcon,
  MoreVert as CiMenuKebab
} from '@mui/icons-material';
import LinkDialogbox from './LinkDialogBox';

const FolderTreeView = ({ item, name, isFolder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [folderNameInput, setFolderNameInput] = useState('');
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedMenuIndex, setOpenedMenuIndex] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [fileId, setFileId] = useState(null);

  const handleItemClick = (event, index) => {
    setOpenedMenuIndex(index === openedMenuIndex ? null : index);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpenedMenuIndex(null);
    setAnchorEl(null);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //function for downloading file from the db based on the specific file id ---------------

  const handleDownload = async (file) => {
    if (file) {
      console.log(file._id, 'file id ');

      let result = await getApi(`api/document/download/`, file._id);
      if (result && result.status === 200) {
        window.open(`${constant.baseUrl}api/document/download/${file._id}`);
        toast.success('file Download successful');
      } else if (result && result.response.status === 404) {
        toast.error('file Not Found');
      }
    }
  };
  //function for deleting file from the db based on the specific file id ---------------

  const handleDelete = async (file) => {
    // if (file) {
    console.log(file._id, 'file id ');

    let result = await deleteApi(`api/document/delete/`, file._id);
    if (result && result.status === 200) {
      toast.success('file Deleted successful');
      setTimeout(() => {
        navigate(0);
      }, 700);
    } else if (result && result.response.status === 404) {
      toast.error('file Not Found');
    }
  };
  //function for opening handle link dialog box  ---------------

  const handleLinkOpen = async (file) => {
    setFileId(file._id);
    setIsLinkOpen(true);
  };
  const handleLinkClose = async (file) => {
    setIsLinkOpen(false);
  };

  const handleCreateFolder = () => {
    // Check if the folder name already exists in data
    const folderExists = item.some((folder) => folder.folderName === folderNameInput);

    if (!folderExists) {
      console.log({ folderName: folderNameInput, files: [] });
    } else {
      console.log('Folder with the same name already exists');
    }
  };

  return (
    <List sx={{ width: '100%' }}>
      <LinkDialogbox open={isLinkOpen} handleClose={handleLinkClose} fileId={fileId} />
      <ListItem alignItems="center" display="flex" sx={{ '&:hover': { cursor: 'pointer', textDecoration: 'none' } }}>
        <Typography
          alignItems="center"
          justifyContent="space-between"
          display="flex"
          width="100%"
          onClick={isFolder ? handleToggle : undefined}
        >
          <Typography width="70%" display="flex" alignItems="center">
            <FolderIcon sx={{ mr: 1 }} />
            {isFolder && (isOpen ? <ChevronDownIcon aria-label="Expand" /> : <ChevronRightIcon aria-label="Collapse" />)}
            {item.folderName}
          </Typography>

          <Typography sx={{ width: '100%' }} textAlign="right">
            <Menu>
              <IconButton size="small" color="inherit">
                <CiMenuKebab />
              </IconButton>
              <Menu
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                getContentAnchorEl={null}
              >
                <MenuItem>
                  <TextField
                    label="New Folder"
                    variant="outlined"
                    size="small"
                    value={folderNameInput}
                    onChange={(e) => setFolderNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                  />
                </MenuItem>
              </Menu>
            </Menu>
          </Typography>
        </Typography>
      </ListItem>

      {/* Display Files beneath the Folder */}
      {isOpen && (
        <List sx={{ width: '100%' }}>
          {item?.files?.map((file, index) => (
            <div key={index}>
              <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                  <FileIcon sx={{ mr: 1 }} />
                  {file.fileName}
                </Typography>

                <Button onClick={(event) => handleItemClick(event, index)}>
                  <MoreVertIcon />
                </Button>
              </ListItem>

              <Popover
                id={id}
                open={open && openedMenuIndex === index}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
              >
                <div style={{ padding: '20px' }}>
                  <MenuItem onClick={() => handleDownload(file)}>
                    <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
                    Download
                  </MenuItem>
                  <MenuItem onClick={() => handleLinkOpen(file)}>
                    <LinkIcon fontSize="small" sx={{ mr: 1 }} />
                    Link
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(file)}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    Delete
                  </MenuItem>
                </div>
              </Popover>
            </div>
          ))}
        </List>
      )}
    </List>
  );
};

export default FolderTreeView;
