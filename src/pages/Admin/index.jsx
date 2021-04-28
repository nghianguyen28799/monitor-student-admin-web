import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import MailIcon from '@material-ui/icons/Mail';
// import MenuIcon from '@material-ui/icons/Menu';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'; 
import FaceIcon from '@material-ui/icons/Face';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PieChartIcon from '@material-ui/icons/PieChart';
import AssessmentIcon from '@material-ui/icons/Assessment';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link,
    // Redirect
    // useHistory
  } from "react-router-dom";

import HomeScreen from '../../components/Home'
import NotFoundScreen from '../../components/NotFound'
import UserScreen from '../../components/UserTable'
import ClassScreen from '../../components/ClassTable'
import TeacherScreen from '../../components/TeacherTable'
import StudentScreen from '../../components/StudentTable'
import ScheduleScreen from '../../components/ScheduleTable'
import StationScreen from '../../components/StationTable'
import BusScreen from '../../components/BusTable'
import AbsenceScreen from '../../components/AbsenceTable'
import NoAttendanceScreen from '../../components/NoAttendanceTable'
import StatisticScreen from '../../components/Statistics'
import ChartScreen from '../../components/Chart'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Home(props) {
  // const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigation = (url) => {
    window.location.href = `/home/${url}`
  }
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key='Teachers' onClick={() => navigation("teachers")}>
          <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
          <ListItemText primary='Giáo viên'/>
        </ListItem>

        <ListItem button key='User' onClick={() => navigation("users")}>
          <ListItemIcon><AccountCircleIcon /></ListItemIcon>
          <ListItemText primary='Phụ huynh'/>
        </ListItem>

        <ListItem button key='Student' onClick={() => navigation("students")}>
          <ListItemIcon><FaceIcon /></ListItemIcon>
          <ListItemText primary='Học sinh'/>
        </ListItem>

      </List>
      <Divider />
      <List>
        <ListItem button key='Classes' onClick={() => navigation("classes")}>
          <ListItemIcon><MeetingRoomIcon /></ListItemIcon>
          <ListItemText primary='Lớp học'/>
        </ListItem>

        <ListItem button key='Student' onClick={() => navigation("schedules")}>
          <ListItemIcon><DateRangeIcon /></ListItemIcon>
          <ListItemText primary='Thời khóa biểu'/>
        </ListItem>
      
        <ListItem button key='destination' onClick={() => navigation("station")}>
          <ListItemIcon><LocalConvenienceStoreIcon /></ListItemIcon>
          <ListItemText primary='Điểm đến'/>
        </ListItem>

        <ListItem button key='Student' onClick={() => navigation("bus")}>
          <ListItemIcon><DirectionsBusIcon /></ListItemIcon>
          <ListItemText primary='Xe trường'/>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key='Student' onClick={() => navigation("absence")}>
          <ListItemIcon><EventAvailableIcon /></ListItemIcon>
          <ListItemText primary='Vắng có phép'/>
        </ListItem>
        <ListItem button key='Student' onClick={() => navigation("noattendance")}>
          <ListItemIcon><EventBusyIcon /></ListItemIcon>
          <ListItemText primary='Vắng không phép'/>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key='Student' onClick={() => navigation("statistics")}>
          <ListItemIcon><AssessmentIcon /></ListItemIcon>
          <ListItemText primary='Thống kê'/>
        </ListItem>
        <ListItem button key='Student' onClick={() => navigation("chart")}>
          <ListItemIcon><PieChartIcon /></ListItemIcon>
          <ListItemText primary='Biểu đồ'/>
        </ListItem>
      </List>

    </div>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <main></main>
        <Router>
            <Switch>
                <Route exact path="/home" component={HomeScreen} />
                <Route path="/home/users" component={UserScreen} />
                <Route path="/home/classes" component={ClassScreen} />
                <Route path="/home/teachers" component={TeacherScreen} />
                <Route path="/home/students" component={StudentScreen} />
                <Route path="/home/schedules" component={ScheduleScreen} />
                <Route path="/home/station" component={StationScreen} />
                <Route path="/home/bus" component={BusScreen} />
                <Route path="/home/noattendance" component={NoAttendanceScreen} />
                <Route path="/home/absence" component={AbsenceScreen} />
                <Route path="/home/statistics" component={StatisticScreen} />
                <Route path="/home/chart" component={ChartScreen} />
                <Route component={NotFoundScreen} />
            </Switch>
        </Router>
      </main>
    </div>
  );
}

export default Home;