import React, { useState } from 'react';
import Http from '../utils/Http';

function StudentForm({refreshList,setRefreshList}) {
	const [student, setStudent] = useState({ name: '', surname: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
		Http.post('/api/students/', student).then((response) => {
			setRefreshList(!refreshList);
			setStudent({name: '', surname: '' })
		});
	};

	return (
		<div>
			<h2>Add Student</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Name"
					value={student.name}
					onChange={(e) => setStudent({ ...student, name: e.target.value })}
				/>
				<input
					type="text"
					placeholder="Surname"
					value={student.surname}
					onChange={(e) => setStudent({ ...student, surname: e.target.value })}
				/>
				<button type="submit">Add Student</button>
			</form>
		</div>
	);
}

export default StudentForm;