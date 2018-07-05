import React, { PureComponent } from 'react';

class Slides extends PureComponent {

    render() {
        const { slides, ix } = this.props;
        const list = [...slides];

        for (let i = 0; i <= ix; i++) {
            const img = list.shift();
            list.push(img);
        }

        return (
            <div className="JsxCarousel__slider__slides JsxCarousel__slide-container"
                 style={{ transform: `translateX(${this.props.transform}px)` }}
                 onClick={this.props.onClick}
            >{list.map(it => it.el)}</div>
        );
    }

}

export default Slides;
