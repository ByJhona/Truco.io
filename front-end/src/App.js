import logo from './logo.svg';
import './App.css';
import {AuthProvider} from './Context/AuthContext'
import Login from './Login/Login'


function App() {
  return (
    <AuthProvider>
      <Login/>
    </AuthProvider>
    
  );
}
export default App;
