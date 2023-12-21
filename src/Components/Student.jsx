import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons'
import './Student.css';




function Student(props) {

    const [editMode, setEditMode] = useState(false);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("")
    const [gradYear, setGradYear] = useState();

    useEffect(() =>{
        setFirstName(props.student.first_name);
        setLastName(props.student.last_name);
        setEmail(props.student.email);
        setGradYear(props.student.gradYear);
        
      }, [])

      const saveStudents = () =>{
        setEditMode(false);
        const updatedStudent = {first_name: firstname, last_name: lastname, email: email, gradYear: gradYear, id: props.student.id, image: props.student.image};
        props.updateStudent(updatedStudent);
      }

    return (
        <div className="card">
            <img src={props.student.image} alt="Happy Student" className='card-img-top mx-auto' />
            {!editMode &&
                <ul className="list-group list-group-flush">
                    <li className='list-group-item text-center'>{props.student.first_name}</li>
                    <li className='list-group-item text-center'>{props.student.last_name}</li>
                    <li className='list-group-item text-center'>{props.student.email}</li>
                    <li className='list-group-item text-center'>{props.student.gradYear}</li>
                    <button type="button" className="btn btn-danger" onClick={() => props.removeStudent(props.student)} >Delete Student <FontAwesomeIcon icon={faWarning} /></button>
                    <button type="button" className="btn btn-warning" onClick={() => setEditMode(true)}>Edit<FontAwesomeIcon icon={faMagicWandSparkles} /></button>
                </ul>
            }
            {editMode &&
                <ul className="list-group list-group-flush">
                    <li className='list-group-item text-center'><input type="text" className="form-control" value={firstname} onChange={(evt) => setFirstName(evt.currentTarget.value)} /></li>
                    <li className='list-group-item text-center'><input type="text" className="form-control" value={lastname} onChange={(evt) => setLastName(evt.currentTarget.value)} /></li>
                    <li className='list-group-item text-center'><input type="text" className="form-control" value={email} onChange={(evt) => setEmail(evt.currentTarget.value)} /></li>
                    <li className='list-group-item text-center'><input type="text" className="form-control" value={gradYear} onChange={(evt) => setGradYear(evt.currentTarget.value)} /></li>
                    <li className="list-group-item"><button id="btnSave" className="btn btn-secondary" onClick={saveStudents}>Save</button></li>
                    </ul>
}
                </div>

    )
};






            export default Student;