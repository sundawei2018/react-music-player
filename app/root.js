import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { MUSIC_LIST } from './config/songs';
import { randomRange } from './utils/util';
import PubSub from 'pubsub-js';

import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musiclist';

class Root extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            musicList: MUSIC_LIST,
            currentMusicItem: {},
            repeatType: 'cycle'
        }
    }

    componentDidMount() {
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window',
            userStateClassSkin: true
        });

        this.playMusic(this.state.musicList[0]);

        PubSub.subscribe('PLAY_MUSIC', (msg, item) => {
            this.playMusic(item);
        });

        PubSub.subscribe('DEL_MUSIC', (msg, item) => {
            this.setState({
                musicList: this.state.musicList.filter((music) => {
                    return music !== item;
                })
            });
        });

        PubSub.subscribe('PLAY_NEXT', () => {
            this.playNext();
        });

        PubSub.subscribe('PLAY_PREV', () => {
            this.playNext('prev');
        });

        let repeatList = ['cycle', 'once', 'random'];

        PubSub.subscribe('CHANGE_REPEAT', () => {
            let index = repeatList.indexOf(this.state.repeatType);
            index = (index + 1) % repeatList.length;
            this.setState({
                repeatType: repeatList[index]
            });
        });
    }

    playWhenEnd() {
        if (this.state.repeatType === 'random') {
            let index = this.findMusicIndex(this.state.currentMusicItem);
            let randomIndex = randomRange(0, this.state.musicList - 1);
            while (randomIndex === index) {
                randomIndex = randomRange(0, this.state.musicList - 1);
            }
            this.playMusic(this.state.musicList[randomIndex]);
        }
        else if (this.state.repeatType === 'once') {
            this.playMusic(this.state.currentMusicItem);
        }
        else {
            this.playNext();
        }
    }

    playNext(type = 'next') {
        let index = this.findMusicIndex(this.state.currentMusicItem);
        if (type === 'next') {
            index = (index + 1) % this.state.musicList.length;
        }
        else {
            index = (index + this.state.musicList.length - 1) % this.state.musicList.length;
        }
        let musicItem = this.state.musicList[index];
        this.setState({
            currentMusicItem: musicItem
        });
        this.playMusic(musicItem);
    }

    findMusicIndex(music) {
        let index = this.state.musicList.indexOf(music);
        return Math.max(0, index);
    }

    playMusic(item) {
        $('#player').jPlayer('setMedia', {
            mp3: item.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: item
        });
    }

    componentWillUnMount() {
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('DEL_MUSIC');
        PubSub.unsubscribe('CHANGE_REPEAT');
        PubSub.unsubscribe('PLAY_NEXT');
        PubSub.unsubscribe('PLAY_PREV');
    }

    render() {
        const Home = () => (
            <Player
                currentSelected = {this.state.musicList}
                repeatType = {this.state.repeatType}
            >
            </Player>
        );

        const Test = () => (
            <h1>Test</h1>
        );

        const Another = () => (
            <h1>Another</h1>
        );

        return (
            <HashRouter>
                <div className="container">
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        {/* <Route path="/list" component={MusicList}></Route> */}
                    </Switch>
                </div>
                {/* <Switch>
                    <Route exact path="/" component={Test}></Route>
                    <Route path="/another" component={Another}></Route>
                </Switch> */}
                
            </HashRouter>
        );
    }
}

export default Root;