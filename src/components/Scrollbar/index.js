import { useState, useRef } from 'react'

import Draggable from "react-draggable"

import styles from "./scrolbar.module.css"

const Scrollbar = () => {
    const outerScrollbarRef = useRef(null)
    const innerScrollbarRef = useRef(null)

    const [scrollBounds, setScrollBounds] = useState({
        top: 0,
        bottom: 0,
    })

    const handleScrollbar = (e, data) => {
        const outerScrollBarPosition = outerScrollbarRef.current.getBoundingClientRect().x
        const outerScrollBarHeight = innerScrollbarRef.current.getBoundingClientRect().height
        setScrollBounds({
            top: 0,
            bottom: outerScrollBarHeight,
        })
        window.scrollTo(0, outerScrollBarPosition + data.y)
      }


    return (
        <div ref={outerScrollbarRef} className={`${styles.scrollbar_outer}`}>
            <Draggable
                axis="y"
                onDrag={handleScrollbar}
                nodeRef={innerScrollbarRef}
                bounds={{top: scrollBounds.top}}
            >
                <div ref={innerScrollbarRef} className={`${styles.scrollbar_inner}`}></div>
            </Draggable>
        </div>
    )
}

export default Scrollbar