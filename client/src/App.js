import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './Navbar.js';
import API from './API.js';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Homepage from './Homepage.js'

function App() {

  const [courses, setCourses] = useState([]);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    // fetch  /api/courses
    if (dirty) {
      API.getAllCourses()
        .then((courses) => {
          setCourses(courses);
          setDirty(false)
          console.log(courses);
          // setInitialLoading(false);
        })
        .catch(err => console.log(err))
    }
  }, [dirty])

  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Homepage courses={courses} />} />

        </Routes>
      </Router>
    </>
  );



}



export default App;
