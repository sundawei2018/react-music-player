import React from 'react';
import Header from './components/header';
import Player from './page/player';
import {MUSIC_LIST} from './config/musiclist';
import MusicList from '.page/musiclist';

let Root = React.createClass({
    getInitialState() {
        return {
            list: MusicList,
            currentMusicItem: MUSIC_LIST[0]
        }
    },
    componentDidMount() {
        $('#player').jPlayer({
            ready: function() {
                $(this).jPlayer('setMedia', {
                    mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%A3%8E%E7%BB%A7%E7%BB%AD%E5%90%B9.mp3'
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
    },
    componentWillUnMount() {
    },
    render() {
        return (
            <div>
                <Header />
                <MusicList
                    // currentSelected={this.state.currentMusicItem} 
                    // ml={this.state.list}   
                >

                </MusicList>
            </div>
        );
    }
    
});

export default Root;