import logo from './Assents/logo.png';
import './App.css';
import Login from './Controllers/Login/Login'
import Game from './Controllers/Game/Game'
import Salas from './Controllers/Salas/Salas'

import { BrowserRouter, Switch, Route } from 'react-router-dom'



function App() {
  return (
    
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Login}/>
      <Route path="/game" component={Game} />
      <Route path="/salas" component={Salas}/>
    </Switch>
  </BrowserRouter>    
  );
}
export default App;
