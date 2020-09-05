import React from 'react';
import styles from './BuildControl.module.css'

const BuildControl = (props) => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button 
                onClick={props.added} 
                className={styles.Less}>More
            </button>
            <button 
                onClick={props.deleted} 
                className={styles.More} 
                disabled={props.disabled}>Less
            </button>
        </div>
    )
}
export default BuildControl;