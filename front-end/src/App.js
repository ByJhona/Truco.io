import logo from './Assents/logo.png';
import './App.css';
import Login from './Components/Login/Login'
import Game from './Components/Game/Game'

import { BrowserRouter, Switch, Route } from 'react-router-dom'



function App() {
  return (
    
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Login}/>
      <Route path="/game" component={Game} />
    </Switch>
  </BrowserRouter>    
  );
}
export default App;
