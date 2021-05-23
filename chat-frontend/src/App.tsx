import React from 'react';
import './App.css';
import { RegPage } from './components/AuthPage/Reg';
import { AuthPage } from './components/AuthPage/Auth';
import { ChatPage } from './components/ChatPage/Chat';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
function App() {
  return (
   <div  className="App">
    <Router>
      <Switch>
        <Route path="/login"><AuthPage /></Route>
        <Route path="/rega"><RegPage /></Route>
        <Route path=""><ChatPage /></Route>
      </Switch>
    </Router>
   </div>
      
   
  );
}

export default App;
