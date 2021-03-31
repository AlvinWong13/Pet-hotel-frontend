import { HashRouter as Router, Route } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard'
import ManageOwners from '../ManageOwners/ManageOwners'

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Pet Hotel
      </header>

      <Router>
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
