import React from 'react';
import './header.less';

class Header extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="component-header row">
                <img src="/static/images/logo.png" width="40" alt="" className="-col-auto"></img> 
                <h1 className="caption">React Music Player</h1>  
            </div>
        );
    }
}

export default Header;