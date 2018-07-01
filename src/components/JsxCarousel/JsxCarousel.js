import React, { Component, PureComponent } from 'react';
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
                <Thumbnail key={it.thumbnail} onSelect={() => onSelect(ix)} isActive={ix === active} slide={it}/>
            )
        }
    </ul>
);

class Slides extends PureComponent {

    handleTouchStart = (touchStartEvent) => {
        touchStartEvent.preventDefault();
        this.props.onMotionStart(touchStartEvent.targetTouches[0].clientX);
    };

    handleTouchMove = (touchMoveEvent) => {
        this.props.onHandleMove(touchMoveEvent.targetTouches[0].clientX);
    };

    handleTouchEnd = () => {
        this.props.onHandleEnd();
    };

    handleMouseDown = (mouseDownEvent) => {
        mouseDownEvent.preventDefault();
        this.props.onMotionStart(mouseDownEvent.clientX);
    };

    handleMouseMove = (mouseMoveEvent) => {
        this.props.onHandleMove(mouseMoveEvent.clientX);
    };

    handleMouseUp = () => {
        this.props.onHandleEnd();
    };

    handleMouseLeave = () => this.handleMouseUp();

    render() {
        const { slides, ix } = this.props;
        const list = [...slides];

        for (let i = 0; i <= ix; i++) {
            const img = list.shift();
            list.push(img);
        }

        return (
            <div className="JsxCarousel__slider__slides__inner"
                 style={{ left: `${this.props.left}px` }}
                 onTouchStart={this.handleTouchStart}
                 onTouchMove={this.handleTouchMove}
                 onTouchEnd={this.handleTouchEnd}
                 onMouseDown={this.handleMouseDown}
                 onMouseMove={this.handleMouseMove}
                 onMouseUp={this.handleMouseUp}
                 onMouseLeave={this.handleMouseLeave}
            >{list.map(it => <Slide key={it.url} {...it}/>)}</div>
        );
    }

}

class JsxCarousel extends Component {
    state = {
        current: 0,
        left: 0,
        initialX: null,
        inMotion: false,
        timer: null
    };

    onSlideSelect = ix => this.setState({ current: ix });

    handleMotionStart = (clientX) => {
        this.setState({ initialX: clientX, inMotion: true });
    };

    handleMove = (clientX) => {
        if ( !this.state.inMotion )
            return;

        this.setState(state => ({ left: clientX - state.initialX }));
    };

    handleEnd = () => {
        if ( !this.state.inMotion )
            return;

        if ( this.state.left < 200 )
            this.animateToNext();
        else
            this.setState({
                initialX: null,
                inMotion: false,
                timer: window.setInterval(this.animateSlidingToZero, 33)
            });
    };

    animateToNext = () => {
        const next = (this.state.current + 1) % this.props.slides.length;
        this.setState(state => ({ current: next, left: 0, initialX: null, inMotion: false }));
    };

    animateSlidingToZero = () => {
        const velocity = 30;
        let left = this.state.left;

        if ( left > (-1 * velocity) && left < velocity ) {
            window.clearInterval(this.state.timer);
            this.setState({ left: 0, timer: null });
            return;
        }

        if ( left < 0.01 )
            left += velocity;
        else
            left -= velocity;

        this.setState({ left });
    };

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
                            <Slides slides={slides}
                                    ix={this.state.current}
                                    left={this.state.left}
                                    onMotionStart={this.handleMotionStart}
                                    onHandleMove={this.handleMove}
                                    onHandleEnd={this.handleEnd}/>
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
