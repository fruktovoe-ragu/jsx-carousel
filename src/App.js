import React, { Component } from 'react';
import './App.css';
import JsxCarousel from './components/JsxCarousel/JsxCarousel';

const slides = [
    {
        url: 'images/car1.jpg',
        thumbnail: 'images/car1.jpg',
        description: {
            leftTitle: 'Team',
            team: 'car 1',
            rightTitle: 'App',
            appName: 'app 1',
            descriptionText: 'app... app.. app'
        },
    },
    {
        url: 'images/car2.jpg',
        thumbnail: 'images/car2.jpg',
        description: {
            leftTitle: 'Team',
            team: 'car 2',
            rightTitle: 'App',
            appName: 'app 2',
            descriptionText: 'app... app.. app'
        },
    },
    {
        url: 'images/car3.jpg',
        thumbnail: 'images/car3.jpg',
        description: {
            leftTitle: 'Team',
            team: 'car 3',
            rightTitle: 'App',
            appName: 'app 3',
            descriptionText: 'app... app.. app'
        },
    },
    {
        url: 'images/car4.jpg',
        thumbnail: 'images/car4.jpg',
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
