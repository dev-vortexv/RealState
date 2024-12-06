import * as React from 'react';
import moment from 'moment';

import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CallIcon from '@mui/icons-material/Call';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import AddIcon from '@mui/icons-material/Add';

import SendMailDialog from './contactActivityDialog/sendMailDialog';
import CallDialog from './contactActivityDialog/CallDialog';
import CreateTaskDialog from './contactActivityDialog/CreateTaskDialog';
import AddMeetingDialog from './contactActivityDialog/AddMeetingDialog';

export default function EmailGrid(props) {
  const [data, setData] = useState(props.data);
  const [showMoreEmails, handleToggleShowMoreEmails] = useState(false);
  const [showMoreCalls, handleToggleShowMoreCalls] = useState(false);
  const [showMoreTasks, handleToggleShowMoreTasks] = useState(false);
  const [showMoreMeetings, handleToggleShowMoreMeetings] = useState(false);

  const emailsToShow = data.EmailHistory;
  const callsToShow = data.phoneCallHistory;
  const taskToShow = data.task;
  const meetingToShow = data.meetingHistory;

  //states for dialog boxes--------------------

  const [openSendMailDialog, setOpenSendMailDialog] = useState(false);
  const [openCallDialog, setOpenCallDialog] = useState(false);
  const [openCreateTaskDialog, setOpenCreateTaskDialog] = useState(false);
  const [openAddMeetingDialog, setOpenAddMeetingDialog] = useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    // textAlign: 'center',
    color: theme.palette.text.secondary
  }));

  // Functions for opening/closing dialog boxes
  const handleOpenSendMailDialog = () => setOpenSendMailDialog(true);
  const handleCloseSendMailDialog = () => setOpenSendMailDialog(false);

  const handleOpenCallDialog = () => setOpenCallDialog(true);
  const handleCloseCallDialog = () => setOpenCallDialog(false);

  const handleOpenCreateTaskDialog = () => setOpenCreateTaskDialog(true);
  const handleCloseCreateTaskDialog = () => setOpenCreateTaskDialog(false);

  const handleOpenAddMeetingDialog = () => setOpenAddMeetingDialog(true);
  const handleCloseAddMeetingDialog = () => setOpenAddMeetingDialog(false);

  // function for handleToggleShowMore
  const handleToggleShowMore = (section) => {
    switch (section) {
      case 'emails':
        handleToggleShowMoreEmails(!showMoreEmails);
        break;
      case 'calls':
        handleToggleShowMoreCalls(!showMoreCalls);
        break;
      case 'tasks':
        handleToggleShowMoreTasks(!showMoreTasks);
        break;
      case 'meetings':
        handleToggleShowMoreMeetings(!showMoreMeetings);
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <CreateTaskDialog open={openCreateTaskDialog} onClose={handleCloseCreateTaskDialog} />
      <CallDialog
        open={openCallDialog}
        onClose={handleCloseCallDialog}
        recipientName={`${props.data.contact.firstName} ${props.data.contact.lastName}`}
      />
      <SendMailDialog open={openSendMailDialog} onClose={handleCloseSendMailDialog} recipientEmail={props.data.contact.email} />
      <AddMeetingDialog open={openAddMeetingDialog} onClose={handleCloseAddMeetingDialog} />

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Typography variant="h3" fontWeight="bold">
          Communication
        </Typography>
        <hr />
      </Box>
      {/* //-----------EMAIL SECTION------------ */}
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h5" fontWeight="bold">
                  Email ({emailsToShow?.length})
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ color: '#673ab7', borderColor: '#673ab7' }}
                  startIcon={<SendIcon />}
                  onClick={handleOpenSendMailDialog}
                >
                  Send Email
                </Button>
              </Box>

              {data.EmailHistory.length ? (
                <>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>SENDER</TableCell>
                            <TableCell>RECIPIENT</TableCell>
                            <TableCell>TIME STAMP</TableCell>
                            <TableCell>CREATED</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {emailsToShow?.slice(0, showMoreEmails ? emailsToShow.length : 1).map((Emails, index) => (
                            <TableRow key={index}>
                              <TableCell>{Emails.senderName}</TableCell>
                              <TableCell>{Emails.createByName}</TableCell>
                              <TableCell>{moment(emailsToShow.timestamp).fromNow()}</TableCell>
                              <TableCell>{moment(emailsToShow.startdate).format('hh:mmA (MM/DD)')}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <Item sx={{ display: 'flex', justifyContent: 'end' }}>
                    {!showMoreEmails && (
                      <Button
                        variant="outlined"
                        onClick={() => handleToggleShowMore('emails')}
                        sx={{ marginTop: 2, color: '#673ab7', borderColor: '#673ab7' }}
                      >
                        Show More
                      </Button>
                    )}
                    {showMoreEmails && (
                      <Button
                        variant="outlined"
                        onClick={() => handleToggleShowMore('emails')}
                        sx={{ marginTop: 2, color: '#673ab7', borderColor: '#673ab7' }}
                      >
                        Show Less
                      </Button>
                    )}
                  </Item>
                </>
              ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', minHeight: '20vh' }}>
                  No Email Found
                </Typography>
              )}
            </Item>
          </Grid>
          {/* //--------------------CALL SECTION------------------------ */}
          <Grid item xs={12} md={6}>
            <Item>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h5" fontWeight="bold">
                  Call ({callsToShow?.length})
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleOpenCallDialog}
                  sx={{ color: '#673ab7', borderColor: '#673ab7' }}
                  startIcon={<CallIcon />}
                >
                  Call
                </Button>
              </Box>

              {data.phoneCallHistory.length ? (
                <>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>SENDER</TableCell>
                            <TableCell>RECIPIENT</TableCell>
                            <TableCell>TIME STAMP</TableCell>
                            <TableCell>CREATED</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {callsToShow?.slice(0, showMoreCalls ? callsToShow.length : 1).map((calls, index) => (
                            <TableRow key={index}>
                              <TableCell>{calls.senderName}</TableCell>
                              <TableCell>{calls.createByName}</TableCell>
                              <TableCell>{moment(calls.timestamp).fromNow()}</TableCell>
                              <TableCell>{moment(calls.startdate).format('hh:mmA (MM/DD)')}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <Item sx={{ display: 'flex', justifyContent: 'end' }}>
                    {!showMoreCalls && (
                      <Button
                        variant="outlined"
                        onClick={() => handleToggleShowMore('calls')}
                        sx={{ marginTop: 2, color: '#673ab7', borderColor: '#673ab7' }}
                      >
                        Show More
                      </Button>
                    )}
                    {showMoreCalls && (
                      <Button
                        variant="outlined"
                        onClick={() => handleToggleShowMore('calls')}
                        sx={{ marginTop: 2, color: '#673ab7', borderColor: '#673ab7' }}
                      >
                        Show Less
                      </Button>
                    )}
                  </Item>
                </>
              ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', minHeight: '20vh' }}>
                  No Calls Found
                </Typography>
              )}
            </Item>
          </Grid>
        </Grid>
        {/* //--------------------TASK SECTION------------------------ */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h5" fontWeight="bold">
                  Task ({taskToShow?.length})
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleOpenCreateTaskDialog}
                  sx={{ color: '#673ab7', borderColor: '#673ab7' }}
                  startIcon={<AddIcon />}
                >
                  Create Task
                </Button>
              </Box>
              {data.task.length ? (
                <>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>TITLE</TableCell>
                            <TableCell>CATEGORY</TableCell>
                            <TableCell>ASSIGNMENT TO</TableCell>
                            <TableCell>START DATE</TableCell>
                            <TableCell>END DATE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {taskToShow?.slice(0, showMoreTasks ? taskToShow.length : 1).map((Tasks, index) => (
                            <TableRow key={index}>
                              <TableCell>{Tasks.title}</TableCell>
                              <TableCell>{Tasks.assignmentToLead ? 'Lead' : 'Contact'}</TableCell>
                              <TableCell>{Tasks.assignmentToName}</TableCell>
                              <TableCell>{moment(Tasks.start).format('hh:mmA (MM/DD)')}</TableCell>
                              <TableCell>{moment(Tasks.end).format('hh:mmA (MM/DD)')}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <Item sx={{ display: 'flex', justifyContent: 'end' }}>
                    {!showMoreTasks && (
                      <Button
                        variant="outlined"
                        onClick={() => handleToggleShowMore('tasks')}
                        sx={{ marginTop: 2, color: '#673ab7', borderColor: '#673ab7' }}
                      >
                        Show More
                      </Button>
                    )}
                    {showMoreTasks && (
                      <Button
                        variant="outlined"
                        onClick={() => handleToggleShowMore('tasks')}
                        sx={{ marginTop: 2, color: '#673ab7', borderColor: '#673ab7' }}
                      >
                        Show Less
                      </Button>
                    )}
                  </Item>
                </>
              ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', minHeight: '20vh' }}>
                  No Tasks Found
                </Typography>
              )}
            </Item>
          </Grid>
          {/* //--------------------MEETING SECTION------------------------ */}
          <Grid item xs={12} md={6}>
            <Item>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h5" fontWeight="bold">
                  Meeting ({meetingToShow?.length})
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleOpenAddMeetingDialog}
                  sx={{ color: '#673ab7', borderColor: '#673ab7' }}
                  startIcon={<VideoChatIcon />}
                >
                  Add Meeting
                </Button>
              </Box>
              {data.meetingHistory.length ? (
                <>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>AGENDA</TableCell>
                            <TableCell>DATE TIME</TableCell>
                            <TableCell>TIMES TAMP</TableCell>
                            <TableCell>CREATE BY</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {meetingToShow?.slice(0, showMoreMeetings ? meetingToShow.length : 1).map((meetings, index) => (
                            <TableRow key={index}>
                              <TableCell>{meetings.agenda}</TableCell>
                              <TableCell>{meetings.dateTime}</TableCell>
                              <TableCell>{moment(meetings.timestamp).format('hh:mmA (MM/DD)')}</TableCell>
                              <TableCell>{meetings.createdByName}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <Item sx={{ display: 'flex', justifyContent: 'end' }}>
                    {!showMoreMeetings && (
                      <Button
                        variant="outlined"
                        onClick={() => handleToggleShowMore('meetings')}
                        sx={{ marginTop: 2, color: '#673ab7', borderColor: '#673ab7' }}
                      >
                        Show More
                      </Button>
                    )}
                    {showMoreMeetings && (
                      <Button
                        variant="outlined"
                        onClick={() => handleToggleShowMore('meetings')}
                        sx={{ marginTop: 2, color: '#673ab7', borderColor: '#673ab7' }}
                      >
                        Show Less
                      </Button>
                    )}
                  </Item>
                </>
              ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', minHeight: '20vh' }}>
                  No Meetings Found
                </Typography>
              )}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
