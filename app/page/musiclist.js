import React from 'react';

let MusicList = React.createClass({
    render() {
        let listEle = null;
        console.log(ml);
        listEle = this.props.ml.map((item) => {
            return <li key={item.id}>{item.title}</li>
        });
        return (
            <ul>
                { listEle }
            </ul>
        );
    }
});

export default MusicList;