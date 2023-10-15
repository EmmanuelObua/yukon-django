import React, { useEffect, useState } from 'react';
import Http from '../utils/Http';

import StudentUpdateForm from './StudentUpdateForm';

function StudentList({refreshList}) {
	const [students, setStudents] = useState([]);
	const [selectedStudent, setSelectedStudent] = useState(null);

	useEffect(() => {
		Http.get('/api/students/').then((response) => {
			setStudents(response.data);
		});
	}, [refreshList]);

	const onUpdate = (data) => {
  		setStudents(data);
  	}

	const handleUpdateClick = (student) => {
	    setSelectedStudent(student);
	};

	const handleDelete = (studentId) => {
	    Http.delete(`/api/students/${studentId}/`).then(() => {
	       setStudents(students.filter((student) => student.id !== studentId));
	    });
	};

	return (
		<div>
			<h2>Students</h2>
			<ul>
				{students.map((student) => (
					<>
						<li key={student.id}>{student.name} {student.surname}</li>
						<button onClick={() => handleDelete(student.id)}>Delete</button>
					</>
				))}
			</ul>

			{selectedStudent && (
		        <StudentUpdateForm student={selectedStudent} onUpdate={onUpdate} />
		    )}
		</div>
	);
}

export default StudentList;