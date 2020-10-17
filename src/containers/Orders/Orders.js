import React, {Component} from 'react';
import Order from '../../components/Order/Order'
import axios from 'axios'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
class Orders extends Component {
    componentDidMount(){
       this.props.onFetchOrders(this.props.token,this.props.userId)
    }
    
    render(){
        return (

           <div>
               {!this.props.loading && this.props.orders ?
               this.props.orders.map(ig => <Order key={ig.id} ingredients={ig.ingredients} price={ig.totalPrice}/>):
               <Spinner/>
                }
           </div>
            
        )
    }
}
const mapStateToProps=state=>{
    return {
        orders : state.orders.orders,
        loading : state.orders.loading,
        token : state.auth.idToken,
        userId : state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Orders)