import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import RegButton from './components/pages/RegButton';
import Footer from './components/UI/Footer';
import Register from './components/pages/Register';
import Home from './components/pages/Home';

Modal.setAppElement('#root'); // replace '#root' with the id of your app's root element

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
      <RegButton setShowForm={setShowForm} />
      <Modal isOpen={showForm} onRequestClose={() => setShowForm(false)}>
        <Register />
      </Modal>
      <Footer />
    </Router>
  );
};

export default App;