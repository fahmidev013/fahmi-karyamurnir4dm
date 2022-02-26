import { Component } from 'react';
import './App.css';
import { Home } from './pages/Home'

type props = {}
class App extends Component<props>{
  render(){
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
