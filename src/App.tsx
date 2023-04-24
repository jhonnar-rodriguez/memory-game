import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Play } from './pages/Play';
import { Protected } from './components/Protected';

import './App.css';

function App(): ReactElement {
  return (
    <Container fluid>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route
            element={(
              <Protected>
                <Play />
              </Protected>
            )}
            path="/play"
          />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
