import { useState, useEffect } from "react";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";
import "./App.css";

function App() {

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem("leads");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(leads));
  }, [leads]);

  const addLead = (lead) => {
    setLeads([...leads, lead]);
  };

  const deleteLead = (id) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const startEdit = (lead) => {
    setEditingLead(lead);
  };

  const updateLead = (updatedLead) => {
    setLeads(leads.map(l =>
      l.id === updatedLead.id ? updatedLead : l
    ));
    setEditingLead(null);
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = leads.length;
  const hot = leads.filter(l => l.status === "Hot").length;
  const cold = leads.filter(l => l.status === "Cold").length;

  return (
    <div className="container">

      <div className="title">
        🚀 Smart CRM Dashboard
      </div>

      {/* Dashboard */}
      <div className="dashboard">
        <div className="card">Total Leads: <b>{total}</b></div>
        <div className="card">🔥 Hot: <b>{hot}</b></div>
        <div className="card">❄️ Cold: <b>{cold}</b></div>
      </div>

      {/* Search */}
      <div className="card">
        <input
          placeholder="Search client..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>

      {/* ⭐ THIS IS THE CENTERED GRID */}
      <div className="main-layout">

        <div className="card">
          <LeadForm
            addLead={addLead}
            editingLead={editingLead}
            updateLead={updateLead}
          />
        </div>

        <LeadList
          leads={filteredLeads}
          deleteLead={deleteLead}
          startEdit={startEdit}
        />

      </div>

    </div>
  );
}

export default App;