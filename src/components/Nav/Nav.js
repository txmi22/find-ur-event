import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import logo from '../logo/Logo.png'
import axios from 'axios';

function Nav(props) {
    return (
        <nav className="nav-wrapper deep-purple darken-4">
            <div className="container">
                <ul className="left">
                    <Link  to="/dashboard" ><img className="web-logo" src={logo} width={130} /></Link>
                </ul>
                    <Link className="sidenav-trigger" data-target="mobile-links" to="/dashboard" ><i className="material-icons">menu</i></Link> 
                <ul className="nav-icons right hide-on-med-and-down">
                    <li  className="logout-icon material-icons" onClick={() => axios.post('auth/logout').then(() => props.history.push('/'))} style={{cursor: 'pointer'}}>input</li>
                </ul>
                <ul className=" nav-icons right hide-on-med-and-down">
                    <i className="material-icons prefix">bookmark</i>
                    <Link className="white-text" to="/bookmarks" >Bookmarks</Link> 
                </ul>
                <ul className="nav-icons right hide-on-med-and-down">
                <i className="material-icons prefix">face</i>
                    <Link to={'/tickets'}>Tickets</Link>
                </ul>
                <ul className="nav-icons right hide-on-med-and-down">
                {/* <i className="material-icons prefix">map</i> */}
                    {/* <Link to={'/map'}>Map</Link> */}
                </ul>
                <ul className="sidenav" id="mobile-links">
                <Link className="deep-purple darken-4" to="/bookmarks" >Bookmarks</Link>
                <Link  className="deep-purple darken-4" to={'/tickets'}>Tickets</Link>
                <li  className="deep-purple darken-4" onClick={() => axios.post('auth/logout').then(() => props.history.push('/'))} style={{cursor: 'pointer'}}>Logout</li>
                </ul>
            </div>
        </nav>
    )
}
export default withRouter(Nav);