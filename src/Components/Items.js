import React, { Component } from 'react';
import firebase from '../Config/firebaseintegration';
import { connect } from 'react-redux';
import Rbg from '../Assets/Wallpaper/rbg.jpg';
import { fastFood, chinees, bbq, drinks } from '../Components/categoriesData';
import Order from '../Components/Order'
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { renderToStaticMarkup } from 'react-dom/server';


const SweetAlert = withSwalInstance(swal);

class Items extends React.Component {
    constructor() {
        super();
        this.state = {
            fastFoodShow: true,
            chineesShow: true,
            bbqShow: true,
            drinksShow: true,
            condition: "Items for you",
            showAlert: false,
            toBeOrdered: [{ name: "", price: "", picUrl: "" }],
            ordered: {},
        }
        this.ordered = this.ordered.bind(this)
        this.orderFood = this.orderFood.bind(this)
    }
    ordered(){
        this.setState({ showAlert: false });
        console.log(this.state.showAlert)
    
      }
      orderFood(foodName,foodPrice){
        const orderRequest = {
            name: foodName,
            price: foodPrice,
            nameOfRest: this.props.restInfo.name,
            idOfRest: this.props.restInfo.id,
            idOfCustomer: this.props.user.uid,
            nameOfUser: this.props.user.name
        }
        firebase.database().ref("pendingRequests/"+ orderRequest.idOfRest).push(orderRequest).then(()=>{
            this.setState({showAlert:true})
        })
        console.log(orderRequest)
      }
    render() {
        const { restsShow, rests, fastFoodShow, chineesShow, bbqShow, drinksShow, condition, toBeOrdered , showAlert} = this.state;
        console.log(this.props)
        return (
            <div>
                <div>
                    <img src={this.props.restInfo.profilePic} width='70%' height='400px'/>
                    <hr />
                    <h2>{this.props.restInfo.name}</h2>
                    <hr />
                </div>
                <div className={'categoryBtns'}>
                    
                    <button style={{width:"100%"}} onClick={()=>{this.setState({fastFoodShow:true,chineesShow:true,bbqShow:true,drinksShow:true, condition:"Items for you"})}}>All Categories</button>
                    <button onClick={()=>{this.setState({fastFoodShow:true,chineesShow:false,bbqShow:false,drinksShow:false, condition:"Fast Food"})}}>Fast Food</button>
                    <button onClick={()=>{this.setState({fastFoodShow:false,chineesShow:true,bbqShow:false,drinksShow:false, condition:"Chinese"})}}>Chinese</button>
                    <button onClick={()=>{this.setState({fastFoodShow:false,chineesShow:false,bbqShow:true,drinksShow:false, condition:"BBQ"})}}>BBQ</button>
                    <button onClick={()=>{this.setState({fastFoodShow:false,chineesShow:false,bbqShow:false,drinksShow:true, condition:"Drinks"})}}>Drinks</button>
                </div>
                <p style={{textAlign:"left",width:"80%",margin:"10px auto"}}>Food Items</p>
                <p className={"bar"}>{condition}</p>
                <i class='fas fa-sort-down'></i>
                <div className={"categoryData"}>
                    {fastFoodShow && fastFood.map((v, i) => {
                        return <div><div><img src={v.picUrl} width='160px' height='120px' /></div> <p>{v.name}</p><small>Rs: {v.price}</small><button onClick={() => { this.orderFood(v.name,v.price)}}><i class='fa fa-heart-o'></i> Order Now</button></div>
                    })}
                </div>
                <div className={"categoryData"}>
                    {chineesShow && chinees.map((v, i) => {
                        return <div><div><img src={v.picUrl} width='160px' height='120px' /></div> <p>{v.name}</p><small>Rs: {v.price}</small><button onClick={() => {this.orderFood(v.name,v.price) }}><i class='fa fa-heart-o'></i> Order Now</button></div>
                    })}
                </div>
                <div className={"categoryData"}>
                    {bbqShow && bbq.map((v, i) => {
                        return <div><div><img src={v.picUrl} width='160px' height='120px' /></div> <p>{v.name}</p><small>Rs: {v.price}</small><button onClick={() => { this.orderFood(v.name,v.price) }}><i class='fa fa-heart-o'></i> Order Now</button></div>
                    })}
                </div>
                <div className={"categoryData"}>
                    {drinksShow && drinks.map((v, i) => {
                        return <div><div><img src={v.picUrl} width='160px' height='120px' /></div> <p>{v.name}</p><small>Rs: {v.price}</small><button onClick={() => { this.orderFood(v.name,v.price) }}><i class='fa fa-heart-o'></i> Order Now</button></div>
                    })}
                </div>
                <SweetAlert
                    show={showAlert}
                    title={'Thanks for Ordering!'}
                    text={'We will deliever your order as soon as possible. Stay tunned. Note: Rs.50 will be charged for service tax.'}
                    confirmButtonColor={'#ffae42'}
                    onConfirm={() => {this.setState({showAlert:false})}}
                />
            </div>

        )


    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
    }
  }
  
  export default connect(mapStateToProps, null)(Items);