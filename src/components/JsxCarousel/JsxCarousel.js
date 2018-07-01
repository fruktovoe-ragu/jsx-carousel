import React from 'react';
import './JsxCarousel.css';

const Slide = slide =>
    <li>
        <div style={{ background: `url(${slide.url})`, width: '600px', height: '400px' }}/>
    </li>;

export default ({ slides }) =>
    <div className="JsxCarousel">
        <div className="JsxCarousel__carousel">
            <div className="JsxCarousel__active-image">
                <div style={{ background: `url(${slides[0].url})`, width: '600px', height: '400px' }}/>
            </div>
            <ul className="JsxCarousel__list">
                {slides.map(it => <Slide key={it.url} {...it}/>)}
            </ul>
            <div className="JsxCarousel">DESCRIPTION</div>
        </div>
        <div className="JsxCarousel__thumbnails">
            <ul>
                {slides.map(it => <li key={it.thumbnail}>{it.title}</li>)}
            </ul>
        </div>
    </div>;
