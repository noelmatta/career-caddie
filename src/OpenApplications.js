

function OpenApplications({jobList}) {


  return (
    jobList.map((job) => (
      <article id={job.key} key={job.key}>   
        <div>
          <h1>
            {job.jobTitle} at {job.companyName}
          </h1>
        </div>

        <div>
          <h4>Date Posted: {job.datePosted}</h4>
          <p>Source: {job.postingOrigin} </p>
          <p>Type: {job.jobType} </p>
          <h4>Contact Details:</h4>
          <p>Name: {job.contactName} </p>
          <p>Email: <a href={job.contactEmail}>{job.contactEmail}</a> </p>
          <p>Notes: {job.jobNotes} </p>
          <p>Date Applied: {job.dateSubmitted} </p>
          <p>Follow Up 1: {job.followOne} </p>
          <p>Follow Up 2: {job.followTwo} </p>
          <p>Follow Up 3: {job.followThree} </p>
        </div>
        <hr />
      </article>  
      )
    )
  )
}

export default OpenApplications;
