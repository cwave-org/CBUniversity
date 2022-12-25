import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";

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
              {" "}
              &nbsp;&nbsp;
              <img width="150px" src="img/공구대학교@2x.png" alt="로고"></img>
            </Link>
          
      </nav>
    </>
  );
};
export default Navigation;
