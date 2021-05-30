// Dependencies
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Components
import AddJob from './AddJob';
import OpenApplications from './OpenApplications';
import Info from './Info';

// Other
import './App.css';
import firebase from './firebase.js';

function App() {

  // Generate job list
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const jobsRef = firebase.database().ref('jobs');
      
    jobsRef.on('value', (snapshot) => {
      const firebaseData = snapshot.val();
      const jobsFromDb = [];

      for (let jobDetails in firebaseData) {
        const { jobTitle, companyName, datePosted, postingOrigin, jobType, contactName, contactEmail, jobNotes, location, dateSubmitted, followOne, followTwo, followThree } = firebaseData[jobDetails];

        jobsFromDb.push({ jobTitle, companyName, datePosted, postingOrigin, jobType, contactName, contactEmail, jobNotes, location, dateSubmitted, followOne, followTwo, followThree, key: jobDetails });
      }

      setJobList(jobsFromDb);
    })
    
  }, [])


  return (
    <Router>
      <div className="App">
        <header>
          <div className="logo">
            INSERT LOGO HERE
          </div>
          {/* Persistent nav */}
          <nav>
            <ul>
              <li><NavLink to="/AddJob">Add New Job</NavLink></li>
              <li><NavLink to="/OpenApplications">Open Applications</NavLink></li>
              <li><NavLink to="/Info">Info</NavLink></li>
            </ul>
        </nav>
        </header>

        <div className="container">
          {/* Routing */}
          <Switch>
            <Route path="/AddJob" render={(props) => <AddJob {...props} />} />          
            <Route path="/OpenApplications" render={(props) => <OpenApplications {...props} jobList={jobList} />} />
            <Route path="/Info" render={(props) => <Info {...props} />}/>
          </Switch>
        </div>
        
      </div>
    </Router>
    
  );
}

export default App;



