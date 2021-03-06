import React from 'react';
import {connect} from 'react-redux';
import {LoginUser, updateStatus} from '../actions/index'
import '../styles/login.css'

class Login extends React.Component{

    state= {
        username: '',
        password: ''
    }

    handleUsername = (event) =>{
        this.setState({username:event.target.value}) 
    }

    handlePassword = (event) =>{
        this.setState({password:event.target.value}) 
    }

    handleLogin = () =>{
        if (this.state.username === '' || this.state.password === ''){
            this.props.updateStatus("Please Enter the Credentials to Login")
        }
        else{
            this.props.login("LOGIN",this.state.username,this.state.password)
        }
    }

    handleSignup = () =>{
        if (this.state.username === '' || this.state.password === ''){
            this.props.updateStatus("Please Enter the Credentials to SignUp")
        }
        else{
            this.props.login("SIGNUP",this.state.username,this.state.password)
        }
    }

    componentDidUpdate(){
        if (this.props.loginData.status === 'Login Successful' && this.props){
            console.log(this.props.history)
            this.props.history.push('/home')
        }
    }
    
    renderTemplate(){
      return  <div className= 'login-sub-container'>
                <div className='login-form'>
                    <div className='login-name'>
                        <label>Username: </label>
                        <input type='text' onChange={this.handleUsername} value={this.state.username}></input>
                    </div>
                    <div className='login-password'>
                        <label>Password: </label>
                        <input type='text' onChange={this.handlePassword} value={this.state.password}></input>
                    </div>
                </div>
                <div className='login-control'>
                    <div className='loggin'>
                        <button onClick={this.handleLogin}>Login</button>
                    </div>
                    <div className='signup'>
                        <button onClick={this.handleSignup}>SignUp</button>
                    </div>
                </div>
                <div className = 'login-message'>
                    <h5>{this.props.loginData && this.props.loginData.status?
                    this.props.loginData.status
                    :null}</h5>
                </div>
            </div>
    }

    render(){
        return(
            <div className='login-main-container'>
                {this.renderTemplate()}
            </div>
        )
    }
}

function MapStateToProps(state){
    return{
        loginData: state.Reducer
    }
}

function MapDispatchToProps(dispatch){
    return{
        login: (type,name,password) => dispatch(LoginUser(type,name,password)),
        updateStatus: (status) => dispatch(updateStatus(status)),
    } 
}

export default connect(MapStateToProps,MapDispatchToProps)(Login);