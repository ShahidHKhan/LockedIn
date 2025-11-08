import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Timer from './pages/Timer';
import StudyLog from './pages/StudyLog';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/timer" component={Timer} />
        <Route path="/study-log" component={StudyLog} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default App;