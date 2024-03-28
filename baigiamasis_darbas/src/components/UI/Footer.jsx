import { Link } from "react-router-dom";
import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  height: 150px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    gap: 10px;

    > a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #d6cbcb;

      > img {
        height: 40px;
      }
    }
  }

  > ul {
    list-style-type: none;
    display: flex;
    gap: 20px;

    > li {
      font-size: 20px;
      > a {
        text-decoration: none;
        color: #b8b1b1;
        transition: color 0.3s;

        &:hover {
          color: #231350;
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
        <p>© 2024 Giedrius Mikutavičius</p>
      </div>
      <ul>
        <li><Link to='/terms'>Terms & Conditions</Link></li>
        <li><Link to='/privacy'>Privacy Policy</Link></li>
        <li><Link to='/use'>Terms of Use</Link></li>
      </ul>
      <ul>
        <li>Socials</li>
        <li>
          <Link to='/instagram'><i className="bi bi-instagram"></i></Link>
        </li>
        <li>
          <Link to='/facebook'><i className="bi bi-facebook"></i></Link>
        </li>
        <li>
          <Link to='/linkedin'><i className="bi bi-linkedin"></i></Link>
        </li>
        <li>
          <Link to='/twitter'><i className="bi bi-twitter-x"></i></Link>
        </li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
