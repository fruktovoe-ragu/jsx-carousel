import React, { Component } from 'react';
import './App.css';
import JsxCarousel from './components/JsxCarousel/JsxCarousel';

const slides = [
    {
        url: 'https://www.popsci.com/sites/popsci.com/files/styles/655_1x_/public/images/2018/03/senna.jpg?itok=4dsvu7gl&fc=50,50',
        thumbnail: 'https://www.popsci.com/sites/popsci.com/files/styles/655_1x_/public/images/2018/03/senna.jpg?itok=4dsvu7gl&fc=50,50',
        description: {
            leftTitle: 'Team',
            team: 'car 1',
            rightTitle: 'App',
            appName: 'app 1',
            descriptionText: 'app... app.. app'
        },
    },
    {
        url: 'https://apollo2.dl.playstation.net/cdn/EP0700/CUSA04932_00/FREE_CONTENTm3RVj9ffBRTN5fAuBOr0/PREVIEW_SCREENSHOT1_488862.jpg',
        thumbnail: 'https://apollo2.dl.playstation.net/cdn/EP0700/CUSA04932_00/FREE_CONTENTm3RVj9ffBRTN5fAuBOr0/PREVIEW_SCREENSHOT1_488862.jpg',
        description: {
            leftTitle: 'Team',
            team: 'car 2',
            rightTitle: 'App',
            appName: 'app 2',
            descriptionText: 'app... app.. app'
        },
    },
    {
        url: 'https://apollo2.dl.playstation.net/cdn/EP0700/CUSA04932_00/FREE_CONTENTM8KBV6c0da80qa0xNWEp/PREVIEW_SCREENSHOT3_488862.jpg',
        thumbnail: 'https://apollo2.dl.playstation.net/cdn/EP0700/CUSA04932_00/FREE_CONTENTM8KBV6c0da80qa0xNWEp/PREVIEW_SCREENSHOT3_488862.jpg',
        description: {
            leftTitle: 'Team',
            team: 'car 3',
            rightTitle: 'App',
            appName: 'app 3',
            descriptionText: 'app... app.. app'
        },
    },
    {
        url: 'https://apollo2.dl.playstation.net/cdn/EP0700/CUSA04932_00/FREE_CONTENTWSsDL20KF3hEakHcJ3D5/PREVIEW_SCREENSHOT6_488862.jpg',
        thumbnail: 'https://apollo2.dl.playstation.net/cdn/EP0700/CUSA04932_00/FREE_CONTENTWSsDL20KF3hEakHcJ3D5/PREVIEW_SCREENSHOT6_488862.jpg',
        description: {
            leftTitle: 'Team',
            team: 'car 4',
            rightTitle: 'App',
            appName: 'app 4',
            descriptionText: 'app... app.. app'
        },
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
