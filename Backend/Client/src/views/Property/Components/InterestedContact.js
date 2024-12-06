/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { Container, Typography, Box, Card } from '@mui/material';
import TableStyle from '../../../ui-component/TableStyle';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import * as React from 'react';

// ------------------------------------------------------------

const InterestedContact = ({ allInterestedContacts }) => {
  const navigate = useNavigate();

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/contact/view/${params.row._id}`);
        };

        return <Box onClick={handleFirstNameClick}>{params.value}</Box>;
      }
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
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Email Address',
      flex: 1
    },
    {
      field: 'preferredContactMethod',
      headerName: 'Contact Method',
      flex: 1
    }
  ];
  return (
    <>
      <Container>
        <Typography variant="h4">Interested Contact</Typography>
        <hr />
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '100%', paddingTop: '15px' }}>
              <Typography variant="h4" sx={{ margin: '3px 15px' }}>
                Contacts ( {allInterestedContacts?.length} )
              </Typography>
              <DataGrid
                rows={allInterestedContacts}
                columns={columns}
                // checkboxSelection
                getRowId={(row) => row._id}
                // slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default InterestedContact;
