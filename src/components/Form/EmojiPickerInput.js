import InputEmoji from "react-input-emoji"
import { AiOutlineSend } from 'react-icons/ai';

import "./emojipickerinput.css"

const EmojiPickerInput =props => {
    const {
        seInput,
        input,
        placeholder,
        handleSubmit,
    }= props

    // const handleInputChange = e => seInput(e.target.value)

    return (
        <div className="app_input_emoji">
            <div>
                <InputEmoji 
                    value={input}
                    onChange={seInput}
                    cleanOnEnter
                    // onEnter={handleOnEnter}
                    placeholder={placeholder}
                />
            </div>
            <div>
                <button onClick={handleSubmit}>
                    <span><AiOutlineSend /> </span>
                    <span>Send</span>
                </button>
            </div>
        </div>
    )
}

export default EmojiPickerInput