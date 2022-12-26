import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";
import styled from "styled-components";

const Logo = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Navigation = ({ userObj }) => {
  const navigate = useNavigate();
  const logOut = (event) => {
    authService.signOut();
  };
  return (
    <>
      <nav>
          <Link
            to="/"
            style={{
              alignItems: "center",
              fontSize: 10,
              textDecoration: "none",
            }}
          >
            <Logo>
              <img  width="150px" src="img/공구대학교@2x.png" alt="로고"></img>
            </Logo>
            </Link>
      </nav>
    </>
  );
};
export default Navigation;
