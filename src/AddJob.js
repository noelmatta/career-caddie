import { useState, useRef } from 'react';
import firebase from './firebase.js';
import AutoComplete from './AutoComplete';

function AddJob() {

  // Initialize states
  const [ showSuggestions, setShowSuggestions ] = useState(false);
  const [ suggestionList, setSuggestionList] = useState(['']);
  const [ filtered, setFiltered  ] = useState([]);
  const titleRef = useRef();
  const [ job, setJob ] = useState({
    jobTitle: '',
    companyName: '',
    datePosted: '',
    postingOrigin: '',
    jobType: 'Fulltime',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    jobNotes: '',
    location: '',
    dateSubmitted: '',
    followOne: '', 
    followTwo: '', 
    followThree: '',
    resume: false,
    coverLetter: false,
  })

  const handleChange = (e) => {    
    const value = e.target.value;

    setJob({
      ...job,
      [e.target.name]: value
    });
  }

  const handleTitleChange = (e) => {    
    const value = e.target.value;

    setJob({
      ...job,
      jobTitle: value
    });
  }

  const handleAutoComplete = (e) => {
    const query = e.target.value;

    const filterSuggestions = (e) => {
      const partialSuggestion = e.toLowerCase();
      const filteredList = [];

      suggestionList.map((suggestion) => (
        suggestion.includes(partialSuggestion) ? filteredList.push(suggestion) : null
      ));
    
      setFiltered(filteredList);
    }

    const retrieveSuggestions = async (query) => {
      const res = await fetch(`http://api.dataatwork.org/v1/jobs/autocomplete?begins_with=${query}`);
      const json = await res.json();
      const tempSuggestions = [];
      
      json.map((suggestion) => (
        tempSuggestions.push(suggestion.normalized_job_title)
      ));

      setSuggestionList(tempSuggestions.sort());
    }    

    switch(query.length) {
      case 3:
        setFiltered([]);
        retrieveSuggestions(query);
        setShowSuggestions(true);
        break;
      case 2: case 1: case 0:
        setShowSuggestions(false);
        break;
      default:
        filterSuggestions(query);
        break;
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref('jobs');
    const submission = new Date();
    const submissionDate = new Date(submission).toDateString();
    const followUp = submission;
    const followUps = [];

    for (let i = 1; i < 4; i++) {
      followUp.setDate(followUp.getDate() + 7);
      followUps.push(new Date(followUp).toDateString());
    }

    dbRef.push({
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      datePosted: job.datePosted,
      postingOrigin: job.postingOrigin,
      jobType: job.jobType,
      contactName: job.contactName,
      contactPhone: job.contactPhone,
      contactEmail: job.contactEmail,
      jobNotes: job.jobNotes,
      location: job.location,
      dateSubmitted: submissionDate,
      followOne: followUps[0],
      followTwo: followUps[1],
      followThree: followUps[2] 
    })
  }  

  return (
    <section>
      <h1>Add New Job</h1>
      <form method="post" onSubmit={handleSubmit}>
        <h2>Details</h2>

        <label htmlFor="jobTitle">Job Title (type 4 characters for suggestions)</label>
        <input
          type="text"
          name="jobTitle"
          ref={titleRef}
          value={ job.jobTitle }
          onChange={ handleTitleChange }       
          onKeyDown={ handleAutoComplete }  
        />
        <AutoComplete handleTitleChange={handleTitleChange} titleRef={titleRef} display={showSuggestions} suggestions={filtered} />
        <label htmlFor="companyName">Company</label>
        <input
          type="text"
          name="companyName"
          value={ job.companyName }
          onChange={ handleChange }
        />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          value={ job.location }
          onChange={ handleChange }
        />        
        <label htmlFor="datePosted">Date Posted</label>
        <input
          type="text"
          name="datePosted"
          value={ job.datePosted }
          onChange={ handleChange }
        />
        <label htmlFor="postingOrigin">Source</label>
        <input
          type="text"
          name="postingOrigin"
          value={ job.postingOrigin }
          onChange={ handleChange }
        />
        <label htmlFor="jobType">Job Type</label>
        <select 
          name="jobType"
          value={ job.jobType } 
          onChange={ handleChange }>
            <option value="Fulltime">Full-Time</option>
            <option value="Parttime">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Volunteer">Volunteer</option>
        </select>
        <h2>Contact Info</h2>
        <label htmlFor="contactName">Name</label>        
        <input
          type="text"
          name="contactName"
          value={ job.contactName }
          onChange={ handleChange }
        />
        <label htmlFor="contactPhone">Phone</label>        
        <input
          type="text"
          name="contactPhone"
          value={ job.contactPhone }
          onChange={ handleChange }
        />
        <label htmlFor="contactEmail">Email</label> 
        <input
          type="text"
          name="contactEmail"
          value={ job.contactEmail }
          onChange={ handleChange }
        />
        <label htmlFor="jobNotes">Notes</label> 
        <textarea
          type="textarea"
          name="jobNotes"
          value={ job.jobNotes }
          onChange={ handleChange }
        />        
        <button type="submit" value="submit">Save</button>
      </form>
    </section>
  )
}

export default AddJob;