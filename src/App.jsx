import React, { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import AddStudent from './Components/AddStudent';
import _ from 'lodash';
import Student from './Components/Student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'







function App() {

  const [allStudents, setAllStudents] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeyWords] = useState("");
  const [gradYear, setGradYear] = useState("");

  useEffect(() => {
    let studentsLocalStorage;
    if (localStorage) {
      studentsLocalStorage = JSON.parse(localStorage.getItem('students'));
    }
  
    if (studentsLocalStorage) {
      saveStudents(studentsLocalStorage);
    } else {
      saveStudents(students);
    }
  }, []);
  


  const saveStudents = (students) => {
    setAllStudents(students);
    setSearchResults(students);

    //local storage saves the students data//
    if (localStorage) {
      localStorage.setItem('students', JSON.stringify(students));
      console.log('saved to local storage');
    }
  }

  const addStudent = (newStudent) => {
    const updatedStudents = [...allStudents, newStudent];
    saveStudents(updatedStudents);

  }

  const searchStudents = () => {
    let keywordsArray = [];
    //Filers All Students By word or keyword//
    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(' ');
    }
    //Adding to Year to thhe keywords array//
    if (gradYear) {
      keywordsArray.push(gradYear.toString());
    }



    if (keywordsArray.length > 0) {
      const searchResults = allStudents.filter(
        student => {
          for (const word of keywordsArray) {
            if (student.first_name.toLowerCase().includes(word) ||
              student.last_name.toLowerCase().includes(word) || student.gradYear === parseInt(word)) {
              return true;
            }
          }
          return false;
        });

      setSearchResults(searchResults);
    } else {
      setSearchResults(allStudents);
    }

  }
  //Function for deleting stuudent//
  const removeStudent = (studentToDelete) => {
    const updatedStudentsArray = allStudents.filter(student => student.id !== studentToDelete.id);
    saveStudents(updatedStudentsArray);
  }

  const updateStudent = (updatedStudent) => {
    //console.table(updatedStudent);
    const updatedStudentsArray = allStudents.map(student => student.id === updatedStudent.id ? { ...student, ...updatedStudent } : student);
    saveStudents(updatedStudentsArray);
  }


  const students = [{
    id: nanoid(),
    first_name: "Faye",
    last_name: "McGrotty",
    email: "fmcgrotty0@jimdo.com",
    image: 'images/student1.jfif',
    gradYear: 2000
  }, {
    id: nanoid(),
    first_name: "Dulci",
    last_name: "Auletta",
    email: "dauletta1@tinypic.com",
    image: 'images/student2.jfif',
    gradYear: 2000
  }, {
    id: nanoid(),
    first_name: "Nils",
    last_name: "Bonnick",
    email: "nbonnick2@surveymonkey.com",
    image: 'images/student3.jfif',
    gradYear: 2001
  }, {
    id: nanoid(),
    first_name: "Sherline",
    last_name: "Burtonshaw",
    email: "sburtonshaw3@g.co",
    image: 'images/student4.jfif',
    gradYear: 2001
  }, {
    id: nanoid(),
    first_name: "Abeu",
    last_name: "Jeannel",
    email: "ajeannel4@t-online.de",
    image: 'images/student5.jfif',
    gradYear: 2002
  }, {
    id: nanoid(),
    first_name: "Hasty",
    last_name: "Paulino",
    email: "hpaulino5@themeforest.net",
    image: 'images/student6.jfif',
    gradYear: 2002
  }, {
    id: nanoid(),
    first_name: "Johann",
    last_name: "Rickardsson",
    email: "jrickardsson6@ucsd.edu",
    image: 'images/student7.jfif',
    gradYear: 2003
  }, {
    id: nanoid(),
    first_name: "Patricio",
    last_name: "Steers",
    email: "psteers7@ucsd.edu",
    image: 'images/student8.jfif',
    gradYear: 2003
  }, {
    id: nanoid(),
    first_name: "Ayn",
    last_name: "Gutridge",
    email: "agutridge8@seattletimes.com",
    image: 'images/student9.jfif',
    gradYear: 2004
  }, {
    id: nanoid(),
    first_name: "Anthea",
    last_name: "Thireau",
    email: "athireau9@imgur.com",
    image: 'images/student10.jfif',
    gradYear: 2004
  }];




  return (
    <div className="container">

      <div className="row" id="allStudents">
        <h3>Current Students</h3>
        {searchResults && searchResults.map((student) =>
        (

          <div className="col-md-2" key={student.id}>
            <Student student={student} removeStudent={removeStudent} updateStudent={updateStudent} />
          </div>
        ))}


        <div className="col-lg-2"></div>
        <div className="col-lg-2"></div>
        <div className="col-lg-2"></div>
        <div className="col-lg-2"></div>
        <div className="col-lg-2"></div>

      </div>
      {/*!allStudents && <button type="button" className='btn btn-lg btn-success' onClick={() => saveStudents(students)}>Save Students</button>*/}
      <AddStudent addStudent={addStudent} />
      <div className="row mt-4" id="searchStudents">
        <h3>Student Search</h3>
        <div className="col-md-4">
          <label htmlFor="txtKeywords">Search by first Name or Last Name or </label>
          <input type="text" className='form-control' placeholder='Henry Goodin' onChange={evt => setKeyWords(evt.currentTarget.value)} value={keywords} />
        </div>
        <div className="col-md-4">
          <select value={gradYear} onChange={evt => setGradYear(evt.currentTarget.value)} className='form-select'>
            <option value="">Select Year</option>
            {_(allStudents).map(student => student.gradYear).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}
          </select>
        </div>
        <div className="col-md-4">
          <button type="button" className='btn btn-primary' onClick={searchStudents}>Search Results <FontAwesomeIcon icon={faSearch} /></button>
        </div>
      </div>
    </div>
  )
}

export default App



