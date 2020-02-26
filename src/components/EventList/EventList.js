import React from 'react';

function EventList (props) {
    if(props.loading){
        return<h1>Loading</h1>
    }
// if(props.events[0]){
//     console.dir(props.events[0]._embedded.venues[0].city.name)
// }
    return (
        <div className="event-container">
            <div className="row">
                <div className="col s12">{
                        props.searchTerm === '' ? null : 
                        props.events.filter( e =>  e._embedded.venues[0].state.name.toLowerCase().includes(props.searchTerm.toLowerCase()) || e._embedded.venues[0].city.name.toLowerCase().includes(props.searchTerm.toLowerCase())).map(event => 
                            <div className=" image-container col s12 m6 l3" key={event.id} >
                            <div className="card">
                                <div className="card-image waves-effect waves-block waves-light" onClick={() => props.viewEventInfo(event.id)}>
                                    {
                                        event.images === null ? <img src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt="card" style={{ width: "100%", height: 250}} ></img> : <img src={event.images[0].url} alt="card" style={{ width: "100%", height: 250}}/>
                                    }
                                </div>
                                <div className="card-container">
                                    <span className="card-title">{event.name}</span>
                                    <div>
                                        <button className="btn-floating fab waves-effect waves-light deep-purple darken-4 right"><i className="material-icons" onClick={() => props.viewEventInfo(event.id)} style={{cursor: "pointer"}}>info</i></button>
                                        <button className="btn-floating fab waves-effect waves-light deep-purple darken-4 right"><i className="material-icons" onClick={()=> props.addEvent(event)} style={{cursor: "pointer"}}>favorite</i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default EventList;

