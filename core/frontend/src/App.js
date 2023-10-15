import {useState} from 'react'
import logo from './logo.svg';
import './App.css';

import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';
import StudentForm from './components/StudentForm';
import TeacherForm from './components/TeacherForm';

function App() {

	const [refreshList, setRefreshList] = useState(false)

	return (
		<>
			<div className="App">
				
				<div>
					<StudentList refreshList={refreshList}/>
					<TeacherList refreshList={refreshList}/>
					<StudentForm refreshList={refreshList} setRefreshList={setRefreshList}/>
					<TeacherForm refreshList={refreshList} setRefreshList={setRefreshList}/>
				</div>
			</div>
		</>
	);
}

export default App;
