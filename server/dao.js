'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('database.db', (err) => {
  if(err) throw err;
});

// get all courses
exports.listCourses = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM courses';
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