import React from 'react'

import styles from "./tab.module.css"

const Container = props => {
    return (
        <div className={`flex ${styles.tab} ${props.className}`}>
            {props.children}
        </div>
    )
}

const Item = props => {
    const {
        eventKey,
        tab,
        setTab,
    } = props

    const handleTab = () => {
        setTab(eventKey)
    }

    return (
        <div onClick={handleTab} className={`${styles.tab_item}  ${tab === eventKey && styles.tab_active}`}>{props.children} </div>
    )
}

const Tab = {
    Item,
    Container,
}

export default Tab