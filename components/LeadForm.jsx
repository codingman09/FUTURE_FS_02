import { useState, useEffect } from "react";

function LeadForm({ addLead, editingLead, updateLead }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Cold");

  // When editing, fill the form automatically
  useEffect(() => {
    if (editingLead) {
      setName(editingLead.name);
      setEmail(editingLead.email);
      setStatus(editingLead.status);
    }
  }, [editingLead]);

  const handleSubmit = () => {

    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    const lead = {
      id: editingLead ? editingLead.id : Date.now(),
      name,
      email,
      status
    };

    if (editingLead) {
      updateLead(lead);
    } else {
      addLead(lead);
    }

    // Clear form
    setName("");
    setEmail("");
    setStatus("Cold");
  };

  return (
    <div>

      <input
        placeholder="Client Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Client Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="Cold">Cold</option>
        <option value="Hot">Hot</option>
      </select>

      <button
        onClick={handleSubmit}
        className="add-btn"
        style={{ marginLeft: "10px" }}
      >
        {editingLead ? "Update Lead" : "Add Lead"}
      </button>

    </div>
  );
}

export default LeadForm;