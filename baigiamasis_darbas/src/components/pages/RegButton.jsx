const RegButton = ({ setShowForm }) => {
  const handleClick = () => {
    setShowForm(true);
  };

  const buttonStyle = {
    backgroundColor: '#5a1520',
    border: 'none',
    color: 'white',
    padding: '15px 25px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyle} onClick={handleClick}>
      Register
    </button>
  );
};

export default RegButton;