import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

import EditRow from './Editrow'



export default class Mytable extends React.Component{

  constructor(props){
    super(props);
    this.tableList = ["contacts", "cars"];
    this.menuActions = ["edit", "copy", "delete"];
    this.state = {
      table:"contacts",
      defi:[],
      data:[],
      menu: false
    }

    this.set_table = this.set_table.bind(this);
    this.table_select = this.table_select.bind(this);
    this.table_head = this.table_head.bind(this);
    this.table_body = this.table_body.bind(this);
    this.action_menu = this.action_menu.bind(this);
    this.hide_menus = this.hide_menus.bind(this);
    this.call_action = this.call_action.bind(this);
  }
  
  bg_request(table){
    if(table !== ""){
      axios.get('/api/'+table).then(
        res=> {
          const tableObj = res.data;
          console.log(tableObj);
          this.setState({
            defi: tableObj.defi,
            data: tableObj.data,
            table: table
          })
        }
      )
    }
    else{
      this.setState({
        defi: [],
        data: [],
        table: ""
      })
    }
  }

  componentDidMount(){
    this.bg_request(this.state.table);
    document.body.addEventListener('click', (ev) => this.hide_menus(ev.target))
  }

  set_table(ev){
    var table = ev.target.value;
    this.bg_request(table);
  }

  table_select(){
    return(
      <select onChange={this.set_table}>
        <option value="">please select a table</option>
        {this.tableList.map( tbl => <option key={tbl} value={tbl}>{tbl}</option> )}
      </select>
    )
  }

  table_head(){
    return(
      <thead>
        <tr>
          {this.state.defi.map(col => <th key={col.col} style={{textAlign:col.align}}>{col.hl}</th>)}
          <th>Options</th>
        </tr>
      </thead>
    )
  }

  table_body(){
    return(
      <tbody>
        {this.state.data.map((row, index) => 
          <tr key={index} >
            {this.state.defi.map(col => <td key={col.col + index} style={{textAlign:col.align}}>{row[col.col]}</td>)}
            <td><this.action_menu rowId={index}/></td>
          </tr>
        )}
      </tbody>
    )
  }


  call_action(rowId, act){
    var actMapper = {
      "edit": this.call_edit,
      "copy": this.call_edit,
      "delete": this.call_edit
    }
    //alert('route to: '+this.state.table + ' - ' + rowId + ' - ' + act); 
    this.setState({menu:false})
    actMapper[act](this.state.table, rowId)
  }  

  call_edit( table, rowId){
    ReactDOM.render(
      <EditRow table={table} rowid={rowId} />, document.getElementById('snap')
    );
  }
  


  action_menu(props){
    let test ={}
    if(this.state.menu === props.rowId){
      return (
        <div className="ActionMenu" style={{zIndex:2}}>
        <div >action</div>
          {this.menuActions.map( act => <div onClick={() => this.call_action(props.rowId, act) } menu="yes" key={act}>{act}</div> )}
        </div>
      )
    }
    else{
      return(
        <div className="ActionMenu" style={test}>
          <div onClick={()=>this.setState({menu:props.rowId})}>action</div>
        </div>
      )
    }
  }

  hide_menus(target){
    if(!target.hasAttribute("menu")){
      this.setState({menu:false});
    }
  }

  render(){
    let tblElm
    if(this.state.table!==""){
      tblElm = <table>
        <this.table_head />
        <this.table_body />
      </table>
    }  
    return (
        <div>
          <this.table_select />
            {tblElm}
        </div>
      )
  }

}


