import { useNavigate } from "react-router-dom";
import React from "react";
import { useLocation } from "react-router-dom";
const Detaillist=()=>{
    const navigate=useNavigate();
    const onJoinlistClick = () => {
        navigate("/buying", { replace: false, state: { detailObj: detailObj } });
    }
    const onShowlistClick = () => {
        navigate("/itemlist", { replace: false, state: { detailObj: detailObj } });
    }

    const location = useLocation();
    const {detailObj}=location.state;

    return(
        <>
            <div>
                <h3>공구 명 : {detailObj.name}</h3>
                <h3>상품 명 : {detailObj.itemname}</h3>
                <h3>가격 : {detailObj.price}</h3>
                <h3>마감기한 : {detailObj.deadline}</h3>
                <h3>기타사항 : {detailObj.etc}</h3>
                <h3>계좌 : {detailObj.account}</h3>
            </div>
            <div>
                <button className="detaillist submit Btn" onClick={onJoinlistClick}>
                    공구 참여하기
                </button>
                <button className="detaillist show Btn" onClick={onShowlistClick}>
                    공구 참여자 목록 보기
                </button>
            </div>
        </> 
    );
};
export default Detaillist;