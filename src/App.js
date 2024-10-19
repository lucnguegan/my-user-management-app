import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserList from './components/UserList';
/* import CotisationsPage from './components/CotisationsPage';
import DepensesPage from './components/DepensesPage';
import RapportsPage from './components/RapportsPage';
import UsersPage from './components/UsersPage'; */

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/cotisations" element={<CotisationsPage />} /> */}
        {/* <Route path="/depenses" element={<DepensesPage />} /> */}
        {/* <Route path="/rapports" element={<RapportsPage />} /> */}
        <Route path="/Utilisateurs" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
