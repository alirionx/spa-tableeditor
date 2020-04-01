import React from 'react';
import axios from 'axios';
import './Form.css';


export default class RowEdit extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        table:props.table,
        rowid:props.rowid,
        defi:[],
        data:[],
        show:props.show
      }
      
    }

    bg_request(table, rowid){
        axios.get('/api/row/'+table+'/'+rowid).then(
            res=> {
              const rowObj = res.data;
              console.log(rowObj);
              this.setState({
                defi: rowObj.defi,
                data: rowObj.data,
                show: true
              })
            }
        )
    }

    componentDidMount(){
        this.bg_request(this.state.table, this.state.rowid);
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState(
            { table:nextProps.table, rowid:nextProps.rowid }
        );
        this.bg_request(nextProps.table, nextProps.rowid);
    }

    render(){
        if(!this.state.show ){
            return(
                <div></div>
            )
        }
        else{
            return(
                <div>
                    <h2>Edit: {this.state.table} Row: {this.state.rowid} </h2>
                    <button onClick={() => this.setState({show:false})}>close</button>
                </div>                

            )
        }
    }
}