import React from 'react';

class Actionmenu extends React.Component {

  //----------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
        active: false
    };
    this.actions = ["edit", "copy", "delete"];
  }

  //----------------------------------------------
  changeActive  = () => {
    if(this.state.active){
        this.setState({active: false});
    }
    else{
        this.setState({active: true});
    }
  }

  //----------------------------------------------
  render() {
    if(!this.state.active){
      return <button className="actionBtn" onClick={ this.changeActive  } >action</button>
    }

    return (
      <div>
        <button className="actionBtn" onClick={ this.changeActive  } >action</button>
        <div className="actionMenu">
            { this.actions.map((act, index)=>{ return <div onClick={this.changeActive} key={index}>{ act }</div> }) }
        </div>
      </div>
    );
  }

  //----------------------------------------------
}

export default Actionmenu;