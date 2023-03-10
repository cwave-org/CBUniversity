import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService, dbService } from "../fbase";
import { deleteUser } from "firebase/auth";
import Swal from "sweetalert2";
import styled from "styled-components";
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });

        // var email = user.email;
        // var emailIndex = email.indexOf("@") + 1;
        // var emailform = email.substring(emailIndex);
        // if (emailform !== "sookmyung.ac.kr") {
        //   deleteUser(user);
        //   setUserObj(null);
        //   Swal.fire({
        //     icon: "error",
        //     confirmButtonColor: "#1f54c0",
        //     text: "숙명 메일로만 로그인이 가능합니다.",
        //   });
        // } else {
        // }
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        <Load>
        {/*  <div className="ini"> */}
          <img src="img/biglogo.png" width="50%" alt="로딩로고" style={{position:"relative",top:"30vh",left:"25%"}}/>
          {/* <img id="rotating_img" width="80%" src="img/loading.gif"></img> */}
        {/* </div> */}
        </Load>
      )}
    </>
  );
}

export default App;

const Load=styled.div`
  background-color: #1f54c0;
  height: 100vh;
  width: 100vw;
  position:absolute;
`