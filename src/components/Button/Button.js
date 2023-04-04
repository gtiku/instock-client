
function Button(props) {

    return (
        <button
            onClick={props.onClick}
            className={props.className}
            value={props.value}
            type={props.type}>
                {props.value}
        </button>    
    )
}

export default Button