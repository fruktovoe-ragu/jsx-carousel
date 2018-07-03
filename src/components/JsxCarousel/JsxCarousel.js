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
        timer: null
    };

    componentWillMount() {
        this.props.slides.forEach(it => it.el = <Slide key={it.url} {...it}/>)
    }

    componentDidMount() {
        const slide = document.querySelector('.JsxCarousel__Slide');
        this.width = slide.offsetWidth;
    }

    onSlideSelect = ix => this.setState({ current: ix });

    handleMotionStart = (clientX) => {
        this.setState({ initialX: clientX, inMotion: true });
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
                timer: window.setInterval(this.animateSlidingToZero, 33)
            });
    };

    animateToNext = () => {
        const next = (this.state.current + 1) % this.props.slides.length;
        window.requestAnimationFrame(this.animateTo((-1 * this.width), next));
    };

    animateToPrev = () => {
        const prev = this.state.current === 0 ? this.props.slides.length - 1 : this.state.current - 1;
        window.requestAnimationFrame(this.animateTo(this.width, prev));
    };

    animateSlidingToZero = () => {
        let { left, timer } = this.state;

        if (left > (-1 * this.velocity) && left < this.velocity) {
            window.clearInterval(timer);
            this.setState({ left: 0, timer: null });
            return;
        }

        if (left < 0.01)
            left += this.velocity;
        else
            left -= this.velocity;

        this.setState({ left });
    };

    animateTo = (dst, next) => {
        return () => {
            let { left } = this.state;

            if (left <= dst) {
                this.setState({
                    current: next,
                    left: 0,
                    initialX: null,
                    inMotion: false
                });
                return;
            }

            this.setState({
                left: left - this.velocity,
                inMotion: false,
                initialX: null
            }, () => window.requestAnimationFrame(this.animateTo(dst, next)));
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
                <Thumbnails slides={slides} active={current} onSelect={this.onSlideSelect}/>
            </div>
        );
    }

}

export default JsxCarousel;