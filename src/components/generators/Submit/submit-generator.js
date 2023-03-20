import { Fragment } from "react"
import Loader from "../loader/loader"
import './submit-generator.css'

const SubmitGenerator = (props) => {
    const condition = props.condition
    const loading = props.loading

    function renderComponennt() {
        if(condition) {
            return <div id='logged-in-confirm'><p>{props.scMessage}</p></div>
        }
        else if(!loading) {
            return <input class="login-dialog-submit" type="submit" value={props.btnValue}></input>
        } else {
            return <Loader elHeight={"20px"}></Loader>
        }
    }

    return (
        <Fragment>
            {renderComponennt()}
        </Fragment>
    )
}

export default SubmitGenerator