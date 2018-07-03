import React, { Component } from 'react';
import './JsxCarousel.css';
import Thumbnails from './Thumbnails';
import Description from './Description';
import Slide from './Slide';
import ActiveSlide from './ActiveSlide';
import Slides from './Slides';

const PrevSlide = ({ slide }) => <div className="JsxCarousel__slider__prev">{slide.el}</div>;

class JsxCarousel extends Component {
    velocity = 40;
    width = 10;
    state = {
        current: 0,
        left: 0,
        initialX: null,
        inMotion: false,
        animation: null
    };

    componentWillMount() {
        this.props.slides.forEach(it => it.el = <Slide key={it.url} {...it}/>)
    }

    componentDidMount() {
        const slide = document.querySelector('.JsxCarousel__Slide');
        this.width = slide.offsetWidth;
    }

    onSlideSelect = ix => this.setState({
        current: (ix === 0 ? this.props.slides.length - 1 : ix - 1)
    }, this.animateToNext);

    handleMotionStart = (clientX) => {
        this.timeout = window.setTimeout(() => this.setState({ initialX: clientX, inMotion: true }), 300);
    };

    handleMove = (clientX) => {
        if (!this.state.inMotion)
            return;

        const x = clientX - this.state.initialX;
        this.setState({ left: x });

        if (x < (-.8 * this.width))
            this.handleEnd();
    };

    handleEnd = () => {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (!this.state.inMotion)
            return;

        if (this.state.left < (this.width * -.3))
            this.animateToNext();
        else if (this.state.left > (this.width * .3))
            this.animateToPrev();
        else
            this.setState({
                initialX: null,
                inMotion: false,
                animation: window.requestAnimationFrame(this.animateTo(0, this.state.current))
            });
    };

    animateToNext = () => {
        const next = (this.state.current + 1) % this.props.slides.length;
        this.setState({
            animation: window.requestAnimationFrame(this.animateTo((-1 * this.width), next))
        });
    };

    animateToPrev = () => {
        const prev = this.state.current === 0 ? this.props.slides.length - 1 : this.state.current - 1;
        this.setState({
            animation: window.requestAnimationFrame(this.animateTo(this.width, prev))
        });
    };

    animateTo = (dst, next, t = 900) => {
        return () => {
            let { left } = this.state;
            const path = Math.abs(dst - left);

            if (this.state.animation)
                window.cancelAnimationFrame(this.state.animation);

            if (dst === left || path < this.velocity || (dst < 0 && left <= dst) || (dst > 0 && left >= dst)) {
                this.setState({
                    current: next,
                    left: 0,
                    initialX: null,
                    inMotion: false,
                    animation: null
                });
                return;
            }

            let velocity = (this.velocity * path / t) * (left > dst ? -1 : 1);

            this.setState({
                left: left + velocity,
                inMotion: false,
                initialX: null,
                animation: window.requestAnimationFrame(this.animateTo(dst, next, ++t))
            });
        }
    };

    handleTouchStart = (touchStartEvent) => {
        touchStartEvent.preventDefault();
        this.handleMotionStart(touchStartEvent.targetTouches[0].clientX);
    };

    handleTouchMove = (touchMoveEvent) => {
        this.handleMove(touchMoveEvent.targetTouches[0].clientX);
    };

    handleTouchEnd = () => {
        this.handleEnd();
    };

    handleMouseDown = (mouseDownEvent) => {
        mouseDownEvent.preventDefault();
        this.handleMotionStart(mouseDownEvent.clientX);
    };

    handleMouseMove = (mouseMoveEvent) => {
        this.handleMove(mouseMoveEvent.clientX);
    };

    handleMouseUp = () => {
        this.handleEnd();
    };

    handleMouseLeave = () => this.handleMouseUp();

    render() {
        const { slides } = this.props;
        const { current, left } = this.state;
        const selected = slides[current];
        const prev = slides[current === 0 ? slides.length - 1 : current - 1];

        return (
            <div className="JsxCarousel">
                <div className="JsxCarousel__wrapper">
                    <div className="JsxCarousel__slider"
                         onTouchStart={this.handleTouchStart}
                         onTouchMove={this.handleTouchMove}
                         onTouchEnd={this.handleTouchEnd}
                         onMouseDown={this.handleMouseDown}
                         onMouseMove={this.handleMouseMove}
                         onMouseUp={this.handleMouseUp}
                         onMouseLeave={this.handleMouseLeave}
                    >
                        <PrevSlide slide={prev}/>
                        <ActiveSlide slide={selected} transform={left}/>
                        <Slides slides={slides} ix={current} transform={left} onClick={this.animateToNext}/>
                    </div>
                    <Description slide={selected}/>
                </div>
                <Thumbnails slides={slides} active={current} onSelect={ix => this.animateTo(-1 * this.width, ix)()}/>
            </div>
        );
    }

}

export default JsxCarousel;