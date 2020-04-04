import React from 'react';
import axios from 'axios';
import './Form.css';


export default class DeleteRow extends React.Component{
    constructor(props){
        super(props);
        let params = props.match.params;
        this.table = params.table;
        this.rowid = params.rowid;

        this.post_delete = this.post_delete.bind(this);
    }

    post_delete(){
        var formData = new FormData();
        formData.append('table', this.table);
        formData.append('rowid', this.rowid);
        axios.post('/api/row/delete', formData)
        .then(
            res=> { 
                console.log(res.data)
                window.location.hash = '/'+this.table
            }
        )
        .catch(function (error) {
            console.log(error.response.status);
            if (error.response.status === 404) {
              window.location.hash = '/404';
            }
        })
    }

    render(){
        return(
            <div id="ActionBox">
                <div css="hl">System Message</div>
                <div css="msg">
                    Do you really want to delete<br />
                    row {this.rowid} in table "{this.table}" ???
                </div>
                <div css="btnFrame" >
                    <button onClick={ this.post_delete }>ok</button>
                    <button onClick={ () => window.location.hash = '/'+this.table }>cancel</button>
                </div>
            </div>
        )
    }
}