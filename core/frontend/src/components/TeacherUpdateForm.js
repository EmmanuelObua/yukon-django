import React, {useState} from 'react'
import Http from '../utils/Http';

function TeacherUpdateForm({ teacher, onUpdate }) {
	const [updatedTeacher, setUpdatedTeacher] = useState(teacher);
	const [selectedStudents, setSelectedStudents] = useState([]);

	const handleUpdate = (e) => {
		e.preventDefault();

		// Combine selected student IDs with existing ones
		const updatedStudents = [...updatedTeacher.students, ...selectedStudents];
		setUpdatedTeacher({ ...updatedTeacher, students: updatedStudents });

		Http.put(`/api/teachers/${teacher.id}/`, updatedTeacher).then((response) => {
			onUpdate(response.data);
		});
	}

	return (
		<div>
			<h3>Update Teacher</h3>
			<form onSubmit={handleUpdate}>
				<input
					type="text"
					placeholder="Name"
					value={updatedTeacher.name}
					onChange={(e) => setUpdatedTeacher({ ...updatedTeacher, name: e.target.value })}
				/>
				<button type="submit">Update</button>
			</form>
		</div>
	);
}

export default TeacherUpdateForm;
