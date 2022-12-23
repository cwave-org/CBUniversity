import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dbService } from "../fbase";
import Item from "../components/Item";
import Excel from "../components/Excel";

const Itemlist = () => {
  const location = useLocation();
  const { buyerindex, filename } = location.state;
  const [lists, setLists] = useState([]);
  const [excellist, setExcelList] = useState([]);
  const [count,setCount]=useState(0);
  const [money,setMoney]=useState(0);
  let navigate = useNavigate();
  let money2=0;
  let count2=0;
  useEffect(() => {
    dbService.collection("joinlist").onSnapshot((snapshot) => {
      setLists([]);
      setExcelList([]);
      snapshot.docs.map((doc) => {
        if (doc.data().randomidx == buyerindex) {
          const myobj = {
            ...doc.data(),
            id: doc.id,
          };
          var excelobj = {
            입금자명: doc.data().account_name,
            입금날짜시간: doc.data().account_date,
            구매총액: doc.data().totalprice,
            환불계좌:doc.data().account_re,
            전화번호:doc.data().phonenumber,
            수령날짜:doc.data().date,
          };
          for (var i=0;i<doc.data().option.length;i++){
            var name = doc.data().optionname[i];
            excelobj[name] = doc.data().option[i];
            //console.log(Number(doc.data().totalprice))
            //console.log(Number(doc.data().option.length))
            //console.log(count2)
            count2=count2+1;
           // console.log(count2)
           // console.log(money2)
          }
          var m=Number(doc.data().totalprice);
          //var m=money;
          m=count;
          money2=money2+Number(doc.data().totalprice);
          setMoney(money2/Number(doc.data().option.length));
          setCount(count2/Number(doc.data().option.length));
          //console.log(money2)
          setLists((prev) => [myobj, ...prev]);
          setExcelList((prev) => [excelobj, ...prev]);
          //location.reload();
          //navigate(`/itemlist`);
        }
      });
    });
  }, []);

  return (
    <>
      {lists.length > 0 ? (
        <div className="container">
          <div className="joinerlist">
            <div className="my_title">💙참여자 목록💙</div>
            <hr />
            <Excel exceldata={excellist} name={filename} />
            <br />
            <div>
              총 참여자 : <b>{count}</b>명 
            </div>
            <div>총 입금금액 : <b>{money}</b>원</div>
            <br/>
            <div style={{ marginBottom: "15px", fontSize: 12 }}>
              <span style={{ width: "10%", float: "right", textAlign: "center" }}>삭제</span>
              <span style={{ width: "10%", float: "right", textAlign: "center" }}>확인</span>
              <span style={{ width: "20%", float: "right" }}>환불계좌</span>
              <span style={{ width: "20%", float: "right" }}>입금자명</span>
              <span style={{ width: "24%", float: "right" }}>입금날짜</span>
              <span style={{ width: "16%", float: "right" }}>입금금액</span>{" "}
            </div>
            <br />
            <div className="joiner_context">
              {lists.map((list) => (
                <Item
                  key={list.id}
                  listObj={list}
                  isBuyer={list.randomidx === buyerindex}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "90%",
            height: "fit-content",
            padding: "10px",
            backgroundColor: " rgb(255, 255, 255)",
            borderRadius: "10px",
            marginTop: "120px",
          }}
        >
          <img width="100%" src="img/no_participation.png" alt="로딩"></img>
        </div>
      )}
    </>
  );
};
export default Itemlist;
