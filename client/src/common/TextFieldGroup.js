import React from "react";
import classnames from 'classnames';
import PropTypes from 'prop-types';
import MaskedInput from 'react-maskedinput'
const TextFieldGroup = ({
    value,
    name,
    placeholder,
    error,
    onChange,
    type
})=>{

    return (
        <div className="form-field">
            <label htmlFor={name}> {placeholder}</label>
            {name==="phone"&&(<MaskedInput mask="+1 (111) 111 1111" type={type} size="17" value={value} onChange={onChange} name={name} placeholder={placeholder} className={classnames("input", {"is-error": error}) }/>)}
            {name!=="phone"&&(<input type={type} value={value} onChange={onChange} name={name} placeholder={placeholder} className={classnames("input", {"is-error": error}) } />)}
            {error&&(<span className="input-msg--error">{error}</span>)}
        </div>
    )

}


TextFieldGroup.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired
}

TextFieldGroup.defaultProps = {
    type: "text"
}

export default TextFieldGroup;
