/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import Iconify from '../../ui-component/iconify';
import { getApi, patchApi } from 'views/services/api';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import * as React from 'react';
import { toast } from 'react-toastify';

import { useEffect } from 'react';
import AddEmployee from './AddEmployee';

const Employee = () => {
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [statusChanged, setStatusChanged] = useState(false);

  const [employeeData, setEmployeeData] = useState([]);
  // ----------------------------------------------------------------------

  const handleOpenChangeStatus = async (employeeId) => {
    try {
      const response = await patchApi(`api/user/editemployeestatus/${employeeId}`);
      if (response.status === 200) {
        toast.success('Status Changed Successfully');
        setStatusChanged((prevStatusChanged) => !prevStatusChanged);
      } else {
        setStatusChanged(false);
        toast.error('contact change status');
      }
    } catch (e) {
      setStatusChanged(false);
      console.log(e);
      toast.error('cannot change status');
    }
  };
  // function for fetching all the contacts data from the db

  const fetchEmployeeData = async () => {
    try {
      const response = await getApi('api/user/viewallemployee');
      setEmployeeData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [openAdd, statusChanged]);

  const columns = [
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 1,
      renderCell: (params) => {
        return <Box>{params.value ? params.value : 'N/A'}</Box>;
      }
    },
    {
      field: 'username',
      headerName: 'Email Address',
      flex: 1
    },
    {
      field: 'deleted',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            sx={
              params?.value == false
                ? {
                    backgroundColor: '#01B574',
                    color: 'white',
                    padding: '4px',
                    borderRadius: '5px'
                  }
                : {
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '4px',
                    borderRadius: '5px'
                  }
            }
          >
            {params?.value === false ? 'Active' : 'Inactive'}
          </Box>
        );
      }
    },

    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            startIcon={<ChangeCircleIcon icon="eva:plus-fill" />}
            onClick={() => handleOpenChangeStatus(params.row._id)}
          >
            Change Status
          </Button>
        );
      }
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddEmployee open={openAdd} handleClose={handleCloseAdd} />

      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Employee-Management</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add Employee
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              {employeeData && (
                <>
                  <Typography variant="h4" sx={{ margin: '2px 15px' }}>
                    Employee ( {employeeData?.length} )
                  </Typography>
                  <DataGrid
                    rows={employeeData}
                    columns={columns}
                    checkboxSelection
                    getRowId={(row) => row?._id}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{ toolbar: { showQuickFilter: true } }}
                  />
                </>
              )}
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Employee;
