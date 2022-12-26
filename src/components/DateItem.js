import React, { useEffect, useState } from "react";
import styled from "styled-components";

const EachBox = styled.div`
  background-color: #f6f6f6;
  margin: 0px;
  border: 2px solid #f6f6f6;
  border-radius: 10px;
  /* border-bottom: ; */
`;

const DateItem = (props) => {
  const [handout_date, setHandout_date] = useState("");

  useEffect(() => {
    props.setData([
      {
        id: props.id,
        handout_date: handout_date,
      },
      ...props.data,
    ]);
  }, [handout_date, props]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    if (event.target.id === "handoutdateform") {
      setHandout_date(value);
    }
  };

  return (
    <>
      <EachBox>
        <input
          className="openjoin_input"
          id="handoutdateform"
          onChange={onChange}
          value={handout_date}
          placeholder="2023년 1월 6일 15시~20시"
          required
        />
      </EachBox>
    </>
  );
};

export default DateItem;
