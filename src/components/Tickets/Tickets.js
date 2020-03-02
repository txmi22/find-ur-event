import React, {useState, useEffect} from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';

function Tickets (props) {
    const [tickets, setTickets] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        getTickets()
    }, [count])

    const getTickets = () => {
        
        axios.get('/api/tickets')
        .then(res => setTickets(res.data))
    }


    return (
        
        <div>
            <Nav />
        <div className="ticket-container-one">
            <div className="row">
                <div className="card-container">
                    <div className="card">
                        {tickets.map(event => (
                            <div className="card" style={{width: "50vw" , margin: "auto"}} key={event.id}>
                            <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4"><i className="material-icons right">more_vert</i></span>
                                <img className="display"src={event.image} alt="Card" style={{width: "600px", height: '250px'}}/>
                                <i className="material-icons">confirmation_number</i>
                                <p> {event.name} </p>
                                <p> Date: {event.date}</p>
                            </div>
                         <div className="card-reveal deep-purple lighten-3">
                            <span className="card-title grey-text text-darken-4">{event.name}<i className="material-icons right">close</i></span>
                            <p>Congrats, you're going to this event!</p>
                            <span className="material-icons" onClick={() => props.viewEventInfo(event.id)} style={{cursor: "pointer"}}>info</span>
                            <p>{count}</p>
                            <p>How many are going?</p>
                            <button onClick={() => setCount(count + 1)}>+</button>
                            <button onClick={() => setCount(count - 1)}>-</button>
                          </div>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Tickets;