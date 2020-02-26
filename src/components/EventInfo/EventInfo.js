import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { eventAdded } from '../../redux/eventReducer'
import axios from 'axios';

class EventInfo extends Component  {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            date: '',
            image: '',
            venue: '',
            city: '',
            state: ''
        }
    }


    onToken = token => {
        let body = {
            amount: this.props.currentEvent.priceRanges[0].min*100,
            user_id: this.props.user.id, 
            event_id: this.props.currentEvent.id,
            name: this.props.currentEvent.name,
            date: this.props.currentEvent.dates.start.localDate,
            image: this.props.currentEvent.images[0].url,
            venue: this.props.currentEvent._embedded.venues[0].name,
            city: this.props.currentEvent._embedded.venues[0].city.name,
            state: this.props.currentEvent._embedded.venues[0].state.name
        }

        axios.post('/api/payment', {token, ...body})
        .then( () => {
            this.props.eventAdded()
            toast.success('🤑 Purchased!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true
      }
        )})
        .catch(err => console.log(err))
    }

    render(){
        return (
            <div className="container">
                <ToastContainer 
            position="top-right"
            autoClose={1200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover/>
                         <div className="close-container row" onClick={this.props.closeEventInfo} style={{cursor: "pointer", paddingTop: 50}}>
                        <i className=" close-event fas fa-arrow-left deep-purple darken-4 waves-effect large left"></i>     
                        </div>
                        <div className=" row">
                            <div className=" main-display col s12 m4">
                            { this.props.currentEvent.image === null ? <img src={"https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"} alt="Card" style={{width: "100%", height: 360}} /> : 
                            <img className="display" src={this.props.currentEvent.images[0].url} alt="Card" style={{width: 800, height: 250}}/>}
                            </div>
                        <div className="col s6 m8">
                            <div className="evinfo-container">
                            <p> "{this.props.currentEvent.name}" </p>
                            <p> Genre: {this.props.currentEvent.classifications[0].genre.name}</p>
                            <i className="material-icons">event</i>
                            <p> Date: {this.props.currentEvent.dates.start.localDate}</p>
                            <p> Address: </p>
                            <p> {this.props.currentEvent._embedded.venues[0].address.line1}, {this.props.currentEvent._embedded.venues[0].city.name}, {this.props.currentEvent._embedded.venues[0].state.name}</p>
                            <p> Description: {this.props.currentEvent.info}</p>
                            <p> {this.props.currentEvent.priceRanges ? <p> Price ${this.props.currentEvent.priceRanges[0].min}-$$ </p>  : 'Free'}</p>
                                <i className="material-icons">local_atm</i>
                            <StripeCheckout
                        name='Find UR Event'
                        description='Please enter 424'
                        stripeKey={process.env.REACT_APP_STRIPE_KEY}
                        token={this.onToken} 
                        amount={this.props.currentEvent.priceRanges[0].min*100 ? 
                            this.props.currentEvent.priceRanges[0].min*100 : <p>Free event</p>}
                        panelLabel='Submit Payment'
                        allowRememberMe={true}
                        billingAddress={false}
                        zipCode={false} />
                            <p> Venue: "{this.props.currentEvent._embedded.venues[0].name}" </p>
                        
                            </div>
                            <div className="evinfo2-container">
                            {this.props.currentEvent._embedded.venues ? 
                            <img className="display-two" src={this.props.currentEvent._embedded.venues[0].images[0].url} alt="Card" style={{width: 400, height: 250}}/>
                            : 
                            <p> No image available </p>
                            }
                            <img className="display-three" src={this.props.currentEvent.seatmap.staticUrl} accept="" alt="Card" style={{width: "100%", height: 360}}/>
                            </div>
                        </div> 
                    </div>
                    
                 </div>
            )
      }
}

function mapStateToProps (state) {
    return { 
        user: state.userReducer.user
    }

  }

export default connect(mapStateToProps, {eventAdded})(EventInfo);