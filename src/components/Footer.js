import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../fbase";
import styled from "styled-components";
const Footer=({userObj, option})=>{
    const navigate = useNavigate();
    const logOut = (event) => {
      authService.signOut();
    };
    const onClick=(e)=>{
        console.log(e);
        if(e===0){
            if(userObj==null){
                var an=window.confirm("로그인후 이용 가능합니다. 로그인하시겠습니까?");
                if (an){
                    navigate("/auth");
                }
            }else{
                navigate("/selling");
            }
        }else if(e===1){
            navigate("/");
        }else if(e===2){
            if(userObj==null){
                var an1=window.confirm("로그인후 이용 가능합니다. 로그인하시겠습니까?");
                if (an1){
                    navigate("/auth");
                }
            }else{
            navigate("/profile");
            }
        }
    }
    return (
        <Bar>
            <Touch>
                <Section onClick={()=>onClick(0)}>
                </Section>
                <Section1 onClick={()=>onClick(1)}></Section1>
                <Section2 onClick={()=>onClick(2)}></Section2>
                {option==="home"?(
                    // <></>
                    <img src="img/homebar.png" alt="공구열기" style={{width:"100vw", position:"relative",top:"-150px"}}/>
                ):(
                    option==="open"?(
                        <img src="img/openbar.png" alt="홈"  style={{width:"100vw", position:"relative",top:"-150px"}}/>
                    ):(
                        <img src="img/profilebar.png" alt="프로필" style={{width:"100vw", position:"relative",top:"-150px"}}/>
                    )
                )}

            </Touch>

        {/* <ul style={{ display: "flex", justifyContent: "center" }}>
          <li>
            {userObj != null ? (
              <Link
                to="/selling"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: 12,
                  textDecoration: "none",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h1 style={{ fontSize: 30 }}>📢</h1>
                  <span style={{ fontSize: 10 }}>공구 열기</span>
                </div>
              </Link>
            ) : (
              <></>
            )}
          </li>
          <li>
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
              <img width="150px" src="img/공구대학교.png" alt="로고"></img>
            </Link>
          </li>
          <li>
            {userObj ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to="/"
                    style={{
                      fontSize: 10,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      fontSize: 10,
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    <h1 style={{ fontSize: 20, marginRight: 10 }}>⍈</h1>
                    <span style={{ fontSize: 10 }} onClick={logOut}>
                      LogOut
                    </span>
                  </Link>

                  <Link
                    to="/profile"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 10,
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 5,
                        alignItems: "center",
                      }}
                    >
                      <img width="30px" src="img/noonsong.gif"></img>
                      <span>&nbsp;&nbsp;Profile</span>
                    </div>
                  </Link>
                </div>
              </>
            ) : (
              <Link to="/auth">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 5,
                  }}
                >
                  <h1 style={{ fontSize: 20 }}>⍈</h1>
                  <span>LogIn</span>
                </div>
              </Link>
            )}
          </li>
        </ul> */}
      </Bar>
    );
}

export default Footer;

const Bar=styled.div`
    position: fixed;
    bottom: 0px;
    background-color: white;
    width: 100vw;
    height:50px;
    left: 0;
`;
const Touch=styled.div`
    position: absolute;
`;
const Section=styled.div`
    position: relative;
    left: 10vw;
    top: 0;
    width: 15vw;
    height: 50px;
    z-index: 1;
    background-color: transparent;
    background-color: red;
    opacity: 0;
`;
const Section1=styled(Section)`
    left:42.5vw;
    top: -50px;
`;
const Section2=styled(Section)`
    left:75vw;
    top: -100px;
`;