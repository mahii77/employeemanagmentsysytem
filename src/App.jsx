import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const API = "http://localhost:3000/employees";

  const fetchData = async () => {
    const res = await axios.get(API);
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (emp) => {
    if (emp.id) {
      await axios.put(`${API}/${emp.id}`, emp);
    } else {
      await axios.post(API, emp);
    }
    fetchData();
    setSelected(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete employee?")) {
      await axios.delete(`${API}/${id}`);
      fetchData();
    }
  };

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Employee Management System</h2>

      <input
        placeholder="Search by name"
        onChange={(e) => setSearch(e.target.value)}
      />

      <EmployeeForm onSubmit={handleSubmit} selected={selected} />

      <EmployeeList
        data={filtered}
        onEdit={setSelected}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
