import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import RegButton from './components/pages/RegButton';
import LoginButton from './components/pages/LoginButton';
import Login from './components/pages/Login';
import Footer from './components/UI/Footer';
import Register from './components/pages/Register';
import Home from './components/pages/Home';

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top : '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '60%',
  }
};

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <RegButton setShowForm={setShowForm} />
      <LoginButton setShowLogin={setShowLoginForm} />
      <Modal isOpen={showForm} onRequestClose={() => setShowForm(false)} style={customStyles}>
        <Register />
      </Modal>
      <Modal isOpen={showLoginForm} onRequestClose={() => setShowLoginForm(false)} style={customStyles}> 
        <Login />
      </Modal>
      <Footer />
    </Router>
  );
};

export default App;