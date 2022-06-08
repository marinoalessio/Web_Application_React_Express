import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './Navbar.js';
import API from './API.js';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Homepage from './Homepage.js';
import { LoginForm, LogoutButton } from './LoginComponents.js';

function App() {
  return (
  <Router>
    <App2 />
  </Router>
  );
}

function App2() {

  const [courses, setCourses] = useState([]);
  const [dirty, setDirty] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // fetch  /api/courses
    if (dirty) {
      API.getAllCourses()
        .then((courses) => {
          setCourses(courses);
          setDirty(false)
          // setInitialLoading(false);
        })
        .catch(err => console.log(err))
    }
  }, [dirty]);  // loggedIn da aggiungere

  const doLogin = (credentials) => {
    API.logIn(credentials)
    .then( user => {  // qua la response è ok e abbiamo una promise fulfilled
      setLoggedIn(true);
      setUser(user);
      navigate('/');
    });
  }

  

  return (
    <>
      <Navbar loggedIn={loggedIn} user={user} />
      
        <Routes>
          <Route path="/login" element={loggedIn ? <Navigate to='/' /> : <LoginForm login={doLogin} />} />
          <Route path='/' element={<Homepage courses={courses} />} />

        </Routes>
    
    </>
  );

}



export default App;
