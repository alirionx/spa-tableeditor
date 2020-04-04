import React from 'react';
import './Form.css';


export default class msg404 extends React.Component{

    render(){
        return(
            <div id="ActionBox">
                <div css="hl">System Message</div>
                <div css="msg">404 Not Found</div>
                <div css="btnFrame" >
                    <button onClick={ () => window.location.hash = '/' }>ok</button>
                </div>
            </div>
        )
    }
}