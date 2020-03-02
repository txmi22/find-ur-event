// import React, { useState, useRef, useEffect } from 'react';
// import useSwr from 'swr';
// import { connect } from 'react-redux';
// import GoogleMapReact from 'google-map-react';
// import useSupercluster from 'use-supercluster';
// import logo from '../logo/Logo.png';
// import React, {Component} from 'react';
// import Nav from '../Nav/Nav';
// import axios from 'axios';

// const fetcher = (...args) => fetch(...args).then(response => response.json());

// const Marker = ({children}) => children;

// function Map(props) {
//   //1) map setup
//   const mapRef = useRef();
//   const [events, setEvents] = useState([]);
//   const [zoom, setZoom] = useState(10);
//   const [bounds, setBounds] = useState(null);

//   useEffect(() => {
//     getMappedEvents()
//  }, [])
//   //2) load and format data
//   const getMappedEvents = () => {
//     axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_API}&size=500&locale=*&countryCode=US`)
//     .then(res => setEvents(res.data))
//   } 
//   const {data, error} = useSwr(getMappedEvents, {fetcher});
//   const event = data && !error ? data : [];
//   const points = events.map(event => ({
//     type: "event",
//     properties: {
//       cluster: false,
//       eventId: event.id,
//       genre: event.classifications[0].genre.name
//     },
//     geometry: { type: "Point", coordinates: [parseFloat(event.location.longitude), parseFloat(event.location.latitude)]}
//   }))

//   //3) get clusters
//   const {clusters} = useSupercluster({
//     points,
//     bounds,
//     zoom,
//     options: {radius: 75, maxZoom: 20} 
//   })

//   console.log(events)
//   //4) render map

//   return (
//   <div style={{ height: "100vh", width: "100%" }}>
//     <GoogleMapReact 
//     bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_KEY}}
//     defaultCenter={{lat: 34.05310 , lng: -118.2649 }}
//     defaultZoom={10}
//     yesIWantToUseGoogleMapApiInternals
//     onGoogleApiLoaded={({ map }) => {
//     mapRef.current = map;
//       }}
//       onChange={({zoom, bounds}) => {
//         setZoom(zoom);
//         setBounds([
//           bounds.nw.lng,
//           bounds.se.lat,
//           bounds.se.lng,
//           bounds.nw.lat
//         ])
//       }}
//     >

//       {clusters.map(cluster => {
//         const [longitude, latitude] = cluster.geometry.coordinates;
//         const {
//           cluster: isCluster, 
//           point_count: pointCount
//         } = cluster.properties;

//         if (isCluster) {
//           return (
//             <Marker key={cluster.id} lat={latitude} lng={longitude}>
//               <div className="cluster-marker">
//                 {pointCount}
//                 </div>
//             </Marker>
//           )
//         }
        
//           return (
//             <Marker
//             key={cluster.properties.eventId}
//             lat={latitude}
//             lng={longitude}
//             >
//               <button className="event-marker">
//               <img src={logo} width={'25px'} alt="event marker"/>
//               </button>
//               </Marker>
//           );
//       }) }
//     </GoogleMapReact>
//   </div>
//   );
// }

// export default connect()(Map);





const AnyReactComponent = ({ text }) =>(
<div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
}}>
    {text}
</div>
); 

class Map extends Component {
    static defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33,
          key: process.env.REACT_APP_GOOGLE_KEY
        },
        zoom: 11
      };
    
  
    
    render() {
        return (
            
            <div style={{ height: '100vh', width: '100%'}}>
        <Nav />
        <GoogleMapReact
          bootstrapURLKeys={this.props.key}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          
          >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
            />
        </GoogleMapReact>
      </div>
    );
}
}

export default Map;