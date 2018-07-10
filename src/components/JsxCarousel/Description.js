import React from 'react';

export default ({ slide }) => (
   <div className="JsxCarousel__description grid">
    <div className="grid-3-5 JsxCarousel__description-team">
      <div className="JsxCarousel__description-title">{slide.description.leftTitle}</div>
      <div className="JsxCarousel__description-name">{slide.description.team}</div>
    </div>
    <div className="grid-2-5 JsxCarousel__description-app">
      <div className="JsxCarousel__description-title">{slide.description.rightTitle}</div>
      <div className="JsxCarousel__description-name">{slide.description.appName}</div>
      <div className="JsxCarousel__description-desc">{slide.description.descriptionText}</div>
    </div>
  </div>
);
