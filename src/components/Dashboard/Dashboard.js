import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import SearchArea from '../SearchArea/SearchArea';
import EventList from '../EventList/EventList';
import EventInfo from '../EventInfo/EventInfo';
import Pagination from '../Pagination/Pagination';
import { connect } from 'react-redux'
import { eventAdded } from '../../redux/eventReducer'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';
import '../../App.css';
import 'react-toastify/dist/ReactToastify.css';
toast.configure(); 

class Dashboard extends Component {
  constructor(){
    super()
    this.state = {
      events: [],
      loading: false,
      currentPage: 1,
      eventsPerPage: 20,
      searchTerm: '',
      currentEvent: null,
      bookmarkedEvents: [],
      event_id: 0,
      name: '',
      date: '',
      image: ''
    
    }
    this.apiKey = process.env.REACT_APP_API
  }

  componentDidMount = () => {
    this.getEvents();
    
  }

    getEvents = async () => {
      await axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${this.apiKey}&query=${this.state.searchTerm}&page=${this.state.currentPage}&size=500&locale=*&countryCode=US`)
    .then(res => {
      console.log(res.data._embedded.events)
      this.setState({ events: res.data._embedded.events, loading: false })
      
    
    }, [])
  } 

  addEvent = (singleEvent) => {
    console.log(singleEvent)
    let body = {
      id: singleEvent.event_id,
      event_id: singleEvent.id,
      name: singleEvent.name, 
      date: singleEvent.dates.start.localDate,
      image: singleEvent.images[0].url
    }
    
    axios.post('/api/bookmarks', body).then(res => {
    this.setState({bookmarkedEvents: res.data})
    this.props.eventAdded(res.data)
    toast('🥴🤙 Bookmarked!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true
      })});
  }

  handleChange = (e) => {
    this.setState({searchTerm: e.target.value})
  }

  viewEventInfo = (id) => {
    const filteredEvent = this.state.events.filter(event => event.id === id)
    console.log(filteredEvent)

    const newCurrentEvent = filteredEvent.length > 0 ? filteredEvent[0] : null

    this.setState({currentEvent : newCurrentEvent})

  }

  closeEventInfo = () => {
    this.setState({ currentEvent: null})
  }

  indexOfLastEvent = this.currentPage * this.eventsPerPage
  indexOfFirstEvent = this.indexOfLastEvent - this.eventsPerPage

  currentEvent = (indexOfFirstEvent, index) => {
    this.events.slice(indexOfFirstEvent, index)
  }

  paginate = (pageNumbers) => this.currentPage(pageNumbers)

  render() {
    
    return (
      <div className="dashboard">
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
      
      <Nav />
        {this.state.currentEvent === null ?  
        <div>
          <SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
          <EventList viewEventInfo={this.viewEventInfo} events={this.state.events} searchTerm={this.state.searchTerm} addEvent={this.addEvent} loading={this.loading}/>
          <Pagination eventsPerPage={this.eventsPerPage} paginate={this.paginate} />
          {/* totalEvents={events.length} */}
        </div> : 
        <EventInfo currentEvent={this.state.currentEvent} closeEventInfo={this.closeEventInfo}/>}
    
      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
    bookmarkedEvents: state.eventReducer.bookmarkedEvents, 
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps, { eventAdded })(Dashboard);
