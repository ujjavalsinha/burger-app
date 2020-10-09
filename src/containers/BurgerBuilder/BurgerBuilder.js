import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import Dictaphone from '../../components/Dictaphone/Dictaphone'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action'
const INGREDIENT_PRICES = {
    salad : 0.5,
    meat : 1.3,
    cheese : 0.4,
    bacon : 0.7
}
class BurgerBuilder extends Component {
    state = { 

        purchasable : false,
        purchasing : false
        
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
        this.setState({purchasing : true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    transcriptHandler = (transcript) => {
        this.setState({answer : transcript})
    }
    purchaseContinueHandler = () =>{
        this.props.history.push({pathname:'/checkout'})
    }
    render() {
        let disabledInfo = {...this.props.ings} 
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        
        
        return ( 
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.props.ings} 
                        cancelorder={this.purchaseCancelHandler}
                        price={this.props.price}
                        continueorder={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients = {this.props.ings}/>
                <BuildControls 
                disableInfo={disabledInfo} 
                deletedIngredient={this.props.onRemoveIngredient} 
                addedIngredient={this.props.onAddIngredient}
                price={this.props.price}
                ingredients={this.props.ings}
                purchasable={this.updatePurchasable(this.props.ings)}
                ordered={this.setPurchasing}/>
                
            </Auxiliary>
         );
    }
}
const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price : state.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient : (ing_name) => dispatch({type : actionTypes.ADD_INGREDIENT,ingredientName : ing_name}),
        onRemoveIngredient : (ing_name) => dispatch({type : actionTypes.REMOVE_INGREDIENT,ingredientName:ing_name})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);