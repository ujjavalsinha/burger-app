import React, {Component} from 'react';
import { Route } from 'react-router-dom'
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
    componentDidMount(){
        const query = new URLSearchParams(this.props.history.location.search)
        let ingredients = {}
        let price = 0
        for(let param of query.entries()){
            if(param[0]==='price'){
                price = param[1]
            }
            else{
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients : ingredients,totalPrice : price})
    }
    checkoutCancelHandler = () =>{
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace({pathname:'/checkout/contact-data'})
    }
    render(){
        
        return(
            <div>
                <CheckoutSummary checkoutCancelled={this.checkoutCancelHandler} checkoutContinued={this.checkoutContinueHandler} ingredients={this.props.ings}/>
                <Route 
                path={this.props.match.url + '/contact-data'} 
                component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients
    }
}
export default connect(mapStateToProps)(Checkout)