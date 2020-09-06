import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) =>{
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem active link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/">Checkout</NavigationItem>
        </ul>
    )
}

export default NavigationItems;