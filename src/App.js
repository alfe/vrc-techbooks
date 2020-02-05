import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import NonLoginView from './component/NonLoginView'
import Uploader from './component/Uploader'
import Header from './component/Header'
import Catalog from './component/Catalog'
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
  });
  return (
    <div className="App">
      <Header />
      <Router ref={router}>
        <Switch>
          <Route path="/users" component={Uploader} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/join" component={Join} />
          <Route path="/config" component={Config} />
          <Route path="/" component={NonLoginView} />
        </Switch>
    </Router>
    </div>
  );
}
