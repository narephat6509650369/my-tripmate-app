import React, { useEffect } from "react";
import './App.css';

function App() {
   useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <div>
      <h1>Frontend React</h1>
      <p>เปิด console ดูข้อมูลจาก backend</p>
    </div>
  );
}

export default App;
