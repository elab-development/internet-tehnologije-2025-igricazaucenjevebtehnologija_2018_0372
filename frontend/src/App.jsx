import React from 'react'

export default function App(){
  const apiCall = async ()=>{
    const data = await fetch("http://localhost:3000/");

    console.log(data);
  }
  return (
    <div className="App">
      <button onClick={apiCall}>Make API Call</button>
    </div>
  )
}
