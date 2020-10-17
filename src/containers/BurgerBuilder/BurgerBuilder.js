import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'

class BurgerBuilder extends Component {
    state = { 

        purchasable : false,
        purchasing : false,
        error : false
        
     }
    componentDidMount(){
        this.props.fetchIngredients()
    }
    updatePurchasable=(new_ingredients)=>{
        const ingredients = {...new_ingredients}
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum,el)=>{
                return sum+el
            })
        return sum>0
    }

    setPurchasing = () =>{
        if(this.props.isAuth){
            this.setState({purchasing : true})
        }
        else{
            this.props.history.push({pathname : '/auth'})
            this.props.onSetAuthRedirectPath('/checkout')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    transcriptHandler = (transcript) => {
        this.setState({answer : transcript})
    }
    purchaseContinueHandler = () =>{
        this.props.onPurchaseInit()
        this.props.history.push({pathname:'/checkout'})
    }
    render() {
        let disabledInfo = {...this.props.ings} 
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        
        let burger = this.props.error ? <h2>Unable to fetch data from server</h2> : <Spinner/>
        let orderSummary = null
        if(this.props.ings){
            burger = (
                <Auxiliary>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls 
                    disableInfo={disabledInfo} 
                    deletedIngredient={this.props.onRemoveIngredient} 
                    addedIngredient={this.props.onAddIngredient}
                    price={this.props.price}
                    ingredients={this.props.ings}
                    isAuth = {this.props.isAuth}
                    purchasable={this.updatePurchasable(this.props.ings)}
                    ordered={this.setPurchasing}/>
                </Auxiliary>)
            orderSummary = (
                <OrderSummary 
                        ingredients={this.props.ings} 
                        cancelorder={this.purchaseCancelHandler}
                        price={this.props.price}
                        continueorder={this.purchaseContinueHandler}/>
            )
        }
        return ( 
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
                
            </Auxiliary>
         );
    }
}
const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.price,
        error : state.burgerBuilder.error,
        isAuth : state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient : (ing_name) => dispatch(actions.addIngredient(ing_name)),
        onRemoveIngredient : (ing_name) => dispatch(actions.removeIngredient(ing_name)),
        fetchIngredients : () => dispatch(actions.initIngredients()),
        onPurchaseInit : ()=> dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);