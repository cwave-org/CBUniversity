import React, { useEffect, useState, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dbService } from "../fbase";
import styled from "styled-components";

const BuyingForm = ({ userObj }) => {
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [count, setCount] = useState(0);
  const [optionname, setOptionName] = useState([]);
  //   const [max, setMax] = useState(0);
  const [option, setOption] = useState([]);
  const [address, setAddress] = useState("");
  const [account_name, setAccount_name] = useState("");
  const [account_date, setAccount_date] = useState("");
  const [account_re, setAccount_re] = useState("");
  const [items, setItems] = useState([]);
  const [isLodded, setIsLodded] = useState(0);
  const [giving, setGiving] = useState(0);
  const [handout_date, setHandout_date] = useState("");
  const [loading, isLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { detailObj, itemId } = location.state; // 입력 폼 정보 받아오기
  // 해당 상품의 doc Id
  const [total, setTotal] = useState(0);
  const [currentNUm, setCurrentNum] = useState(detailObj.currentNum);

  /*
  //datelist 구버전
  useEffect(() => {
    dbService.doc(`datelist/${detailObj.randomidx}`).onSnapshot((snapshot) => {
      setDates(snapshot.data().data.reverse());
      setIsDateLodded(1);
      for (var i = 0; i < snapshot.data().data.length; i++) {
        setDateOption((current) => [0, ...current]);
      }
    });
  }, []);
  */

  var dates = detailObj.dates;

  useEffect(() => {
    dbService.doc(`itemlist/${detailObj.randomidx}`).onSnapshot((snapshot) => {
      setItems(snapshot.data().data.reverse());
      setIsLodded(1);
      for (var i = 0; i < snapshot.data().data.length; i++) {
        // setOption(option.concat(0));
        setOption((current) => [0, ...current]);
        // setOptionName(optionname.concat([snapshot.data().data[i].itemname]));
        setOptionName((current) => [
          snapshot.data().data[i].itemname,
          ...current,
        ]);
      }
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    isLoading(true);

    const BuyingObj = {
      randomidx: detailObj.randomidx,
      // name: name,
      phonenumber: phonenumber,
      // count: count,
      totalprice: total,
      handout_date: handout_date,
      option: option,
      optionname: optionname,
      // address: address,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      account_date: account_date,
      account_name: account_name,
      account_re: account_re,
      deposit_complete: false,
      deleted: false,
    };

    await dbService.collection("joinlist").add(BuyingObj);
    await dbService
      .doc(`joinlist2/${detailObj.randomidx}`)
      .collection("list")
      .add(BuyingObj);
    const data = items;
    for (var i = 0; i < data.length; i++) {
      data[i].count = 0;
    }

    await dbService.doc(`itemlist/${detailObj.randomidx}`).update({
      data,
    });

    await dbService.doc(`startlist/${itemId}`).update({
      currentNum: currentNUm,
    });

    setName("");
    setPhonenumber("");
    setCount("");
    setOption([]);
    // setSize("");
    setAddress("");
    setAccount_name("");
    setAccount_date("");
    setHandout_date("");
    setAccount_re("");
    navigate("/buying/done", {
      replace: false,
      state: { link: detailObj.link },
    });
    isLoading(false);
  };

  const onCancel = () => {
    navigate(`/selling/detail/${itemId}`, {
      replace: false,
      state: { detailObj: detailObj },
    });
  };

  const onRadioClick = (e) => {
    if (e.target.value === "parcel") {
      setGiving(1);
    } else if (e.target.value === "site") {
      setGiving(2);
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    if (event.target.id === "nameform") {
      setName(value);
    } else if (event.target.id === "phonenumberform") {
      setPhonenumber(value);
    } else if (event.target.id === "countform") {
      setCount(value);
    } else if (event.target.id === "addressform") {
      setAddress(value);
    } else if (event.target.id === "accountnameform") {
      setAccount_name(value);
    } else if (event.target.id === "accountdateform") {
      setAccount_date(value);
    } else if (event.target.id === "accountreform") {
      setAccount_re(value);
    }
  };

  const add = (event, item, i) => {
    event.preventDefault();
    //    if (max + 1 <= 2) {
    setItems([
      ...items.slice(0, i),
      {
        ...items[i],
        count: items[i].count + 1,
        itemTotalCount: items[i].itemTotalCount + 1,
      },
      ...items.slice(i + 1, items.length),
    ]);
    setCurrentNum((current) => current + 1);
    setTotal(total + Number(items[i].price));
    //setMax(max + 1);
    option[i] = option[i] + 1;
    //    } else {
    //      window.alert(`총 ${max}개까지만 구입 가능합니다.`);
    //}
  };

  const minus = (event, item, i) => {
    event.preventDefault();

    if (items[i].count - 1 >= 0) {
      //      if (max - 1 <= 2) {
      setItems([
        ...items.slice(0, i),
        {
          ...items[i],
          count: items[i].count - 1,
          itemTotalCount: items[i].itemTotalCount - 1,
        },
        ...items.slice(i + 1, items.length),
      ]);
      setCurrentNum((current) => current - 1);
      setTotal(total - Number(items[i].price));
      option[i] = option[i] - 1;
      //setMax(max - 1);
      //      } else {
      //        window.alert(`인당 총 ${max}개까지만 구입 가능합니다.`);
      //      }
    } else {
    }
  };

  const handout = (event, date, i) => {
    setHandout_date(date);
  };

  return (
    <div className="openjoin_container">
      {loading && (
        <Load>
          <LoadImg>
            <img src="img/loading.gif" alt="로딩" />
          </LoadImg>
        </Load>
      )}
      <form onSubmit={onSubmit}>
        <p>공구 참여하기</p>
        <EachContainer>
          <EachTitle>✔️ 입금자 명</EachTitle>
          <EachDetail>
            <input
              className="openjoin_input"
              id="accountnameform"
              type="text"
              placeholder="입금자명을 입력해주세요"
              onChange={onChange}
              value={account_name}
              required
            />
          </EachDetail>
        </EachContainer>
        <EachContainer>
          <EachTitle>✔️ 전화번호</EachTitle>
          <EachDetail>
            <input
              className="openjoin_input"
              id="phonenumberform"
              type="tel"
              placeholder="01012345678 형식으로 입력해주세요"
              onChange={onChange}
              value={phonenumber}
              pattern="[0-9]{2,3}[0-9]{3,4}[0-9]{3,4}"
              required
            />
          </EachDetail>
        </EachContainer>
        <EachContainer>
          <EachTitle>✔️ 배송여부</EachTitle>
          <EachDetail>
            <input
              type="radio"
              name="theme"
              value="site"
              onClick={onRadioClick}
            />
            현장배부{" "}
            <input
              type="radio"
              name="theme"
              value="parcel"
              disabled
              onClick={onRadioClick}
            />
            택배배송
          </EachDetail>
        </EachContainer>
        {giving === 0 ? (
          <EachContainer></EachContainer>
        ) : giving === 1 ? (
          <EachContainer>
            <EachTitle>✔️ 집주소</EachTitle>
            <EachDetail>
              <input
                className="openjoin_input"
                id="addressform"
                type="text"
                placeholder="상세주소를 입력하세요"
                onChange={onChange}
                value={address}
              />
            </EachDetail>
          </EachContainer>
        ) : (
          <EachContainer>
            <EachTitle>✔️ 현장배부 날짜</EachTitle>
            <EachDetail>
              {dates
                .slice(0)
                .reverse()
                .map((date, i) => (
                  <SelectNum key={i}>
                    {i + 1}. {date.handout_date}
                    <NumBox>
                      <Btn1
                        onClick={(event) =>
                          handout(event, date.handout_date, i)
                        }
                      >
                        <input
                          type="radio"
                          value={date.handout_date}
                          name="handout_date"
                        />
                      </Btn1>
                    </NumBox>
                  </SelectNum>
                ))}
            </EachDetail>
          </EachContainer>
        )}
        <EachContainer>
          <EachTitle>✔️ 입금 날짜 및 시간</EachTitle>
          <EachDetail>
            <input
              className="openjoin_input"
              id="accountdateform"
              type="datetime-local"
              onChange={onChange}
              value={account_date}
              required
            />
          </EachDetail>
        </EachContainer>
        <EachContainer>
          <EachTitle>✔️ 환불계좌</EachTitle>
          <EachDetail>
            <input
              className="openjoin_input"
              id="accountreform"
              type="text"
              placeholder="(은행/계좌번호/입금주명)을 입력해주세요"
              onChange={onChange}
              value={account_re}
              required
            />
          </EachDetail>
        </EachContainer>
        <EachContainer1>
          <EachTitle>✔️ 구매 수량 및 금액</EachTitle>
          <EachDetail>
            {isLodded &&
              items.map((item, i) => (
                <SelectNum key={i}>
                  {i + 1}. {item.itemname} ( {item.price}원 / 1개 ) <br></br>
                  {item.maxNum == 0 ? (
                    <>
                      <NumBox>
                        <Btn onClick={(event) => minus(event, item, i)}>-</Btn>
                        <Count>{item.count}</Count>
                        <Btn onClick={(event) => add(event, item, i)}>+</Btn>
                      </NumBox>
                    </>
                  ) : (
                    <>
                      <NumBox>
                        <Btn onClick={(event) => minus(event, item, i)}>-</Btn>
                        <Count>{item.count}</Count>
                        <Btn onClick={(event) => add(event, item, i)}>+</Btn>
                      </NumBox>
                    </>
                  )}
                </SelectNum>
              ))}
          </EachDetail>
          <Sum>✨ 총 {total} 원</Sum>
        </EachContainer1>

        {/* <p className="openjoin_que">
        <span>✔️ 수량: </span>
        <input
          className="openjoin_input"
          id="countform"
          type="number"
          placeholder="수량을 입력하세요"
          onChange={onChange}
          value={count}
          required
        />
      </p> */}

        {/* <p className="openjoin_que">
        <span>✔️ 사이즈: </span>
        <input
          className="openjoin_input"
          id="sizeform"
          type="text"
          placeholder="사이즈를 입력하세요"
          onChange={onChange}
          value={size}
          required
        />
      </p> */}
        <div>
          <button className="default_Btn_Right" onClick={onCancel}>
            취소
          </button>
          <button className="default_Btn_Right" type="submit">
            제출
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuyingForm;

const EachContainer = styled.div`
  width: 100%;
  margin: 3px 3px 15px;
`;
const EachContainer1 = styled(EachContainer)`
  margin: 3px 3px 65px;
  position: relative;
`;
const EachTitle = styled.div`
  font-weight: 600;
  position: relative;
`;
const EachDetail = styled.div`
  margin-top: 1px;
`;
const SelectNum = styled.div`
  border-radius: 5px;
  background-color: #f6f6f6;
  margin: 5px 10px 10px;
  padding: 3px 10px 35px;
  position: relative;
`;
const Sum = styled(SelectNum)`
  position: absolute;
  bottom: -55px;
  right: 0;
  font-weight: 600;
  font-size: 19px;
  padding: 3px 10px;
  color: black;
  text-align: center;
`;
const Btn = styled.button`
  background-color: #b6b6b6;
  border-radius: 5px;
  color: #5b5b5b;
  width: 27px;
  font-size: 15px;
`;
const Btn1 = styled(Btn)`
  height: 30px;
`;
const NumBox = styled.div`
  background-color: #b6b6b6;
  position: absolute;
  border-radius: 5px;
  display: flex;
  right: 10px;
`;
const Count = styled.div`
  background-color: #f6f6f6;
  width: 30px;
  text-align: center;
`;

const Load = styled.div`
  width: 100%;
  position: fixed;
  top: 0%;
  left: 0vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
`;
const LoadImg = styled.div`
  position: fixed;
  top: 30vh;
  left: 23%;
  /* width:30%; */
`;
