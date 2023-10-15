import React, { useState, useEffect } from 'react';
import Http from '../utils/Http';

function TeacherForm({refreshList,setRefreshList}) {
  const [teacher, setTeacher] = useState({ name: '', students: [] });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    Http.get('/api/students/').then((response) => {
      setStudents(response.data);
    });
  }, [refreshList]);

  const handleStudentChange = (e) => {
    const selectedStudentId = parseInt(e.target.value);
    if (!teacher.students.includes(selectedStudentId)) {
      	setTeacher({ ...teacher, students: [...teacher.students, selectedStudentId] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Http.post('/api/teachers/', teacher).then((response) => {
    	setRefreshList(!refreshList);
    	setTeacher({name: '', students: []})
    });
  };

  console.log({teacher})

  return (
    <div>
      <h2>Add Teacher</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={teacher.name}
          onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
        />
        <div>
          <label>Assign Students:</label>
          <select multiple onChange={handleStudentChange}>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} {student.surname}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Teacher</button>
      </form>
    </div>
  );
}

export default TeacherForm;
