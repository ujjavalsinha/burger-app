import React , { Component } from 'react';
import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import axios from 'axios'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component{
    state = {
        name : '',
        email : '',
        street : '',
        postal_code : '',
        loading : false
    }
    orderHandler = (e) =>{
        e.preventDefault()
        this.setState({loading : true})
        const order = {
            ingredients : this.props.ingredients,
            customer : {
                name : "Ujjaval",
                email : 'ujjaval@sinha.com',
                address : {
                    postal_code : '501158',
                    street : '12'
                }
            },
            totalPrice : this.props.price

        }
        axios.post('https://react-my-burger-b7aaa.firebaseio.com//orders.json',order)
        .then(response => {
            console.log(response)
            this.setState({loading : false})
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(error)
        })
    }
    render() {
        let form = (
            <form>
                    <input type="text" name="name" placeholder="Your Name"></input>
                    <input type="email" name="email" placeholder="Your Email"></input>
                    <input type="text" name="postalcode" placeholder="Postal Code"></input>
                    <input type="text" name="street" placeholder="Street"></input>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        )
        if(this.state.loading === true){
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

export default ContactData