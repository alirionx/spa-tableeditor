import React from 'react';
import axios from 'axios';
import './Form.css';

import {defi} from './Mytable';

export default class RowEdit extends React.Component{

    constructor(props){
      //console.log(props)
      super(props);
      let params = props.match.params;
      this.state = {
        table:params.table,
        rowid:params.rowid,
        defi:defi[params.table]["defi"],
        data:defi[params.table]["row"],
      };

      this.elm_creator = this.elm_creator.bind(this);
      this.set_data_val = this.set_data_val.bind(this);
      this.bg_post = this.bg_post.bind(this);
    }

    bg_request(table, rowid){
        axios.get('/api/row/'+table+'/'+rowid)
        .then(
            res=> {
              const rowObj = res.data;
              //console.log(rowObj, typeof(rowObj.data));
              if(typeof(rowObj.data) == 'object'){
                this.setState({
                    data: rowObj.data
                })
              }
            }
        )
        .catch(function (error) {
            console.log(error.response.status);
            if (error.response.status === 404) {
              window.location.hash = '/404';
            }
        })
    }

    bg_post(){
        const formData = new FormData();
        formData.append('table', this.state.table)
        formData.append('rowid', this.state.rowid)
        formData.append('data', JSON.stringify(this.state.data))
            
        //console.log(formData);

        axios({
            method: 'post',
            url: '/api/row/edit', 
            data: formData, 
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(
            res=> {
              console.log(res);
              window.location.hash = '/'+this.state.table;
            }
        )
    }

    componentDidMount(){
        this.bg_request(this.state.table, this.state.rowid);
    }
    /*
    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState(
            { table:nextProps.table, rowid:nextProps.rowid }
        );
        this.bg_request(nextProps.table, nextProps.rowid);
    }
    */

    set_data_val(event){
        //console.log(event.target.value);
        var col = event.target.getAttribute("col");
        var rowData = this.state.data;
        rowData[col] = event.target.value;
        this.setState({data:rowData});
    }

    elm_creator(fw){
        var defi = fw.defi
        let manda
        if(defi.manda){
            manda = "required"
        }
        if(defi.options === undefined){
            defi.options = [];
        }

        var elmStr = (
            <div>
                <div css="iptHl" >{defi.hl}</div>
                <input type="text" 
                    placeholder={defi.plh} 
                    value={this.state.data[defi.col]} 
                    pattern={defi.pattern} 
                    required={manda} 
                    col={defi.col}
                    onChange={this.set_data_val}
                />
            </div>
        )

        var elmInt = (
            <div>
                <div css="iptHl" >{defi.hl}</div>
                <input type="number" 
                    placeholder={defi.plh} 
                    value={this.state.data[defi.col]} 
                    pattern={defi.pattern} 
                    required={manda} 
                    col={defi.col}
                    onChange={this.set_data_val}
                />
            </div>
        )

        var elmSel = (
            <div>
                <div css="iptHl" >{defi.hl}</div>
                <select type="dropdown" 
                    value={this.state.data[defi.col]}  
                    col={defi.col}
                    onChange={this.set_data_val}
                >
                    <option value="">please select a type</option>
                    {defi.options.map((val, index)=> <option key={index} value={val}>{val}</option>) }
                </select>
            </div>
        )

        var elmMapper ={
            "string": elmStr,
            "integer": elmInt,
            "select": elmSel,
        }

        return elmMapper[defi.type]
    }
 
    render(){
        return(
            <div id="ActionBox">
                <div css="hl">Edit: {this.state.table} Row: {this.state.rowid}</div>
                {this.state.defi.map((defi, index) => 
                    <this.elm_creator key={index} defi={defi} />
                )}
                <div css="btnFrame" >
                    <button onClick={ this.bg_post }>ok</button>
                    <button onClick={() => window.location.hash = '/'+this.state.table}>close</button>
                </div>
            </div>                
        )
    }
}