import { useImperativeHandle, useRef, useState, forwardRef } from 'react'
import './generateform.css'
import SubmitGenerator from '../Submit/submit-generator'
import Captcha from '../captcha/captcha'

const FormGenerator = forwardRef((props, ref) => {
    const [condition, setCondition] = useState(false)
    const [progress, setProgress] = useState(false)
    const [error, setError] = useState('')
    let inputValues = []
    const kepchahRef = useRef(null)

    useImperativeHandle(ref, () => ({
        setProgressParent(value) {
            setProgress(value)
        },
        setErrorMessageParent(text) {
            setError(text)
        },
        setConditionParent() {
            setError('')
            setCondition(true)
        }
    }))

    function handleSubmit(event) {
        event.preventDefault()
        setProgress(true)
        setError('')

        let inputs = props.inputs.split(':')
        inputs.pop()
        inputValues = []
        
        for(let i = 0; i < inputs.length; i++){
            inputValues.push({})
            inputValues[i][inputs[i].split(',')[2]] = document.querySelector('#inp'+ props.prefix + i).value
        }

        
        let a = false
        if(props.useCaptcha) {
            a = kepchahRef.current.checkCaptchaValidity()
            if(a){
                props.submitFunc(inputValues)
            } else {
                setProgress(false)
                kepchahRef.current.resetCaptcha()
                return
            }
        }
        else {
            props.submitFunc(inputValues)
        }
    }

    function getInputs() {
        const elements = []
        const inputs = props.inputs.split(':')
        inputs.pop()
        let counter = 0
        inputs.forEach(element => {
            element = element.split(',')
            if(props.fieldValues) {
                elements.push(<>
                    {props.lbl ? <label className='form-label'>{element[1]}</label> : <div style={{display: 'none'}}></div>}
                    <input id={'inp'+ props.prefix + counter++} type={element[0]} class="input-login-dialog" defaultValue={props.fieldValues[counter - 1]} placeholder={element[1]}></input>
                    </>
                )
            } else {
                elements.push(<>
                    {props.lbl ? <label className='form-label'>{element[1]}</label> : <div style={{display: 'none'}}></div>}
                    <input id={'inp' + props.prefix + counter++} type={element[0]} class="input-login-dialog" placeholder={element[1]}></input>
                    </>
                )
            }
        })

        elements.push(<>
            {props.useCaptcha ? <Captcha ref={kepchahRef}></Captcha> : <p style={{display: 'none'}}></p>}
            {props.showMessage ? <p>Регистрацијом се слажете са нашим <a href='#'>условима коришћења</a> и <a href='#'>политиком приватности</a></p> : <p style={{display: 'none'}}></p>}
            {error != '' ? <p style={{color: 'red'}}>{error}</p> : <p style={{display: 'none'}}></p>}
            <SubmitGenerator condition={condition} loading={progress} scMessage={props.scmsg} btnValue={props.btnval}></SubmitGenerator>
            </>
        )

        return elements
    }

    return (
        <form onSubmit={handleSubmit}>
            {getInputs()}
        </form>
    )
})

export default FormGenerator