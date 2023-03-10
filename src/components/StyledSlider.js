import Slider from "react-slick";
import styled from "styled-components";

export const StyledSlider = styled(Slider)`
  height: auto; //슬라이드 컨테이너 영역
  overflow: hidden;

  .slick-list {
    // 부모
    height: 100%;
    margin: 0 -10px;
    box-sizing: border-box;
  }

  .slick-slide > div {
    // 자식 안에 div
    margin: 10px 5px;
    margin-bottom: 12px;
    box-sizing: border-box;
  }

  // dots
  .slick-dots {
    left: 50%;
    bottom: 10px;
    width: auto;
    font-size: 3px;
    padding: 2px 12px;
    margin-bottom: 5px;
    /* background-color: #fff; */
    border-radius: 10.5px;
    z-index: 10;
    transform: translate(-50%, 0);

    li {
      width: 5px;
      height: 5px;
      margin: 5px;

      &:last-of-type {
        margin-left: 6px;
      }

      button {
        width: 100%;
        height: 100%;
        padding: 0;

        &::before {
          width: 5px;
          height: 5px;
          position: static;
          top: auto;
          left: auto;
          right: auto;
          color: #fff;
        }
      }
    }
  }
`;
