import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import TableStyle from '../../../ui-component/TableStyle';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import * as React from 'react';

import { IconNotebook } from '@tabler/icons';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const InterestedProperty = ({ data }) => {
  const navigate = useNavigate();
  const params = useParams();
  const contactId = params.id;
  let count = 0;
  const columns = [
    {
      field: 'id',
      headerName: '#',
      flex: 1,
      renderCell: (params) => {
        return <Box> {(count += 1)}</Box>;
      }
    },
    {
      field: 'propertyType',
      headerName: 'Property Type',
      flex: 1
    },
    {
      field: 'propertyAddress',
      headerName: 'Property Address',
      flex: 1
    },
    {
      field: 'squareFootage',
      headerName: 'Square Footage',
      flex: 1
    },
    {
      field: 'listingPrice',
      headerName: 'Listing Price',
      flex: 1
    },
    {
      field: 'yearBuilt',
      headerName: 'Year Built',
      flex: 1
    }
  ];

  const handleShowAllSelectableProperties = () => {
    navigate(`/property/selectableproperty/${contactId}`);
  };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Interested Properties ( {data?.length} )</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<IconNotebook />} onClick={handleShowAllSelectableProperties}>
              Select Inserted Property
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '100%', paddingTop: '15px' }}>
              <DataGrid
                rows={data}
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

export default InterestedProperty;
