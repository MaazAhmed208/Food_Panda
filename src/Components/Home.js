import React, { Component } from 'react';
import Wall from '../Assets/Wallpaper/cover3.jpg'
class Home extends Component {
  render() {
    return (
      <div>
        <div className='homeBase'><p><i class='fab fa-foursquare' style={{color:"#ffae42"}}></i>ood Panda</p></div>
          <p><i class='fas fa-sort-down'></i></p>  
            <img src={Wall} className={'wallpaper'} />
        <div className={'homeContent'}>
            {/* <h3>food delivers!</h3> */}
            <p><i class='fas fa-quote-left'></i> You can't just eat good food. You've got to talk about it too. And you've got to talk about it to somebody who understands that kind of food.   <i class='fas fa-quote-right'></i></p>
            <p><i class='fas fa-sort-down'></i></p>            
            <button className={'LoginButton btn btn-outline-primary'} onClick={()=>{this.props.history.push(`/login`)}}> LOGIN</button>
            <br/>
            <br/>
            <button className={'btn btn-outline-primary'} onClick={()=>{this.props.history.push(`/usersignup`)}}> SIGN UP AS USER</button>
            <br/>
            <br/>
            <button className={'btn btn-outline-primary'} onClick={()=>{this.props.history.push(`/restaurentsignup`)}}> SIGN UP AS RESTAURENT</button>
        </div>
            <p style={{margin:"20px auto;"}}>@Copyrights 2018-19. All Rights Reserved.</p>
      </div>
    )
  }
}

export default Home;