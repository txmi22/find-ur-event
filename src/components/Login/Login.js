import React, { Component } from 'react'
import axios from 'axios'; 
import { getUser } from '../../redux/userReducer';
import { connect } from 'react-redux';
import logo from '../logo/Logo.png'

export class Login extends Component {
    constructor(){
        super(); 

        this.state = {
            email: '',
            f_name: '',
            l_name: '', 
            password: '',
            loginToggle: true, 
        }
        this.login = this.login.bind(this); 
        this.register = this.register.bind(this);
    }

    toggleLogin = () => {
        this.setState({
            loginToggle: !this.state.loginToggle
        })
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
          [name]: value
      })
    }

    login () {
        const { email, password } = this.state;
         axios.post('/auth/login', {email, password})
        .then(res => {
            this.props.getUser(res.data); 
            this.props.history.push('/dashboard');
        })
        .catch(err => console.log(err));
    }

    async register () {
        const {email, f_name, l_name, password} = this.state
        axios.post('/auth/register', {email, f_name, l_name, password})
        .then(res => this.props.getUser(res.data))
        .catch(err => console.log(err)); 
    }

    render(){
        const {email, password, loginToggle} = this.state
        return(
            <div className='main-container' style={{backgroundImage: "url("+"https://miro.medium.com/max/5600/1*wjfSFGr3OzwP4I6nQ12EvQ.png"+")", 
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                             }} >
                <div className='login-container' style={{margin: 'auto'}} >
                    {loginToggle ?
                            <div className="row login" >
                                <div className="col s12 14 offset-14">
                                    <div className="card-action white-text">
                                        <img src={logo} width={180} />
                                        <h3>Welcome to Find UR Event</h3>
                                    </div>
                                    <div className="card-content white-text">

                                    <div className="form-field ">
                                    <i class="material-icons left">mail</i>
                                            <label className="white-text left">Email</label>
                                            <input onChange={e => this.handleChange(e)} type="text" name="email" value={this.state.email} ></input>
                                        </div>

                                        <div className="form-field center-align">
                                        <i class="material-icons left">keyboard</i>
                                            <label className="white-text left">Password</label>
                                            <input onChange={e => this.handleChange(e)} type="password" name="password" value={this.state.password} ></input>
                                        </div>
                                    </div>
                                        <button className="waves-effect btn-small deep-purple darken-4" onClick={this.toggleLogin}>Get Started</button>
                                </div>
                            </div> :
                            <div className="white-text">
                            <div className="col">
                                <div className="card-action">
                                <img src={logo} width={180} />
                                    <h3>Welcome to Find UR Event</h3>
                                </div>
                                <div className="card-content">

                                <div className="form-field">
                                <i class="material-icons left">mail</i>
                                        <label className="white-text left">Email</label>
                                        <input onChange={e => this.handleChange(e)} type="text" name="email" value={this.state.email} ></input>
                                    </div>
                                    <div className="form-field">
                                        <i class="material-icons left">account_circle</i>
                                        <label className="white-text left">First Name</label>
                                        <input onChange={e => this.handleChange(e)} type="text" name="f_name" value={this.state.f_name}></input>
                                    </div>
                                    <div className="form-field">

                                        <label className="white-text left">Last Name</label>
                                        <input onChange={e => this.handleChange(e)} type="text" name="l_name" value={this.state.l_name}></input>
                                    </div>

                                    <div className="form-field center-align">
                                    <i class="material-icons left">keyboard</i>
                                        <label className="white-text left">Password</label>
                                        <input onChange={e => this.handleChange(e)} type="text" name="password" value={this.state.password} data-length="10"></input>
                                    </div>
                                </div>
                            </div>
                            <button className=" waves-effect btn-small deep-purple darken-4" style={{margin: "10px"}} onClick={this.toggleLogin}>Sign In</button> 
                        </div>
                    }
                     {loginToggle ? ( 
                        <button className=" waves-effect btn-large deep-purple darken-4" onClick={() => this.login(email, password)}>Log In</button>) 
                     : (<button className=" waves-effect btn-large deep-purple darken-4" onClick={() => this.register()}>Sign Up</button>
                    )} 
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => state; 

export default connect(mapStateToProps, {getUser})(Login);