import React, { Component } from 'react';
import './App.css';
import JsxCarousel from './components/JsxCarousel/JsxCarousel';

const slides = [
    {
        url: 'https://www.popsci.com/sites/popsci.com/files/styles/655_1x_/public/images/2018/03/senna.jpg?itok=4dsvu7gl&fc=50,50',
        thumbnail: 'https://www.popsci.com/sites/popsci.com/files/styles/655_1x_/public/images/2018/03/senna.jpg?itok=4dsvu7gl&fc=50,50',
        title: 'car 1',
    },
    {
        url: 'https://apollo2.dl.playstation.net/cdn/EP0700/CUSA04932_00/FREE_CONTENTm3RVj9ffBRTN5fAuBOr0/PREVIEW_SCREENSHOT1_488862.jpg',
        thumbnail: 'https://apollo2.dl.playstation.net/cdn/EP0700/CUSA04932_00/FREE_CONTENTm3RVj9ffBRTN5fAuBOr0/PREVIEW_SCREENSHOT1_488862.jpg',
        title: 'car 2',
    },
    {
        url: 'https://apollo2.dl.playstation.net/cdn/EP0700/CUSA04932_00/FREE_CONTENTM8KBV6c0da80qa0xNWEp/PREVIEW_SCREENSHOT3_488862.jpg',
        thumbnail: 'https://apollo2.dl.playstation.net/cdn/EP0700/CUSA04932_00/FREE_CONTENTM8KBV6c0da80qa0xNWEp/PREVIEW_SCREENSHOT3_488862.jpg',
        title: 'car 3',
    },
    {
        url: 'https://apollo2.dl.playstation.net/cdn/EP0700/CUSA04932_00/FREE_CONTENTWSsDL20KF3hEakHcJ3D5/PREVIEW_SCREENSHOT6_488862.jpg',
        thumbnail: 'https://apollo2.dl.playstation.net/cdn/EP0700/CUSA04932_00/FREE_CONTENTWSsDL20KF3hEakHcJ3D5/PREVIEW_SCREENSHOT6_488862.jpg',
        title: 'car 4',
    }
];

class App extends Component {
    render() {
        return (
            <div className="App">
                <JsxCarousel slides={slides}/>
            </div>
        );
    }
}

export default App;
