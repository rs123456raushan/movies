import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SummaryScreen from './SummaryScreen';
import ShowList from './ShowList';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowList />}></Route>
          <Route exact path="/summary/:id" element={<SummaryScreen />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
