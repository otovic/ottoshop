import { useNavigate } from 'react-router-dom';
import './square-link.css'
import DataContext from '../../context/data-context/data-context'
import { useContext, useEffect } from 'react'

const SquareLink = (props) => {
    const{cart, setCart} = useContext(DataContext)
    var isButton = props.isButton;
    const navigate = useNavigate()

    function redirect() {
        if(props.funcPath) {
            props.funcPath() 
        }
        else {
            if(props.path) {
                navigate(props.path)
            }
        }
    }

    return (
        <div id={props.cssid} onClick={props.clickFunction} className={props.cl}>
            {isButton ? 
                <a><img src={props.imgsrc} onClick={redirect} width="inherit"></img></a>
                : 
                <img src={props.imgsrc} onClick={redirect}></img>
            }
            {props.isCart && cart.length > 0 ?
                <div id="cart-counter">
                    <p>{cart.length}</p>             
                </div>
            : null}
        </div>
    )
}

export default SquareLink