import React, {Component} from 'react';
import Order from '../../components/Order/Order'
import axios from 'axios'
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component {
    state = {
        orders : [],
        loading : true
    }
    componentDidMount(){
        let orders = []
        axios.get('https://react-my-burger-b7aaa.firebaseio.com/orders.json')
        .then(res => {
            console.log(res.data)
            for(let key in res.data){
                orders.push({ ...res.data[key], id : key})
            }
            this.setState({loading : false})
            this.setState({orders : orders})
        })
    }
    render(){
        
        return (

           <div>
               {!this.state.loading ?
               this.state.orders.map(ig => <Order key={ig.id} ingredients={ig.ingredients} price={ig.totalPrice}/>)
                : <Spinner/>}
           </div>
            
        )
    }
}

export default Orders