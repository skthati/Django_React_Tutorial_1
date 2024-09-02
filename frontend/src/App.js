//import logo from './logo.svg';
import './App.css';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import home from './components/home';
// import about from './components/about';
// import create from './components/create';
import { useState, useEffect} from 'react';

function App() {

  const [persons, setPersons] = useState([])
  const [fullname, setFullname] = useState("")
  const [date_of_birth, setDateOfBirth] = useState(0)
  const [newFullname, setNewFullname] = useState("")
  const [new_date_of_birth, setNewDateOfBirth] = useState(0)

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try{
      const response = await fetch("http://127.0.0.1:8000/persons/");
      const data = await response.json();
      console.log(data)
      setPersons(data);
    } catch (err) {
      console.log(err)
    }
  };

  const addPerson = async () => {
    const personData = {
      personName: fullname,
      date_of_birth: date_of_birth,
    }

    try{
      const response = await fetch("http://127.0.0.1:8000/persons/create/", {
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData),
      });
      const data = await response.json()
      console.log(data)
      setPersons((prev) => [...prev, data])
    } catch (err) {
        console.log(err)
    }
  }

  const UpdateDetails = async (pk) => {
    const currentPerson = persons.find(person => person.id === pk);

    const personData = {
      personName: newFullname || currentPerson.personName,
      date_of_birth: new_date_of_birth || currentPerson.date_of_birth,
    }

    try{
      const response = await fetch(`http://127.0.0.1:8000/persons/${pk}`, {
        method:"PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData)
      });
      const data = await response.json()
      console.log(data)
      setPersons((prev) => 
        prev.map((person) => {
          if (person.id === pk) {
            return data
          } else {
            return person;
          }
        }))
    } catch (err) {
        console.log(err)
    }
  }

  const deletePerson = async (pk) => {
    try{
      await fetch(`http://127.0.0.1:8000/persons/${pk}`, {
        method: 'DELETE',
      });

      setPersons((prev) => prev.filter((person) => person.id !== pk));
    } catch (err) {
      console.log(err);
    }
  }

  const calculateAge = (dob) => {
    // if (!dob) return null;
  
    
    const today = new Date();
  
  
    let age = today.getFullYear() - dob;
  
    return age;
  };

  return (
    <div className="App">
          <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabindex="-1" role="dialog" id="modalSignin">
        <div className="modal-dialog" role="document" style={{ maxWidth: '80%' }}>
          <div className="modal-content rounded-4 shadow" >
            <div className="modal-header  text-center p-5 pb-4 border-bottom-0">
              <h1 className="fw-bold mb-0 fs-2">Age Calculator</h1>
            </div>

            <hr></hr>
            <div> 
              <div className="container text-center" >
                <div className="row">
                  <div className="col">
                    <h3>Full Name</h3>
                  </div>
                  <div className="col">
                    <h3>Date of Birth</h3>
                  </div>
                  <div className="col">
                    <h3>Age</h3>
                  </div>
                  <div className="col">
                    <h3>Edit Name</h3>
                  </div>
                  <div className="col">
                    <h3>Edit DOB</h3>
                  </div>
                  <div className="col">
                    <h3>Update Details</h3>
                  </div>
                </div>
                {/* wait */}
                {persons.map((person) => (
                  <div>
                    <div className="row">
                      <div className="col">
                        { person.personName }
                      </div>
                      <div className="col">
                        { person.date_of_birth }
                      </div>
                      <div className="col">
                        <span>{calculateAge(person.date_of_birth)}</span>
                      </div>
                      <div className="col">
                        <input 
                          type='text' 
                          placeholder='Edit Name'
                          onChange={(e) => setNewFullname(e.target.value)}/>
                      </div>
                      <div className="col">
                        <input 
                          type='text' 
                          placeholder='Edit DOB' 
                          onChange={(e) => setNewDateOfBirth(e.target.value)}/>
                      </div>
                      <div className="col">
                        <button 
                          className="btn btn-primary mb-3" 
                          onClick={() => UpdateDetails(person.id, person.new_date_of_birth, person.newFullname) }>
                            Update
                        </button>
                      </div>
                      <div className="col">
                        <button 
                          className="btn btn-primary mb-3" 
                          onClick={() => deletePerson(person.id) }>
                            Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  ))}
              </div>
            </div>

            <hr></hr>

            <hr></hr>
            <div className="modal-body p-5 pt-0 text-center" style={{ maxWidth: '40%' }}>
                <div className="mb-3">
                    <input 
                      type='text' 
                      className="form-control"  
                      placeholder='Full Name:' 
                      onChange={(e) => setFullname(e.target.value)}>
                    </input>
                </div>
                <div className="mb-3">
                    <input 
                      type='number' 
                      className="form-control"  
                      placeholder='Date of Birth:'
                      onChange={(e) => setDateOfBirth(e.target.value)}>
                    </input>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary mb-3" onClick={addPerson}>Calculate</button>
                </div>
                {/* <div className="mb-3">
                    <label className="form-label" for="randNum">Random Number:</label>
                    <div className="form-control text-center fs-2 bg-light border " id="randNum">0</div>
                </div> */}

            </div>  
          </div>
        </div>
    </div>


      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <Routes>
          <Route path='/' element={<home/>} />
          <Route path='/about' element={<about/>} />
          <Route path='create' element={<create/>} />
        </Routes> */}
    </div>
  );
}

export default App;
