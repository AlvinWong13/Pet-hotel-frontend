import { HashRouter as Router, Route } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import ManageOwners from '../ManageOwners/ManageOwners';
import Header from '../Header/Header';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Route path="/" exact>
          <Dashboard/>
        </Route>

        <Route path="/owners" exact>
          <ManageOwners/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
