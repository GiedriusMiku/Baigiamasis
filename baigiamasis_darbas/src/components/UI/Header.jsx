import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";


const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #282c34;
    color: white;

    div {
        display: flex;
        align-items: center;
    }

    nav {
        display: flex;
        align-items: center;
    }

    a {
        color: white;
        text-decoration: none;
        margin: 0 10px;
    }

    a:hover {
        color: #61dafb;
    }

    img {
        height: 50px;
    }

    button {
        background-color: #f14848;
        border: none;
        color: white;
        padding: 10px;
        cursor: pointer;
        margin-left: 10px;
    }

    button:hover {
        background-color: #21a1c1;
    }
`;



const Header = () => {

    const navigate = useNavigate();
    const { loginUser, setLoginUser } = useContext(UsersContext);

    return ( 
        <StyledHeader>
            <div><NavLink to='/addNew'>Add Question</NavLink></div>
            <div>
                <Link to="/">
                    <img src="https://c0.klipartz.com/pngpicture/273/392/gratis-png-logo-dragon-diseno-grafico-logo-dragon-logo-dragon-negro.png" alt=""/>
                </Link>
            </div>
            <nav>
                {
                    loginUser ?
                <div>
                    <p>
                        <Link to={`/user/${loginUser.userName}`}>{loginUser.userName}</Link>
                    </p>
                    <button 
                    onClick={() => {
                        setLoginUser(false);
                        navigate('/');
                    }}
                    ><i className="bi bi-door-closed"></i></button>
                </div>:
                <ul>
                    <li>
                        <NavLink to='/user/login'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to='/user/register'>Register</NavLink>
                    </li>
                </ul>
                }
            </nav>
        </StyledHeader>
     );
}
 
export default Header;