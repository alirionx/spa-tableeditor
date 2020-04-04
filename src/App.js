import React from 'react';
import {
  //BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  //Link
} from "react-router-dom";
import MyTable from './Mytable';
import EditRow from './Editrow';
import DeleteRow from './Deleterow';
import msg404 from './msg404';


export default function App() {
  return (
    <HashRouter basename='/' >
      <Switch>
        <Route path="/404" component={msg404} />  
        <Route path="/row/edit/:table/:rowid" component={EditRow} />
        <Route path="/row/delete/:table/:rowid" component={DeleteRow} />
        <Route path="/:table" component={MyTable} />  
        <Route path="/" component={MyTable} />      
      </Switch>
    </HashRouter>
  );
}


/*
 <Router>
      <Switch>
        <Route path="/">
          <MyTable />
        </Route>
      </Switch>
    </Router>
*/