import React from 'react';
import './App.css';
import MonthView from './Components/Calender/MonthView';
import NavBar from './Components/NavBar/Navbar';

function App() {
  return (
    <div>
      <NavBar />
      <MonthView />
    </div>
  );
}

export default App;
