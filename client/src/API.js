import dayjs from 'dayjs';

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

const API = { getAllCourses };
export default API;