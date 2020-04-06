
import React from 'react';
import './Head.css';

export const menuStructure = [
  {
    "name":"home",
    "txt":"Home",
    "lnk": "/home"
  },
  {
    "name":"about",
    "txt":"About",
    "sub":[
      {
        "name":"us",
        "txt":"Us",
        "lnk": "/about/us"
      },
      {
        "name":"company",
        "txt":"Company",
        "lnk": "/about/company"
      },
      {
        "name":"imprint",
        "txt":"Imprint",
        "lnk": "/about/imprint"
      }
    ]
  },
  {
    "name":"contact",
    "txt":"Contact",
    "sub":[
      {
        "name":"mail",
        "txt":"Mail",
        "lnk": "/contact/mail"
      },
      {
        "name":"social",
        "txt":"Social media",
        "lnk": "/contact/social"
      },
      {
        "name":"phone",
        "txt":"Call us",
        "lnk": "/contact/phone"
      }
    ]
  },
]


export default class HeadBlock extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      "test": true
    }
  }

  sub_menu(props){
    if(props.obj.lnk !== undefined){
      return(
        <td>
          <div css="btnFrame">
            <div css="mainBtn" onClick={() => window.location.hash = props.obj.lnk}>{props.obj.txt}</div>
          </div>
        </td>
      )
    }
    else{
      return(
        <td>
          <div css="btnFrame">
            <div css="mainBtn">{props.obj.txt}</div>
            {props.obj.sub.map((btn, index) => 
              <div key={index} css="subBtn" onClick={() => window.location.hash = btn.lnk}>{btn.txt}</div> 
            )}
          </div>
        </td>
      )
    }
  }
  render(){
    return(
      <div>
        <div css="hl" >Hallo Welt</div>
        <table className="menuFrame" ><tbody><tr>
          {menuStructure.map((mainBtn, index) => 
            <this.sub_menu key={index} obj={mainBtn}/>
          )}
        </tr></tbody></table>
      </div>
    )
  }

}