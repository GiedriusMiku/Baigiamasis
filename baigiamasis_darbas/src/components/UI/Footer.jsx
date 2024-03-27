import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFooter = styled.footer`
  height: 150px;
  border-top: 4px solid black;
  padding: 0 20px;
  

  display: flex;
  align-items: center;
  justify-content: space-between;

  > div{
    height: 80%;
    display: flex;
    align-items: center;
    gap: 5px;

    > a{
      height: 50%;
      > img{
        height: 100%;
      }
    }
  }

  > ul{
    list-style-type: none;
    > li:first-child{
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 10px;
    }
    > li{
      margin-bottom: 5px;
      > a{
        text-decoration: none;
        > i{
          
          font-size: 20px;
          margin-right: 10px;
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <Link to='/'>
          <img
            src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png"
            alt="page logo"
          />
        </Link>
        <p>Copyrights &copy; 2024 Giedrius Mikutavičius</p>
      </div>
      <ul>
        <li><Link>Terms & Conditions</Link></li>
        <li><Link>Privacy Policy</Link></li>
        <li><Link>Terms of use</Link></li>
      </ul>
      <ul>
        <li>Socials</li>
        <li>
          <Link><i className="bi bi-instagram"></i></Link>
          <Link><i className="bi bi-facebook"></i></Link>
        </li>
        <li>
          <Link><i className="bi bi-linkedin"></i></Link>
          <Link><i className="bi bi-twitter-x"></i></Link>
        </li>
      </ul>
    </StyledFooter>
  );
}
 
export default Footer;