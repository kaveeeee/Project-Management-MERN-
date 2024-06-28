import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

import AssignmentList from './components/AssignmentList';
import FileUpload from './components/FileUpload';
import Login from './components/Login';
import Navbar from './components/Navbar2';
import Profile from './components/Profile';
import Register from './components/Register';

import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

//ui 
import AssigmentCreate from './components/Assigmentcreate';
import Home from './components/Home';
import Sidebar from './components/main/Sidebar';
import StudentLogin from './components/student/StudentLogin';
import StudentRegistration from './components/student/StudentRegisteration';

//main
import Homemain from './components/main/Home';


//admin
import NotificationInsert from './components/admin/NotificationInsert';
import NotificationTable from './components/admin/NotificationTable';
import NotificationUpdate from './components/admin/NotificationUpdate';
import NotificationView from './components/admin/NotificationView';

//staff
import StaffAdd from './components/admin/staff/StaffAdd';
import StaffAll from './components/admin/staff/StaffAll';

//assigment
import CreateAssigmnt from './components/admin/assigment/Createassigmnt';
import ViewAssigmnt from './components/admin/assigment/ViewAssigment';

//marksheet
import Addmarks from './components/admin/marksheet/Addmarks';
import Marksheet from './components/admin/marksheet/Marksheet';

//markingrubric
import Createmarkingrubric from './components/admin/markingrubric/Createmarkingrubric';
import Viewmarkingrubric from './components/admin/markingrubric/Viewmarkingrubric';

//submission
import Createsubmission from './components/student/submissions/Createsubmission';
import Viewsubmission from './components/student/submissions/Viewsubmission';


import StudentAll from './components/admin/student/Allstudents';


import Homeside from './components/Homeside';
import Adminside from './components/admin/Adminside';

//excel upload 
import Studentdoc from './components/admin/exel/StudentReg';

//adminlogin
import Adminloginnew from './components/admin/login/Adminlogin';




const AppNavbar = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/studentlogin', '/studentregistration','/sidebar'];

  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  return <Navbar />;
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <AppNavbar />
          <Routes>
            <Route exact path='/' element={<StudentLogin  />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/upload' element={<FileUpload />} />
            <Route exact path='/assingment' element={<AssignmentList />} />
            <Route exact path='/studentlogin' element={<StudentLogin />} />
            <Route exact path='/studentregistration' element={<StudentRegistration />} />
            <Route exact path='/asscreate' element={<AssigmentCreate />} />
            <Route exact path='/sidebar' element={<Sidebar />} />
            <Route exact path='/homemain' element={<Homemain />} />
            <Route exact path='/notificationview' element={<NotificationView />} />
            <Route exact path='/notificationtable' element={<NotificationTable />} />
            <Route exact path="/notification/:id" element={<NotificationUpdate />} />
            <Route exact path="/notificationinsert" element={<NotificationInsert />} />
            <Route exact path="/allstudents" element={<StudentAll />} />
            <Route exact path="/addstaff" element={<StaffAdd />} />
            <Route exact path="/allstaff" element={<StaffAll />} />
            <Route exact path="/createassigment" element={<CreateAssigmnt />} />
            <Route exact path="/viewassigment" element={<ViewAssigmnt />} />
            <Route exact path="/addmarks" element={<Addmarks />} />
            <Route exact path="/marksheet" element={<Marksheet />} />
            <Route exact path="/viewmarkingrubric" element={<Viewmarkingrubric />} />
            <Route exact path="/createmarkingrubric" element={<Createmarkingrubric />} />
            <Route exact path="/createsubmission" element={<Createsubmission />} />
            <Route exact path="/viewsubmission" element={<Viewsubmission />} />



            <Route exact path="/homeside" element={<Homeside />} />
            <Route exact path="/adminside" element={<Adminside />} />

            <Route exact path="/studentdoc" element={<Studentdoc />} />

            <Route exact path="/adminloginnew" element={<Adminloginnew />} />

            
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
