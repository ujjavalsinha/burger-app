import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'
import { Link } from 'react-router-dom'
const NavigationItems = (props) =>{
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem active exact link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
    )
}

export default NavigationItems;