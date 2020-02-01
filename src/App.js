import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import NonLoginView from './component/NonLoginView'
import Uploader from './component/Uploader'
import Header from './component/Header'
import Catalog from './component/Catalog'
import Config from './component/Config'

function BaseRouter() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/users" component={Uploader} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/config" component={Config} />
          <Route path="/" component={NonLoginView} />
        </Switch>
    </Router>
    </div>
  );
}
export default BaseRouter;
