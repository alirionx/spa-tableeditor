
import React from 'react';

import './Actionmenu.css';

export default class ActionMenue extends React.Component{
    constructor(props){
        super(props);
        this.btns = [
            {
                name: "edit",
                txt: "Edit",
                lnk: "/api/row/edit"
            },
            {
                name: "delete",
                txt: "Delete",
                lnk: "/api/row/delete"
            },
            {
                name: "copy",
                txt: "Copy",
                lnk: "/api/row/copy"
            }
        ];
        this.state = {
            table: props.table,
            rowid: props.rowid,
            menu: false
        }
    }

    changeState = () =>{
        if( this.state.menu ){
            this.setState({menu:false})
        }
        else{
            this.setState({menu:true})
        }
    }

    render(){
        let Btn;
        if(this.state.menu){
            Btn = <div className="ActionMenu">{ this.btns.map(act => <div css="on" key={act.name }>{act.txt}</div>)} </div>
        }
        return(
            <div>
                <button onClick={this.changeState}>action</button>
                { Btn }
            </div>
        )
    }


}