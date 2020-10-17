import React from 'react';
import styles from './Toolbar.module.css'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggler from '../Sidedrawer/DraweToggler/DrawerToggler'

const Toolbar = (props) =>{
    return(
        <header className={styles.Toolbar}>
            <DrawerToggler clicked={props.toggleSidedrawer}/>
            <div className={styles.Logo}>
                <Logo/>
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    )
}

export default Toolbar;