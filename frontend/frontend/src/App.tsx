import React from 'react';
import './App.css';
import RecipeColumnContainer from './components/RecipeColumnContainer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <RecipeColumnContainer />
    </div>
  );
}

export default App;
