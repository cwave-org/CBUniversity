// Slider는 해당 컴포넌트에서 import해주자
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { StyledSlider } from './StyledSlider';
import { useEffect, useState } from 'react';


const SimpleSlick = () => {
  const [imgs,setImgs]=useState([]);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  useEffect(()=>{
    setImgs([
        {
          id:1,
          src:"img/carr1.png",
          url:"https://flyup-startup.com/sub/invest_status.php"
        },
        {
          id:2,
          src:"img/carr2.png",
          url:"https://instagram.com/cwave_?igshid=YmMyMTA2M2Y="
        }]);
  },[]);
  const onClick=(url)=>{
    console.log(url);
    window.open(url,"_blanck");
  }
  return (
    // <Container>
      <StyledSlider {...sliderSettings}>
        {imgs&&imgs.map((key)=>(
            <img onClick={()=>onClick(key.url)} key={key.id} src={key.src} alt="배너"/>
        ))}
      </StyledSlider>
    // </Container>
  );
};

export default SimpleSlick;
