import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogRocket from 'logrocket';

import './App.css';
import V1NonLoginView from './component/V1NonLoginView'
import V2NonLoginView from './container/V2NonLoginView'
import Uploader from './component/Uploader'
import Header from './component/Header'
import Catalog from './component/Catalog'
import V1Catalog from './container/V1Catalog'
import Join from './component/Join'
import Config from './component/Config'

export default function App() {
  const router = useRef(null);
  useEffect(() => {
    router.current.history.listen((location) => {
      window.gtag('config', process.env.REACT_APP_GOOGLE_ANALYTICS_SECRET, {
        'page_path': location.pathname
      });
    });
    if (window.location.hostname !== 'localhost') {
      LogRocket.init('98yupe/vrc-tech2');
    }
  });

  return (
    <div className="App">
      <Header />
      <Router ref={router}>
        <Switch>
          <Route path="/v1/catalog" component={V1Catalog} />
          <Route path="/v1/join" component={Join} />
          <Route path="/v1/" component={V1NonLoginView} />

          <Route path="/users" component={Uploader} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/join" component={Join} />
          <Route path="/config" component={Config} />
          <Route path="/" component={V2NonLoginView} />
        </Switch>
    </Router>
    </div>
  );
}
