'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('database.db', (err) => {
  if (err) throw err;
});

// get all courses
exports.listCourses = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM courses ORDER BY name';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const courses = rows.map((e) => ({ code: e.code, name: e.name, credits: e.credits, max_students: e.max_students, propaedeutic: e.propaedeutic }));
      resolve(courses);
    });
  });
};


exports.getCourseIncompatibilities = (code) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT c.code as code, c.name as name, c.credits as credits FROM incompatibilities as i LEFT JOIN courses as c on i.reference_code = c.code WHERE i.code = ?';
    db.all(sql, [code], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const courses = rows.map((e) => ({ code: e.code, name: e.name, credits: e.credits }));
      resolve(courses);
    });
  });
};

exports.getCoursePropaedeutics = (code) => {
  return new Promise((resolve, reject) => {
    const sql = 'select c2.code as code, c2.name as name, c2.credits as credits from courses as c1 left join courses as c2 on c1.propaedeutic = c2.code where c1.code = ?';
    db.get(sql, [code], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({});
      } else {
        const course = { code: row.code, name: row.name, credits: row.credits };
        resolve(course);
      }
    });
  });
};

exports.getCourseMaxStudents = (code) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT max_students FROM courses where code = ?';
    db.get(sql, [code], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row.max_students);
    });
  });
};

