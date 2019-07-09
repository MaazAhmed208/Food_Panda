import React, { Component } from 'react';
import firebase from '../Config/firebaseintegration';
import { update_user } from '../store/action';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(){
        super();
        
        this.state = {
            email:'',
            password:"",
            loggedIn: false,
        }
        this.login = this.login.bind(this);
    }
    login(){
      this.setState({loggedIn:true})
      const {email,password} = this.state;
      firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
        let uid = firebase.auth().currentUser.uid;
        firebase.database().ref("users/"+uid).once("value").then((data)=>{
          const user = data.val();
          this.props.store_user(user);
          if(user.type==="user"){
            this.props.history.push(`/userpanel/${user.name}`)
          }
          else{
            this.props.history.push(`/restaurentpanel/${user.name}`)
          }
        }).catch((err)=>{
          this.setState({loggedIn:false})
        })
      }).catch((err)=>{
        this.setState({loggedIn:false})
      })
      
    }
    render() {
      return (
        <div>
          <div className='homeBase'><p><i class='fab fa-foursquare' style={{color:"#ffae42"}}></i>ood Panda</p></div>
          <p><i class='fas fa-sort-down'></i></p>  
          <div className={"loginFromArea"}>
            <form action='JavaScrip:void(0)' onSubmit={this.login}>
            
                <div style={{margin:'20px'}}>
                

                <div class="form-group">
                  <label for="email">Email address:</label>
                  <input placeholder='Example@abc.com' onChange={(e)=>{this.setState({email:e.target.value})}} required type="email" class="form-control"/>
                </div>

                

                <div class="form-group">
                  <label for="password">Password:</label>
                  <input type="password" class="form-control"  type='password' placeholder='Password'onChange={(e)=>{this.setState({password:e.target.value})}} required />
                </div>

               
                </div>
                <small style={{textAlign:"left",cursor:'pointer'}} onClick={()=>{this.props.history.push(`/usersignup`)}}>Don't have an account? Sign up</small>
                <hr />
                {this.state.loggedIn && <p className={'loader'}><i class="fa fa-gear fa-spin"></i> Please Wait</p>}
                <button className={'loginBtn btn btn-success'}>Login</button>
                
            </form>
          </div>    
        </div>
          
      )
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        store_user: (user) => dispatch(update_user(user))
    }
}

export default connect(null, mapDispatchToProps)(Login);