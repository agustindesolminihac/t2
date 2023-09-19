import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Sala from './components/Sala';
import WebSocketComponent from './components/WebSocket';
import React, { useState } from 'react';
import Game from './components/Game';
import Highscore from './components/Highscore';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
        <Switch>
          <Route exact path="/">
            <WebSocketComponent/>
          </Route>
          <Route path="/sala">
            <Sala/>
          </Route>
          <Route path="/game">
            <Game/>
          </Route>
          <Route path="/highscore">
            <Highscore/>
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
