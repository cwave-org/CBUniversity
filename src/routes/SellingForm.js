import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../fbase";
import { useNavigate } from "react-router-dom";
import SellingItemFactory from "../components/SellingItemFactory";
import styled from "styled-components";
import DateFactory from "../components/DateFactory";
import DateItem from "../components/DateItem";
import Swal from "sweetalert2";

const EachContainer = styled.div`
  width: 100%;
  margin: 3px 0px 0px 0px;
`;
const EachTitle = styled.div`
  font-weight: 600;
  margin-left: 5px;
  margin-bottom: 1px;
  margin-top: 5px;
  position: relative;
  font-size: 12px;
  color:#707070;
`;
const EachDetail = styled.div`
  margin-top: 1px;
`;
const Detail1 = styled(EachDetail)`
  /* padding: 3px; */
  margin-top: 7px;
`;
const DetailArea = styled.textarea`
  padding: 3px 5px;
  border-radius: 5px;
  height: 30px;
  resize: none;
  background-color: #f6f6f6;
  ::placeholder{
    padding: 5px;
    color:#c1c7d0;
    margin-bottom: 3px;
    font-size: 12px;
  }
`;
const Notice = styled.div`
  color: grey;
  position: absolute;
  top: 5px;
  right: 7px;
  font-size: 7px;
`;
const Notice2 = styled.div`
  color: grey;
  position: absolute;
  top: 9px;
  left: 130px;
  font-size: 7px;
`;
const Box = styled.div`
  position: relative;
  border-radius: 10px;
  padding-bottom: 25px;
`;
const Button = styled.button`
  position: absolute;
  bottom: -px;
  right: 3px;
  background-color: #b5b5b5;
  color: white;
`;
const MyBtn = styled.div`
  width: fit-content;
  margin: 3px 3px 10px 3px;
  padding: 0 0 0 10px;
  text-align: center;
  height: 10%;
  background-color: #b5b5b5;
  color: white;
  border-radius: 5px;
`;
const SellingForm = ({ userObj }) => {
  const [itemname, setItemname] = useState("");
  const [name, setName] = useState("");
  const [attachment, setAttachment] = useState("");
  const [deadline, setDeadline] = useState("");
  const [link, setLink] = useState("");
  const [account, setAccount] = useState("");
  const [etc, setEtc] = useState("");
  const [notice, setNotice] = useState("");
  const [giving, setGiving] = useState(0);
  const [click, setClick] = useState([false]);
  const [clicked, setClicked] = useState(false);
  const [clickeddate, setClickedDate] = useState(false);

  const [dateId, setDateId] = useState(1);
  const [data, setData] = useState([]); //전달
  const [dates, setDates] = useState([
    <DateItem
      key={dateId}
      id={dateId}
      setData={setData}
      data={data}
      uid={userObj.uid}
    />,
  ]); //날짜 배열 저장

  const [item, setItem] = useState("");
  const [itemID, setItemID] = useState(0);
  const [id, setId] = useState(0);

  const navigate = useNavigate();
  const ta = useRef();
  const ta2 = useRef();

  useEffect(() => {
    setItemID(Math.random());
  }, []);
  const onFormSubmit = async (event) => {
    navigate("/");
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const listObj = {
      randomidx: itemID,
      name: name, // 공대표 이름 추가
      itemname: itemname,
      deadline: deadline,
      datetime: Date.now(),
      creatorId: userObj.uid,
      account: account,
      etc: etc,
      notice: notice,
      link: link,
      attachmentUrl,
      // userName: userObj.displayName,
      currentNum: 0,
      done: false,
      dates: data,
    };
    await dbService.collection("startlist").add(listObj);
    setItemname("");
    setName("");
    setItem("");
    setDeadline("");
    setAttachment("");
    setEtc("");
    setLink("");
    setAccount("");
    setNotice("");
  };

  const onCancel = () => {
    navigate("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    if (event.target.id === "itemname") {
      setItemname(value);
    } else if (event.target.id === "nameform") {
      setName(value);
    } else if (event.target.id === "item") {
      setItem(value);
    } else if (event.target.id === "deadline") {
      setDeadline(value);
    } else if (event.target.id === "link") {
      setLink(value);
    } else if (event.target.id === "etc") {
      // console.log(ta.current.scrollHeight);
      if (ta.current.scrollHeight > 78) {
        ta.current.style.height = ta.current.scrollHeight + "px";
      }

      setEtc(value);
    } else if (event.target.id === "account") {
      setAccount(value);
    } else if (event.target.id === "notice") {
      if (ta2.current.scrollHeight > 78) {
        ta2.current.style.height = ta2.current.scrollHeight + "px";
      }
      setNotice(value);
    }
  };

  const onRadioClick = (e) => {
    if (e.target.value === "parcel") {
      setGiving(1);
    } else if (e.target.value === "site") {
      setGiving(2);
    }
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
  const onCheckForm = () => {
    if (click[click.length - 1]) {
      Swal.fire({
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "취소",
        confirmButtonText: "제출",
        confirmButtonColor: "#1f54c0",
        text: "정말로 폼을 제출하시겠습니까?",
      }).then((result) => {
        if (result.isConfirmed) {
          onFormSubmit();
        }
      });
      // var result = window.confirm("정말로 폼을 제출하시겠습니까?");
      // if (result) {
      //   onFormSubmit();
      // }
    } else if (click[click.length - 1] === false) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "#1f54c0",
        text: "상품추가 완료버튼을 눌러주셔야 제출 가능합니다.",
      });
    }
    // } else if (!clickeddate) {
    //   window.alert("현장배부 날짜추가 완료버튼을 눌러주셔야 제출 가능합니다");
    // }
  };
  const onClickAddDate = () => {
    setDateId(dateId + 1);
    setDates(
      dates.concat(
        <DateItem
          key={id + 1}
          id={id + 1}
          setData={setData}
          data={data}
          uid={userObj.uid}
        />
      )
    );
  };

  return (
    <form className="openjoin_container">
      {/* <p>공구 열기</p> */}
      <EachContainer>
        <EachTitle>상품이름 <img src="img/check.png" alt="체크" style={{width:"15px"}} /></EachTitle>
        <EachDetail>
          <input
            id="itemname"
            className="openjoin_input"
            value={itemname}
            onChange={onChange}
            type="text"
            placeholder="상품이름"
            maxLength={120}
            required
          />
        </EachDetail>
      </EachContainer>

      <EachContainer>
        <EachTitle>공대표 이름 <img src="img/check.png" alt="체크" style={{width:"15px"}} /></EachTitle>
        <EachDetail>
          <input
            className="openjoin_input"
            id="nameform"
            type="text"
            placeholder={userObj.displayName}
            onChange={onChange}
            value={name}
            required
          />
        </EachDetail>
      </EachContainer>

      <EachContainer>
        <EachTitle>상품 대표사진 <img src="img/check.png" alt="체크" style={{width:"15px"}} /></EachTitle>
        <Detail1>
          <MyBtn>
            <label>
              파일 업로드
              <input
                type="file"
                accept="image/*"
                multiple="multiple"
                onChange={onFileChange}
                style={{ visibility: "hidden", width: "0px" }}
              />
            </label>
          </MyBtn>
          {attachment && (
            <div className="attatchment">
              <img src={attachment} alt="대표사진" />
              <button className="default_Btn" onClick={onClearAttachment}>
                Clear
              </button>
            </div>
          )}
        </Detail1>
      </EachContainer>

      <EachContainer>
        <EachTitle>마감기한 <img src="img/check.png" alt="체크" style={{width:"15px"}} /></EachTitle>
        <Detail1>
          <input
            id="deadline"
            className="openjoin_input"
            value={deadline}
            onChange={onChange}
            type="date"
            placeholder="마감기한"
            maxLength={120}
            required
          />
        </Detail1>
      </EachContainer>

      <EachContainer>
        <EachTitle>카테고리 <img src="img/check.png" alt="체크" style={{width:"15px"}} /></EachTitle>
        <EachDetailwhite>
          <input
            type="radio"
            //name="theme"
            value="moon"
            defaultChecked
            // onClick={onRadioClick}
          />
          문구류{" "}
          <input
            type="radio"
            //name="theme"
            value="cloth"
            disabled
            onClick={onRadioClick}
          />
          의류
          {/* <input
            type="radio"
            //name="theme"
            value="parcel"
            disabled
            onClick={onRadioClick}
          />
          의류 */}
        </EachDetailwhite>
      </EachContainer>

      <EachContainer>
        <EachTitle>오픈채팅방 링크 <img src="img/check.png" alt="체크" style={{width:"15px"}} /></EachTitle>
        <EachDetail>
          <input
            id="link"
            className="openjoin_input"
            value={link}
            onChange={onChange}
            type="text"
            placeholder="오픈채팅방링크"
            maxLength={150}
            style={{ marginBottom: 5 }}
          />
        </EachDetail>
      </EachContainer>

      <EachContainer>
        <EachTitle>계좌(은행/계좌번호/입금주명) <img src="img/check.png" alt="체크" style={{width:"15px"}} /></EachTitle>
        <EachDetail>
          <input
            id="account"
            className="openjoin_input"
            value={account}
            onChange={onChange}
            type="text"
            placeholder="계좌(은행/ 계좌번호/입금주명)"
            maxLength={120}
            style={{ marginBottom: 5 }}
            required
          />
        </EachDetail>
      </EachContainer>

      <EachContainer>
        <EachTitle>배송여부 <img src="img/check.png" alt="체크" style={{width:"15px"}} /></EachTitle>
        <EachDetailwhite>
          <input
            type="radio"
            //name="theme"
            value="site"
            onClick={onRadioClick}
          />
          현장배부{" "}
          <input
            type="radio"
            //name="theme"
            value="parcel"
            disabled
            onClick={onRadioClick}
          />
          택배배송
        </EachDetailwhite>
      </EachContainer>
      {giving === 0 ? (
        <EachContainer></EachContainer>
      ) : giving === 1 ? ( //택배배송 선택한 경우
        <EachContainer></EachContainer>
      ) : (
        <EachContainer>
          <EachTitle>
            현장배부 날짜
            <Notice2>현장배부 날짜 및 시간을 작성해주세요</Notice2>
           <img src="img/check.png" alt="체크" style={{width:"15px"}} /></EachTitle>
          <EachDetail>
            {/*<DateFactory
              userObj={userObj}
              itemID={itemID}
              setClicked={setClickedDate}
            />*/}
            <Box>
              {dates}
              <Button className="default_Btn_Left" onClick={onClickAddDate}>
                날짜 추가
              </Button>
            </Box>
          </EachDetail>
        </EachContainer>
      )}

      <EachContainer>
        <EachTitle>상세설명 <img src="img/check.png" alt="체크" style={{width:"15px"}} /></EachTitle>
        <EachDetail>
          <DetailArea
            id="etc"
            className="openjoin_input"
            ref={ta}
            // rows="10"
            style={{height:"77px"}}
            value={etc}
            onChange={onChange}
            type="text"
            placeholder="추가 상세설명을 작성해주세요."
            maxLength={10000}
          />
        </EachDetail>
      </EachContainer>

      <EachContainer>
        <EachTitle>주의사항 <img src="img/check.png" alt="체크" style={{width:"15px"}} /></EachTitle>
        <EachDetail>
          <DetailArea
            id="notice"
            className="openjoin_input"
            ref={ta2}
            // rows={3}
            style={{height:"77px"}}
            value={notice}
            onChange={onChange}
            type="text"
            placeholder="환불 등 주의사항을 작성해주세요."
            maxLength={10000}
          />
        </EachDetail>
      </EachContainer>

      <EachContainer>
        <EachTitle>
          상품목록 <Notice>작성후 하단의 완료버튼을 눌러주세요</Notice>
         <img src="img/check.png" alt="체크" style={{width:"15px"}} /></EachTitle>
        <SellingItemFactory
          userObj={userObj}
          itemID={itemID}
          click={click}
          setClick={setClick}
          clickid={id}
          id={id}
          setId={setId}
          setClicked={setClicked}
        />
      </EachContainer>
      <div>
        <button className="default_Btn_Right2" onClick={onCancel}>
          취소
        </button>
        <button className="default_Btn_Right2" onClick={onCheckForm}>
          제출
        </button>
      </div>
    </form>
  );
};
export default SellingForm;

const EachDetailwhite = styled.div`
  margin-top: 1px;
  background-color: #fff;
  padding: 0 7px 5px;
  border-radius: 19px;
  border: solid 1px #dedede;
  margin-bottom: 10px;
  font-size: 15px;
`;
