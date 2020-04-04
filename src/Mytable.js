import React from 'react';
import axios from 'axios';
import './Mytable.css';

export const defi = {
    undefined:{
        defi:[],
        row:[]
    },
    cars: {
        defi: [
            {
                col: "brand",
                hl: "Brand",
                align: "left",
                type: "string",
                pattern: "",
                intable: true,
                manda: false
            },
            {
                col: "model",
                hl: "Model",
                align: "left",
                type: "string",
                pattern: "",
                intable: true,
                manda: false
            },
            {
                col: "engine",
                hl: "Engine",
                align: "left",
                type: "string",
                pattern: "",
                intable: true,
                manda: false
            },
            {
                col: "color",
                hl: "Color",
                align: "left",
                type: "string",
                pattern: "",
                intable: true,
                manda: false
            },
            {
                col: "horsepowers",
                hl: "Horse powers",
                align: "center",
                type: "integer",
                pattern: "\\d+",
                intable: true,
                manda: false
            }
        ],
        row:{
            brand:"",
            model:"",
            engine:"",
            color:"",
            horsepowers:""
        }
    },
    contacts: {
        defi: [
            {
                col: "firstname",
                hl: "First name",
                align: "left",
                type: "string",
                pattern: "",
                intable: true,
                manda: true
            },
            {
                col: "lastname",
                hl: "Lastname",
                align: "left",
                type: "string",
                pattern: "",
                intable: true,
                manda: false
            },
            {
                col: "address",
                hl: "Address",
                align: "left",
                type: "string",
                pattern: "",
                intable: true,
                manda: false
            },
            {
                col: "city",
                hl: "City",
                align: "left",
                type: "string",
                pattern: "",
                intable: true,
                manda: false
            },
            {
                col: "postcode",
                hl: "Post code",
                align: "center",
                type: "integer",
                pattern: "\\d{5}",
                intable: true,
                manda: false
            },
            {
                col: "phone",
                hl: "Phone Number",
                align: "left",
                type: "string",
                pattern: "",
                intable: true,
                manda: false
            }
        ],
        row:{
            firstname:"",
            lastname:"",
            address:"",
            city:"",
            postcode:"",
            phone:""
        }
    }
}


export default class MyTable extends React.Component{

    constructor(props){
      super(props);
      let params = props.match.params;
      //console.log(params);
      this.tableList = ["contacts", "cars"];
      this.menuActions = ["edit", "copy", "delete"];
      this.state = {
        table:params.table,
        defi:defi[params.table]['defi'],
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
      
      this.evMenuOff = this.evMenuOff.bind(this);
      document.body.addEventListener('click', this.evMenuOff);
      }

    evMenuOff(ev){this.hide_menus(ev.target)};
    
    bg_request(table){
      if(table !== undefined){
        axios.get('/api/'+table).then(
          res=> {
            const tableObj = res.data;
            console.log(tableObj);
            this.setState({
              data: tableObj.data,
              table: table
            })
          }
        )
      }
      else{
        this.setState({
          data: [],
          table: ""
        })
      }
    }
  
    componentDidMount(){
      this.bg_request(this.state.table);
    }
  
    set_table(ev){
      var table = ev.target.value;
      if(table === ""){ 
          table = undefined 
          window.location.hash = '/' 
      }
      else{
        window.location.hash = table 
      }
      this.setState({defi:defi[table]['defi']})  
      this.bg_request(table);
    }
  
    table_select(){
      let isVal;
      if(this.state.table !== undefined){
        isVal = this.state.table;
      }
        return(
        <select value={isVal} onChange={this.set_table}>
          <option value="">please select a table</option>
          {this.tableList.map( tbl => <option key={tbl} value={tbl}>{tbl}</option> )}
        </select>
      )
    }
  
    table_head(){
      return(
        <thead>
          <tr>
            {this.state.defi.filter(col => col.intable ).map(col => <th key={col.col} style={{textAlign:col.align}}>{col.hl}</th>)}
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
              {this.state.defi.filter(col => col.intable ).map(col => <td key={col.col + index} style={{textAlign:col.align}}>{row[col.col]}</td>)}
              <td><this.action_menu rowId={index}/></td>
            </tr>
          )}
          <tr>
              <td style={{border:"none"}}>
                <div className="ActionMenu" >
                    <div style={{marginTop:"10px"}} onClick={()=> this.call_action("add", "edit")}>add</div>
                </div>
              </td>
          </tr>
        </tbody>
      )
    }
  
    call_action(rowId, act){
      this.setState({menu:false})
      document.body.removeEventListener('click', this.evMenuOff);
      window.location.hash = '/row/'+act+'/'+this.state.table+'/'+rowId
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