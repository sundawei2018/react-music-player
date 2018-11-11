import React from 'react';
import './musiclistitem.less';
import PubSub from 'pubsub-js';

class MusicListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteHandler(item, event) {
        event.stopPropagation();
        PubSub.publish('DEL_MUSIC', item);
    }

    playMusic(item, event) {
        PubSub.publish('PLAY_MUSIC', item);
    }

    render() {
        let item = this.props.data;
        return (
            <li className=
                {`components-musiclistitem row${this.props.focus ? ' focus' : ''}`}
                onClick={this.playMusic.bind(this, item)}
            >
                <p><strong>{item.title}</strong> - {item.artist}</p>
                <p className="-col-auto delete" onClick={this.deleteHandler.bind(this, item)}></p>
            </li>
        );
    }
}

export default MusicListItem;