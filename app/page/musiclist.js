import React from 'react';
import MusicListItem from '../components/musiclistitem';

class MusicList extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        let Items = null;
        if (this.props.musicList) {
            Items = this.props.musicList.map((item) => {
                return (
                    <MusicListItem
                        focus={item === this.props.currentSelected}
                        key={item.id}
                        data={item}
                    >
                        {item.title}
                    </MusicListItem>
                );
            });
        }
        return (
            <ul>
                { Items }
            </ul>
        );
    }
}

export default MusicList;