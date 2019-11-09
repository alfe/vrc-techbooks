import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import NonLoginView from './component/NonLoginView'
import Uploader from './component/Uploader'

function BaseRouter() {
  return (
    <Router>
      <Switch>
        <App />
      </Switch>
    </Router>
  );
}
export default BaseRouter;

const App = () => {
  return (
    <div className="App">
      <Route path="/users" component={Uploader} exact />
      <Route path="/" component={NonLoginView} exact />
    </div>
  );
};
