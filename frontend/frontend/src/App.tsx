import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RecipeColumnContainer from './components/RecipeColumnContainer';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const url = "http://127.0.0.1:5000/api/v1/recipes";
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return axios.get(url).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <h1 style={{ color: "green" }}>using JavaScript inbuilt FETCH API</h1>
      <center>
        {data.map((dataObj, index) => {
          return (
            <div
              style={{
                width: "15em",
                backgroundColor: "#35D841",
                padding: 2,
                borderRadius: 10,
                marginBlock: 10,
              }}
            >
              <p style={{ fontSize: 20, color: 'white' }}>{dataObj.recipe.label}</p>
            </div>
          );
        })}
      </center>
    </div>
  );

  // return (
  //   <div className="App">
  //     <Navbar />
  //     <RecipeColumnContainer />
  //   </div>
  // );
}

export default App;
