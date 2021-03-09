import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import LoginScreen from './components/Login';
import NotFoundScreen from './components/NotFound'
import HomeScreen from './pages/Admin'

function App() {
  return (
    <div className="App">
       <Suspense fallback={<div>Loadding ...</div>}>
        <Router>
            <Switch>
              {/* <Redirect exact from="/" to="/photos" /> */}
              <Route exact path="/" component={LoginScreen} />
              <Route path="/home" component={HomeScreen} />
              <Route component={NotFoundScreen} />
            </Switch>
          </Router>
       </Suspense>
    </div>
  );
}

export default App;
