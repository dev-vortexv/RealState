import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import LeadDashboard from 'views/Lead/Components';
import ContactDashboard from 'views/Contact/Components/ContactDashboard';
import Property from 'views/Property';
import PropertyDashboard from 'views/Property/Components/index';
import AllProperties from 'views/Contact/Components/AllProperties';
import TaskDashboard from 'views/Task/Components/TaskDashboard';
import Meeting from 'views/Metting';
import MeetingDashboard from 'views/Metting/Components/MeetingDashboard';
import CallDashboard from 'views/Call/Components/CallDashboard';
import EmailDashboard from 'views/Email/Components/EmailDashboard';
import Payments from 'views/Payments';
import AdminProfile from 'views/AdminProfile/AdminProfile';
import Grid from '@mui/system/Unstable_Grid/Grid';
import AddEmployee from 'views/AddEmployee/AddEmployee';
import Employee from 'views/Employee';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const LeadManagement = Loadable(lazy(() => import('views/Lead')));
const ContactManagement = Loadable(lazy(() => import('views/Contact')));
const Call = Loadable(lazy(() => import('views/Call')));
const Policy = Loadable(lazy(() => import('views/Policy')));
const Metting = Loadable(lazy(() => import('views/Metting')));
const Email = Loadable(lazy(() => import('views/Email')));
const Task = Loadable(lazy(() => import('views/Task')));
const EmailTemplates = Loadable(lazy(() => import('views/EmailTemplates')));
const Document = Loadable(lazy(() => import('views/Documents')));
const Calender = Loadable(lazy(() => import('views/Calender')));
const AddTemplates = Loadable(lazy(() => import('views/EmailTemplates/AddTemplates')));
const OverviewLeadDetail = Loadable(lazy(() => import('views/Lead/OverView')));
const OverviewContactDetail = Loadable(lazy(() => import('views/Contact/OverView')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'app',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'lead',
          element: <LeadManagement />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'contact',
          element: <ContactManagement />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'property',
          element: <Property />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'task',
          element: <Task />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'meeting',
          element: <Meeting />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'call',
          element: <Call />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'email',
          element: <Email />
        }
      ]
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'calendar',
          element: <Calender />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'payments',
          element: <Payments />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'documents',
          element: <Document />
        }
      ]
    },

    {
      path: 'dashboard',
      children: [
        {
          path: '/dashboard/lead/view/:id',
          element: <LeadDashboard />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '/dashboard/contact/view/:id',
          element: <ContactDashboard />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '/dashboard/property/view/:id',
          element: <PropertyDashboard />
        }
      ]
    },
    {
      path: 'property',
      children: [
        {
          path: '/property/selectableproperty/:id',
          element: <AllProperties />
        }
      ]
    },
    {
      path: 'task',
      children: [
        {
          path: '/task/view/:id',
          element: <TaskDashboard />
        }
      ]
    },
    {
      path: 'meetings',
      children: [
        {
          path: '/meetings/view/:id',
          element: <MeetingDashboard />
        }
      ]
    },
    {
      path: 'calls',
      children: [
        {
          path: '/calls/view/:id',
          element: <CallDashboard />
        }
      ]
    },
    {
      path: 'email',
      children: [
        {
          path: '/email/view/:id',
          element: <EmailDashboard />
        }
      ]
    },
    {
      path: 'profile',
      children: [
        {
          path: '/profile',
          element: <AdminProfile />
        }
      ]
    },
    {
      path: 'employee',
      children: [
        {
          path: '/employee',
          element: <Employee />
        }
      ]
    }
  ]
};

export default MainRoutes;
