import { useNavigate } from 'react-router-dom'
import './anchor-link.css'

const AnchorLink = (props) => {
    const navigate = useNavigate()

    function redirect(path) {
        if(props.pathFunc) 
            props.pathFunc()
        else
            navigate(path)
    }

    return (
        <div id="anchor-tab">
            {props.boldText ?
                <a onClick={() => redirect(props.path)}><b>{props.text}</b></a>
                :
                <a onClick={() => redirect(props.path)}>{props.text}</a>
            }
        </div> 
    )
}

export default AnchorLink