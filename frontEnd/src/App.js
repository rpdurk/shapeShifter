import { BrowserRouter as Router, Route } from 'react-router-dom';

import GamePage from './pages/gamepage';

function App() {
  return (
      <Router>
        <Route path='/' component={GamePage}/>
      </Router>
  );
}

export default App;

