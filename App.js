import React from 'react';
import './App.css';
import contactsData from './data/contacts.json';
import Actionmenu from './ActionMenu';

function App() {

  function build_hl(){
    let keys = Object.keys(contactsData[0])
    return <tr>
      { keys.map((key, index)=>{ return <th key={key}>{key}</th> }) }
      <th>option</th>
    </tr>
  }
  function build_rows(){
    let keys = Object.keys(contactsData[0])
    return contactsData.map((row, index) =>{
      return <tr key={index}>
        { keys.map(key=>{
            return <td key={row[key]}>{row[key]}</td>
          })
        }
        <td style={{position: "relative", textAlign: "center"}}>
          <Actionmenu />
        </td>
      </tr>
    })
  }

  return (
    <table className="stdTable">
      <thead>{ build_hl() }</thead>
      <tbody>{ build_rows() }</tbody>
    </table>
  );
}

export default App;
