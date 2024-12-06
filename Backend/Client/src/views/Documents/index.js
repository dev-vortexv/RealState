import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography, List, ListItem, Box, Divider, CircularProgress, Card, CardContent } from '@mui/material';
import FolderTreeView from '../../ui-component/FolderTreeView/FolderTreeView';
import { useFormik } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { getApi, postApi } from 'views/services/api';
import { documentSchema } from 'schema';

const Index = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoding, setIsLoding] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  // function for fetching file or folder data from the db---------------------
  const fetchData = async () => {
    setIsLoding(true);
    let result = await getApi(user.role === 'admin' ? 'api/document' : `api/document?createBy=${user._id}`);
    setData(result?.data);
    setIsLoding(false);
  };

  // function for adding file or document-----------------------
  const AddData = async (formValues) => {
    try {
      setIsLoding(true);

      const formData = new FormData();
      formData?.append('folderName', formValues.folderName);
      formData?.append('createBy', JSON.parse(localStorage.getItem('user'))._id);
      formData?.append('filename', formValues.filename);

      console.log(localStorage.getItem('user')._id, 'formdata');

      const filesArray = Array.from(formValues.files);

      // Append files to the formData
      filesArray.forEach((file) => {
        formData?.append('files', file);
      });

      let response = await postApi('api/document/add', formData);
      console.log(response, 'response');
      if (response && response.status === 200) {
        fetchData();
        resetForm();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoding(false);
    }
  };

  const { handleBlur, handleChange, handleSubmit, resetForm, setFieldValue, values, errors, touched } = useFormik({
    initialValues: {
      folderName: '',
      files: [],
      filename: ''
    },
    validationSchema: documentSchema,
    onSubmit: (formValues) => {
      AddData(formValues);
      resetForm();
    }
  });

  useEffect(() => {
    fetchData();
  }, [handleSubmit]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              File Explorer
            </Typography>
            {/* <HSeparator /> */}
            {isLoding ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                <CircularProgress />
              </Box>
            ) : data?.length === 0 ? (
              <Typography align="center" variant="subtitle1" fontWeight="bold">
                -- No Document Found --
              </Typography>
            ) : (
              data?.map((item, index) => <FolderTreeView key={index} name={item.folderName} isFolder={true} item={item}></FolderTreeView>)
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* text fields for uploading the folder with the folder name and file name  */}
      <Grid item xs={12} md={5}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                onFocus={() => setIsOpen(true)}
                fullWidth
                label="Folder Name"
                variant="outlined"
                size="small"
                margin="normal"
                value={values.folderName}
                name="folderName"
                placeholder="Enter Folder Name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(errors.folderName && touched.folderName)}
                helperText={errors.folderName && touched.folderName && errors.folderName}
              />
              {isOpen &&
                values?.folderName &&
                data?.filter((option) => option?.folderName?.toLowerCase()?.includes(values?.folderName.toLowerCase())).length > 0 && (
                  <List position="relative" border="1px solid" bg="gray.100" width="100%" borderRadius="0px 0px 20px 20px" lineHeight={1}>
                    {data
                      ?.filter((option) => option?.folderName?.toLowerCase()?.includes(values?.folderName.toLowerCase()))
                      .map((option, index) => (
                        <ListItem
                          key={index}
                          p={3}
                          borderBottom="2px solid #efefef"
                          sx={{ '&:last-child': { borderBottom: 'none' } }}
                          // key={option?._id}
                          cursor="pointer"
                          onClick={() => {
                            setFieldValue('folderName', option?.folderName);
                          }}
                        >
                          {option?.folderName}
                        </ListItem>
                      ))}
                  </List>
                )}
              {/* Input for Uploading Files */}
              <TextField
                fullWidth
                label=""
                variant="outlined"
                size="small"
                margin="normal"
                name="files"
                placeholder="Select a file or folder"
                onChange={(event) => setFieldValue('files', event.currentTarget.files)}
                type="file"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachFileIcon />
                    </InputAdornment>
                  )
                }}
                inputProps={{
                  accept: '.pdf, .doc, .docx',
                  multiple: true
                }}
              />

              <TextField
                fullWidth
                label="File Name"
                variant="outlined"
                size="small"
                margin="normal"
                value={values.filename}
                name="filename"
                placeholder="Enter File Name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(errors.filename && touched.filename)}
                helperText={errors.filename && touched.filename && errors.filename}
              />
              <Button type="submit" disabled={isLoding} variant="contained" color="primary">
                {isLoding ? <CircularProgress size={24} /> : 'Publish now'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Index;
