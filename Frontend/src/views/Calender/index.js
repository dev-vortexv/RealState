/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import { useState } from 'react';
// @mui
import { Stack, Container, Typography, Box } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ActionCalenderDropDown from './ActionCalenderDropDown';
// import AddTask from 'views/Task/AddTask';
// import AddCalls from 'views/Calls/Addcalls';
import { getApi } from 'views/services/api';
import AddMeetings from 'views/Metting/Addmeetings';
import AddCall from 'views/Call/AddCall';
import AddTask from 'views/Task/AddTask';
import { loginSchema } from 'schema';
import { useEffect } from 'react';
// ----------------------------------------------------------------------
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
const Calender = () => {
  const userid = localStorage.getItem('_id');
  const userRole = localStorage.getItem('role');
  const [openTask, setOpenTask] = useState(false);
  const [openMeeting, setOpenMeeting] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [data, setData] = useState([]);

  // open task model
  const handleOpenTask = () => setOpenTask(true);
  const handleCloseTask = () => setOpenTask(false);

  // open meeting model
  const handleOpenMeeting = () => setOpenMeeting(true);
  const handleCloseMeeting = () => setOpenMeeting(false);

  // open call model
  const handleOpenCall = () => setOpenCall(true);
  const handleCloseCall = () => setOpenCall(false);

  //----------------------------------------------

  const getAllTaskData = async () => {
    const resultTask = await getApi(userRole === 'admin' ? `api/task/viewalltasks` : `api/task/viewalltasks`);
    return resultTask.data.taskData.map((item) => ({
      title: item.title,
      start: item.start,
      end: item.end
    }));
  };
  const getAllMeetingData = async () => {
    try {
      const resultMeeting = await getApi('api/meeting/viewallmeetings');
      return resultMeeting.data.map((item) => ({
        title: item.agenda,
        start: item.dateTime
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCallData = async () => {
    const resultCall = await getApi(userRole === 'admin' ? `api/phoneCall/viewallcalls` : `api/phoneCall/viewallcalls`);
    console.log(resultCall.data, 'call data');

    return resultCall.data.map((item) => ({
      title: item.callNotes,
      start: item.startDate,
      end: item.endDate
    }));
  };

  const getAllCalenderData = async () => {
    try {
      const [taskApiData, meetingApiData, callApiData] = await Promise.all([getAllTaskData(), getAllMeetingData(), getAllCallData()]);
      const combinedData = [...taskApiData, ...meetingApiData, ...callApiData];
      setData(combinedData);
    } catch (error) {
      console.error('Error fetching calendar data', error);
    }
  };

  useEffect(() => {
    getAllCalenderData();
  }, []);
  return (
    <>
      {/* Add Task Model */}
      <AddTask open={openTask} handleClose={handleCloseTask} lead="lead" contact="contact" />

      {/* Add Meeting Model */}
      <AddMeetings open={openMeeting} handleClose={handleCloseMeeting} />

      {/* Add Call Model */}
      <AddCall open={openCall} handleClose={handleCloseCall} />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Calendar</Typography>
          <ActionCalenderDropDown handleOpenTask={handleOpenTask} handleOpenMeeting={handleOpenMeeting} handleOpenCall={handleOpenCall} />
        </Stack>
        <Box sx={{ background: 'white' }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            minHeight="400px"
            height="600px"
            // weekends={false}
            events={data}
            eventContent={renderEventContent}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            views={{
              listWeek: { buttonText: 'List' },
              multiMonthFourMonth: {
                type: 'multiMonth',
                buttonText: 'multiMonth',
                duration: { months: 4 }
              }
            }}
            buttonText={{
              today: 'Today',
              dayGridMonth: 'Month',
              timeGridWeek: 'Week',
              timeGridDay: 'Day'
            }}
            eventClassNames="custom-fullcalendar"
          />
        </Box>
      </Container>
    </>
  );
};

export default Calender;
