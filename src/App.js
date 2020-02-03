import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Quiz from './containers/Quiz/Quiz';
import GameOver from './containers/GameOver/GameOver';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Quiz} />
        <Route path="/gameover" component={GameOver} /> 
      </Switch>
    </div>
  );
}

export default App;
