// import dayjs from 'dayjs';

const APIURL = new URL('http://localhost:3001/api/');  // Do not forget '/' at the end

async function getAllCourses() {
  // call: GET /api/courses
  const response = await fetch(new URL('courses', APIURL), {credentials: 'include'});
  const coursesJson = await response.json();
  if (response.ok) {
    return coursesJson.map((c) => ({ code: c.code, name: c.name, credits: c.credits, max_students: c.max_students, propaedeutic: c.propaedeutic }));
  } else {
    throw coursesJson;  // an object with the error coming from the server
  }
}


async function getCourseIncompatibilities(code) {
  // call: GET /api/courses/:code
  const response = await fetch(new URL(`courses/incompatibilities/${code}`, APIURL), {credentials: 'include'});
  const coursesJson = await response.json();
  if (response.ok) {
    return coursesJson;
  } else {
    throw coursesJson; 
  }
}

async function getCoursePropaedeutics(code) {
  // call: GET /api/courses/:code
  const response = await fetch(new URL(`courses/propaedeutics/${code}`, APIURL), {credentials: 'include'});
  const courseJson = await response.json();
  if (response.ok) {
    return courseJson;
  } else {
    throw courseJson; 
  }
}

async function getCourseMaxStudents(code) {
  // call: GET /api/courses/:code
  const response = await fetch(new URL(`courses/maxstudents/${code}`, APIURL), {credentials: 'include'});
  const infoJson = await response.json();
  if (response.ok) {
    return infoJson;
  } else {
    throw infoJson; 
  }
}



/* --- APIs Login --- */

async function logIn(credentials) {
  let response = await fetch(new URL('sessions', APIURL), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

const API = { getAllCourses, logIn, getCourseIncompatibilities, getCoursePropaedeutics, getCourseMaxStudents };
export default API;