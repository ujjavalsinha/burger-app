import React, {Component} from 'react';
import { Route,Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux';
class Checkout extends Component{
    state = {
        ingredients : {
            salad : 1,
            meat : 1,
            cheese : 1,
            bacon : 1
        },
        totalPrice : 0
    }
    checkoutCancelHandler = () =>{
        this.props.history.goBack()
    }
    checkoutContinueHandler = () => {
        this.props.history.replace({pathname:'/checkout/contact-data'})
    }
    render(){
        let purchased = null
        let checkoutSummary = (
            <div>
                <CheckoutSummary checkoutCancelled={this.checkoutCancelHandler} checkoutContinued={this.checkoutContinueHandler} ingredients={this.props.ings}/>
                <Route 
                path={this.props.match.url + '/contact-data'} 
                component={ContactData}/>
            </div>)
        if(!this.props.ings){
            console.log("INSDE IF not props.ings in checkout")
            checkoutSummary = <Redirect to='/'/>
            
        }
        purchased = this.props.purchased ? <Redirect to='/'/> : null
        return (
            <div>
                {purchased}
                {checkoutSummary}
            </div>)
            
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        purchased : state.orders.purchased
    }
}
export default connect(mapStateToProps)(Checkout)