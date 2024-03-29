import React, {useState} from "react";
import PropTypes from "prop-types";
import Slick from 'react-slick';
import {CloseBtn, Global, Header, ImgWrapper, Indicator, Overlay, SlickWrapper} from "./styles";
import {backUrl} from "../../config/config";



const ImagesZoom = ({images, onClose}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <Overlay>
            <Global/>
            <div>
                <Header>
                    <h1>상세 이미지</h1>
                    <CloseBtn onClick={onClose}>X</CloseBtn>
                </Header>
                <SlickWrapper>
                    <div>
                        <Slick
                            initialSlide={0}
                            beforeChange={(slide) => setCurrentSlide(slide)}
                            infinite
                            arrows={false}
                            slidesToShow={1}
                            slidesToScroll={1}
                        >
                            {images.map((v) => (
                                <ImgWrapper key={v.src}>
                                    <img src={`${v.src.replace(/\/thumb\//, '/original/')}`} alt={v.src}/>
                                </ImgWrapper>
                            ))}
                        </Slick>
                        <Indicator>
                            <div>
                                {currentSlide + 1}
                                {' '}
                                /
                                {images.length}
                            </div>
                        </Indicator>
                    </div>
                </SlickWrapper>
            </div>
        </Overlay>
    );

}

ImagesZoom.prototype = {
    images : PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ImagesZoom;