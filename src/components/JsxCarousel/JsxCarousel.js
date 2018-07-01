import React, { Component } from 'react';
import './JsxCarousel.css';

const Slide = slide => (
    <div
        className="JsxCarousel__Slide"
        style={{ background: `url(${slide.url})` }}/>);

const Thumbnail = ({ slide, isActive, onSelect }) => (
    <li className={'JsxCarousel__thumbnails__thumbnail' + (isActive ? ' active' : '')}>
        <div style={{ background: `url(${slide.thumbnail})` }}
             onClick={onSelect}/>
    </li>
);

const Thumbnails = ({ slides, active, onSelect }) => (
    <ul>
        {
            slides.map((it, ix) =>
                <Thumbnail key={it.thumbnail} onSelect={() => onSelect(ix)} isActive={ix === active} slide={it}/>)
        }
    </ul>);

class JsxCarousel extends Component {
    state = {
        current: 0
    };

    onSlideSelect = ix => this.setState({ current: ix });

    render() {
        const { slides } = this.props;

        return (
            <div className="JsxCarousel">
                <div className="JsxCarousel__wrapper">
                    <div className="JsxCarousel__slider">
                        <div className="JsxCarousel__slider__active">
                            <Slide {...slides[this.state.current]}/>
                        </div>
                        <div className="JsxCarousel__slider__slides">
                            {slides.map(it => <Slide key={it.url} {...it}/>)}
                        </div>
                    </div>
                    <div className="JsxCarousel">DESCRIPTION</div>
                </div>
                <div className="JsxCarousel__thumbnails">
                    <Thumbnails slides={slides} active={this.state.current} onSelect={this.onSlideSelect}/>
                </div>
            </div>
        );
    }

}

export default JsxCarousel;
