import * as actionTypes from '../actions/actionTypes'
import axios from 'axios';

export const purchaseBurgerSuccess = (orderData, order_id) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData : orderData,
        order_id : order_id
    }
}

export const purchaseBurgerFail = () =>{
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
    }
}

export const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('https://burger-project-d9936.firebaseio.com/orders.json?auth='+token,orderData)
        .then(response => {
            
            dispatch(purchaseBurgerSuccess(orderData,response.data.name))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail())
        })
    }
}

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type : actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrdersSuccess = (order) => {
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        order : order
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type : actionTypes.FETCH_ORDERS_FAIL,
        error : error
    }
}

export const fetchOrders = (token,userId) => {
    console.log("TOKEN : ",token)
    return dispatch => {
        dispatch(fetchOrdersStart())
        let orders = []
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
        axios.get('https://burger-project-d9936.firebaseio.com/orders.json'+queryParams)
        .then(res => {
            console.log(res.data)
            for(let key in res.data){
                orders.push({ ...res.data[key], id : key})
            }
            dispatch(fetchOrdersSuccess(orders))
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error))
        })

    }
}