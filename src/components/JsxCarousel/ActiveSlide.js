import React from 'react';

export default ({ slide, transform }) => (
    <div className="JsxCarousel__slider__active"
         style={{ transform: `translateX(${transform}px)` }}
    >{slide.el}</div>
);
