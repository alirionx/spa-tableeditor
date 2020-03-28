import React from 'react';
import axios from 'axios';

import './App.css';

import ActionMenue from './Actionmenu';

export default class Tables extends React.Component{
  constructor(props) {
    super(props);
    this.tableList = ["contacts", "cars"]
    this.state = {
      table: "contacts",
      defi: [],
      data: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  bgRequest = (table) =>{
    axios.get('/api/'+table)
      .then(res => {
        const tableObj = res.data;
        //console.log(tableObj);
        this.setState({ 
          defi: tableObj.defi, 
          data: tableObj.data 
        });
      })
  }

  componentDidMount() {
    this.bgRequest(this.state.table);
  }

  handleChange(event) {
    this.setState({table: event.target.value});
    this.bgRequest( event.target.value);
  }

  tableHead = () =>{
    return(
      <tr>
        { this.state.defi.filter(col => col.intable ).map(
          col => <th key={col.col} style={{textAlign:col.align}}>{col.hl}</th> 
        )}
        <th>Options</th>
      </tr>
    )
  }

  tableBody = () =>{
    return(
      this.state.data.map((row,index) => {
        return(
          <tr key={index}>
            { this.state.defi.filter(col => col.intable ).map(
              col => <td key={col.col} style={{textAlign:col.align}} >{row[col.col]}</td> 
            )}
            <td>
              <ActionMenue table={this.state.table} rowid={index} />
            </td>
          </tr>
        )
      })
    )
  }

  render() {
    return (
      <div>
        <select value={this.state.table} onChange={this.handleChange}>
          {this.tableList.map(table => <option key={table} value={table}>{table}</option>)}
        </select>
        <table>
          <thead>
            <this.tableHead />
          </thead>
          <tbody>
            <this.tableBody />
          </tbody>
        </table>
      </div>
    )
  }
} 