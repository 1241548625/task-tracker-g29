//import React, { useState } from "react";
import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function Registerform() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("name", name);
    localStorage.setItem("sortBy",sortBy)
    setName("");
    setSortBy("date");
    navigate("/tasks");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>Enter Your Name</div>
        <input type="text" value={name} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Registerform;
