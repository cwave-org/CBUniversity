import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar as FaStarRegular } from "@fortawesome/free-regular-svg-icons";
import { dbService } from "../fbase";
import styled from "styled-components";
const CobuyingItem = ({ userObj, listObj, isOwner }) => {
  let navigate = useNavigate();
  let today = new Date();
  const [checked, setChecked] = useState(true);
  let checkObj;
  if (userObj != null) {
    checkObj = {
      check: !checked,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      userName: userObj.displayName,
    };
  } else {
    checkObj = {
      check: !checked,
      createdAt: Date.now(),
      creatorId: null,
      userName: null,
    };
  }

  let curday = new Date(listObj.deadline);
  curday.setHours(curday.getHours() + 14);
  curday.setMinutes(curday.getMinutes() + 59);
  curday.setSeconds(curday.getSeconds() + 59);

  useEffect(() => {
    dbService
      .doc(`startlist/${listObj.id}`)
      .collection("scrap")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          // 스크랩 여부 확인 후 체크박스 조정(?)
          if (doc.id === userObj.uid) {
            setChecked(false);
          }
        });
      });
  }, []);

  // 스크랩 기능
  const check = async (event) => {
    setChecked((current) => !current);
    if (checked) {
      // 스크랩
      await dbService
        .doc(`startlist/${listObj.id}/scrap/${userObj.uid}`)
        .set(checkObj);
      await dbService
        .doc(`startlist/${listObj.id}/scrap/${userObj.uid}`)
        .update({
          check: !check,
        });
      dbService
        .doc(`startlist/${listObj.id}/scrap/${userObj.uid}`)
        .get(checkObj);
    } else {
      // 스크랩 취소
      await dbService
        .doc(`startlist/${listObj.id}`)
        .collection("scrap")
        .doc(userObj.uid)
        .delete();
    }
  };

  const onDetaillistClick = () => {
    if (userObj != null) {
      navigate(`/selling/detail/${listObj.id}`, {
        replace: false,
        state: { detailObj: listObj },
      });
    } else {
      alert("접근 권한이 없습니다.");
    }
  };

  return (
    // className 뭐라 할까 css할때 헷갈릴까봐 아직 안바꿨어
    <div className="cobuyingItem">
      <>
        {today < curday ? (
          listObj.done===false?(
            <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justify: "center",
            }}
          >
            {userObj != null && 
              <div className="home_scr">
                {!checked ? (
                  <img 
                    src="img/star1.png" 
                    alt="스크랩전"
                    style={{width:"5vw"}}
                    onClick={check}
                    />
                  // <FontAwesomeIcon
                  //   className="fa-globe"
                  //   icon={faStar}
                  //   onClick={check}
                  //   size="2x"
                  //   color={"#ffffff"}
                  //   aria-hidden="true"
                  // ></FontAwesomeIcon>
                ) : (
                  <img 
                    src="img/star.png" 
                    alt="스크랩후" 
                    style={{width:"5vw"}}
                    onClick={check}
                    />

                  // <FontAwesomeIcon
                  //   className="fa-globe"
                  //   icon={FaStarRegular}
                  //   onClick={check}
                  //   size="2x"
                  //   color={"#ffffff"}
                  // ></FontAwesomeIcon>
                )}
              </div>
            }
            <div onClick={onDetaillistClick}>
              {listObj.attachmentUrl ? (
                <img
                  style={{
                    // paddingBottom:"0%",
                    width: "100%",
                    // height: "!important",
                    // marginBottom: 5,
                    borderRadius: 10,
                    aspectRatio: "1/1",
                    backgroundColor:"white"
                  }}
                  alt="썸네일"
                  src={listObj.attachmentUrl}
                />
              ) : (
                <>
                  <img
                    alt="썸네일"
                    style={{ 
                      width: "100%", 
                      borderRadius: 10,
                      aspectRatio: "1/1",
                      backgroundColor:"white"
                    }}
                    src="img/transparent.png"
                  />
                </>
              )}
              <Item>
                {listObj.itemname}
              </Item>
              <Price>
                {listObj.deadline}
              </Price>
            </div>
          </div>
          ):(
            <div
            className="endthing"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justify: "center",
            }}
          >
            <div onClick={onDetaillistClick}>
              {listObj.attachmentUrl ? (
                <img
                style={{ 
                  width: "100%", 
                  borderRadius: 10,
                  aspectRatio: "1/1",
                  backgroundColor:"white"
                }}
                  alt="썸네일"
                  src={listObj.attachmentUrl}
                />
              ) : (
                <>
                  <img
                    style={{ 
                      width: "100%", 
                      borderRadius: 10,
                      aspectRatio: "1/1",
                      backgroundColor:"white"
                    }}
                    src="img/transparent.png"
                    alt="로딩"
                  />
                </>
              )}
              <Item>
                {listObj.itemname}
              </Item>
              <Price>(공구 조기 마감)</Price>
            </div>
          </div>
          )
        ) : (
          <div
            className="endthing"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justify: "center",
            }}
          >
            <div onClick={onDetaillistClick}>
              {listObj.attachmentUrl ? (
                <img
                style={{ 
                  width: "100%", 
                  borderRadius: 10,
                  aspectRatio: "1/1",
                  backgroundColor:"white"
                }}
                  alt="썸네일"
                  src={listObj.attachmentUrl}
                />
              ) : (
                <>
                  <img
                    style={{ 
                      width: "100%", 
                      borderRadius: 10,
                      aspectRatio: "1/1",
                      backgroundColor:"white"
                    }}
                    src="img/transparent.png"
                    alt="로딩"
                  />
                </>
              )}
              <Item>
                {listObj.itemname}
              </Item>
              <Price>(공구 마감)</Price>
            </div>
          </div>
        )}
      </>
    </div>
  );
};
export default CobuyingItem; 

const Item=styled.div`
  margin-top: 3px;
  color: black;
  font-size: 13px;
  font-weight: bolder;
`;
const Price=styled(Item)`
  color:#707070;
  margin-top: 0px;
  font-weight: 600;
`;