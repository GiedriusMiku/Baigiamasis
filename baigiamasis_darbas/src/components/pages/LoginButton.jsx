const LoginButton = ({ setShowLogin }) => {
  const handleClick = () => {
    setShowLogin(true);
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyle} onClick={handleClick}>
      Login
    </button>
  );
};

export default LoginButton;