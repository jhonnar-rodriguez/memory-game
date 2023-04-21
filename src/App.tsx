import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Play } from './pages/Play';

import './App.css';

function App() {
  return (

    <Container className="app-container" fluid>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Play />} path="/play" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </Container>

  );
}

export default App;
