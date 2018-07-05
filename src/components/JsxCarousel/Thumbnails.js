import React from 'react';

const Thumbnail = ({ slide, isActive, onSelect }) => (
    <li className={'JsxCarousel__thumbnail' + (isActive ? ' active' : '')}>
        <div
          className="JsxCarousel__thumbnail-img"
          style=a{{ backgroundImage: `url(${slide.thumbnail})` }}
          onClick={onSelect}
        />
        <div className={"JsxCarousel__thumbnail-text"}>{slide.description.team}</div>
    </li>
);

const Thumbnails = ({ slides, active, onSelect }) => (
    <ul>
        {
            slides.map((it, ix) =>
                <Thumbnail key={it.thumbnail} onSelect={() => onSelect(ix)} isActive={ix === active} slide={it}/>
            )
        }
    </ul>
);

export default props =>
    <div className="JsxCarousel__thumbnails">
        <Thumbnails {...props}/>
    </div>;
