import React , { Component } from 'react';
import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import axios from 'axios'
import Spinner from '../../../components/UI/Spinner/Spinner'
import * as actionTypes from '../../../store/actions/actionTypes'
import * as orderActions from '../../../store/actions/index'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
const emailRegExp = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
class ContactData extends Component{
    state = {
        orderForm : {
            name :{
                elementType :'input',
                elementConfig : {
                    type : "text",
                    placeholder : "Your Name"
                },
                validation : {
                    required : true
                },
                valid : false,
                value : '',
                touched : false
            },
            street :{
                elementType :'input',
                elementConfig : {
                    type : "text",
                    placeholder : "Street"
                },
                validation : {
                    required : true
                },
                valid : false,
                value : '',
                touched : false
            },
            zipcode :{
                elementType :'input',
                elementConfig : {
                    type : "text",
                    placeholder : "Zip Code"
                },
                value : '',
                validation : {
                    required : true,
                    maxLength : 5,
                    minLength : 5
                },
                valid : false,
                touched : false
            },
            country :{
                elementType :'input',
                elementConfig : {
                    type : "text",
                    placeholder : "Country"
                },
                validation : {
                    required : true,
                    
                },
                valid : false,
                value : '',
                touched : false
            },
            email :{
                elementType :'input',
                elementConfig : {
                    type : "text",
                    placeholder : "Your E-Mail"
                },
                validation : {
                    required : true,
                    emailType : true
                },
                valid : false,
                value : '',
                touched : false
            },
            deliveryMethod :{
                elementType :'select',
                elementConfig : {
                    options : [
                        {value : 'fastest', displayValue : "Fastest"},
                        {value : "cheapest",displayValue : "Cheapest"}
                    ]
                },
                value : 'fastest',
                validation : {

                },
                valid : true
            },

        },
        formIsValid : false,
    }
    orderHandler = (e) =>{
        e.preventDefault()
        let formData = {}
        for ( let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            orderData : formData,
            ingredients : this.props.ings,
            totalPrice : this.props.price,
            userId : this.props.userId
        }
        this.props.orderSubmit(order,this.props.token)
        
    }

    checkValidity = (value,rules) =>{
        let isValid = true
        if(rules.required){
            isValid = value!=='' && isValid
        }
        if(rules.minLength){
            isValid = value.length>=5 && isValid
        }
        if(rules.maxLength){
            isValid = value.length<=5 && isValid
        }
        if(rules.emailType){
            console.log(emailRegExp.test(value))
            isValid = emailRegExp.test(value) && isValid
        }
        return isValid
    }
    inputChangeHandler = (event,inputIdentifier) => {
        const updatedOrderForm = { ... this.state.orderForm}
        let updatedFormElement = {...this.state.orderForm[inputIdentifier]}
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement
        let formIsValid = true
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        console.log(updatedOrderForm)
        this.setState({orderForm : updatedOrderForm,formIsValid : formIsValid})
    }
    render() {
        let formElements = [];
        for ( let formElement in this.state.orderForm){
            formElements.push({
                id : formElement,
                config : this.state.orderForm[formElement]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(formElement => {
                    return <Input key={formElement.id}
                        formElementName={formElement.id} 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangeHandler(event,formElement.id)}
                        />
                })}  
                <Button disabled={!this.state.formIsValid} clicked={(e)=>this.orderHandler(e)} btnType="Success" >ORDER</Button>
            </form>
        )
        if(this.props.loading === true){
            form = (
                <div>
                    <Spinner/>
                </div>
                
            )
        }
        return(
            <div className={styles.ContactData}>
                <h2>Enter your Contact Data</h2>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.price,
        loading : state.orders.loading,
        token : state.auth.idToken,
        userId : state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderSubmit : (orderData,token) => dispatch(orderActions.purchaseBurger(orderData,token)) 
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ContactData)