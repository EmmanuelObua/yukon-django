import React, { useState, useEffect } from 'react';
import Http from '../utils/Http';

function StudentUpdateForm({ student, onUpdate }) {
	const [updatedStudent, setUpdatedStudent] = useState(student);

	const handleUpdate = (e) => {
		e.preventDefault();
		Http.put(`/api/students/${student.id}/`, updatedStudent).then((response) => {
			onUpdate(response.data);
		});
	};

	return (
		<div>
			<h3>Update Student</h3>
			<form onSubmit={handleUpdate}>
				<input
					type="text"
					placeholder="Name"
					value={updatedStudent.name}
					onChange={(e) => setUpdatedStudent({ ...updatedStudent, name: e.target.value })}
				/>
				<input
					type="text"
					placeholder="Surname"
					value={updatedStudent.surname}
					onChange={(e) => setUpdatedStudent({ ...updatedStudent, surname: e.target.value })}
				/>
				<button type="submit">Update</button>
			</form>
		</div>
	);
}

export default StudentUpdateForm;
