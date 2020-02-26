import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import axios from 'axios';


function Bookmarks () {
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
       getBookmarks()
    }, [])

    const getBookmarks = () => {
        axios.get('/api/bookmarks')
        .then(res => setBookmarks(res.data))
    }

    const deleteEvent = event_id => {
        axios.delete(`/api/bookmark/${event_id}`)
        .then(() => getBookmarks())
    } 

    return (
        <div className="bookmark-container">
        <div className="">
            <Nav />
            {bookmarks.map(event => (
                <div className="col s12 m6">
                    <div className="card-bkmrk">
                <div className="card-container-one white-text" key={event.id}>
                    <img className="event-image" src={event.image} alt="Card" style={{width: "800px", height: '250px'}}/>
                    <div className="info-container text-wrap">
                     <p> {event.name} </p>
                     <p> Date: {event.date}</p>
                     {/* <p> {event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.name}</p> */}
                    </div>
                    <ul>
                        <div className="trash">
                    <button className=" btn-floating material-icons waves-effect deep-purple darken-4" onClick={()=> deleteEvent(event.event_id)} style={{cursor: "pointer"}}>delete</button>
                        </div>
                    </ul>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
    )
}

// function mapStateToProps (state) {
//     return {
//         bookmarkedEvents: state.eventReducer.bookmarkedEvents
//     }
// }

export default connect()(Bookmarks);
