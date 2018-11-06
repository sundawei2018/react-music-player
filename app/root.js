import React from 'react';
import Header from './components/header';
import Progress from './components/progress';

let duration = null;

let Root = React.createClass({
    getInitialState() {
        return {
            progress: '-'
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
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: Math.round(e.jPlayer.status.currentPercentAbsolute)
            });
        });
    },
    componentWillUnMount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    },
    progressChangeHandler(progress) {
        console.log('from root widget', progress);
        $('#player').jPlayer('play', duration * progress);
    },
    render() {
        return (
            <div>
                <Header />
                <Progress
                    progress={this.state.progress}
                    onProgressChange={this.progressChangeHandler}
                >
                </Progress>
            </div>
            
        );
    }
});

export default Root;