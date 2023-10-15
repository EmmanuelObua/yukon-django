import React, { useEffect, useState } from 'react';
import Http from '../utils/Http';

import TeacherUpdateForm from './TeacherUpdateForm';

function TeacherList({refreshList}) {
  	const [teachers, setTeachers] = useState([]);
  	const [selectedTeacher, setSelectedTeacher] = useState(null);

  	useEffect(() => {
	    Http.get('/api/teachers/').then((response) => {
	      	setTeachers(response.data);
	    });
  	}, [refreshList]);

  	const onUpdate = (data) => {
  		setTeachers(data);
  	}

    const handleUpdateClick = (teacher) => {
      	setSelectedTeacher(teacher);
    };

  	const handleDelete = (teacherId) => {
	    Http.delete(`/api/teachers/${teacherId}/`).then(() => {
	        setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
	    });
    };

    console.log({teachers})

  return (
    <div>
	    <h2>Teachers</h2>
	      {teachers.map((teacher) => (
	        <div key={teacher.id}>
	          <h3>{teacher.name}</h3>
	          <h4>Assigned Students:</h4>
	          <ul>
	            {teacher.students.map((student) => (
	              <li key={student.id}>
	                {student.name} {student.surname}
	              </li>
	            ))}
	          </ul>
	          <button onClick={() => handleDelete(teacher.id)}>Delete Teacher</button>
	        </div>
	      ))}

	      {selectedTeacher && (
              <TeacherUpdateForm teacher={selectedTeacher} onUpdate={onUpdate} />
          )}
    </div>
  );
}

export default TeacherList;
