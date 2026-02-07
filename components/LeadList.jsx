function LeadList({ leads, deleteLead, startEdit }) {

  if (leads.length === 0) {
    return (
      <div className="card">
        <h3>No Leads Found...</h3>
      </div>
    );
  }

  return (
    <div className="lead-grid">
      {leads.map((lead) => (

        <div key={lead.id} className="card">

          {/* NAME */}
          <h3 style={{color:"#222"}}>
            {lead.name}
          </h3>

          {/* EMAIL */}
          <p style={{color:"#555"}}>
            {lead.email}
          </p>

          {/* STATUS */}
          <span className={`badge ${lead.status === "Hot" ? "hot" : "cold"}`}>
            {lead.status}
          </span>

          <div style={{marginTop:"15px"}}>

            <button
              onClick={() => startEdit(lead)}
              className="edit-btn"
            >
              Edit
            </button>

            <button
              onClick={() => deleteLead(lead.id)}
              className="delete-btn"
              style={{marginLeft:"10px"}}
            >
              Delete
            </button>

          </div>

        </div>

      ))}
    </div>
  );
}

export default LeadList;