import Header from '../../MainComponents/header/header'
import LoginDialog from '../loginDialog/loginDialog'
import './ressetpassdialog.css'
import SquareLink from '../../generators/square-link/square-link'
import SubmitGenerator from '../../generators/Submit/submit-generator'
import { useEffect, useState, useContext, useRef } from 'react'
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import DataContext from '../../context/data-context/data-context'
import Captcha from '../../generators/captcha/captcha'

const ResetPasswordDialog = () => {
    const [sendReq, setSendReq] = useState(false)
    const [reqInProgress, setReqInProgress] = useState(false)
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    const [formIndex, setFormIndex] = useState(true)
    const [passwordChanged, setPasswordChanged] = useState(false)
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')
    const navigate = useNavigate()
    const { loggedIn, setLoggedIn, data, setData } = useContext(DataContext)
    const kepchahRef = useRef(null)

    useEffect(() => {
        if(loggedIn)
            navigate('/')
    })

    function HandleSubmit(event) {
        setReqInProgress(true)
        event.preventDefault()
        let a = kepchahRef.current.checkCaptchaValidity()
        if(a)
            resetCode(email) 
        else
            setReqInProgress(false)
    }

    function switchPlatform() {
        setFormIndex(!formIndex)
    }

    function HandlePasswordChange(event) {
        event.preventDefault()
        SubmitPassword()
    }

    async function SubmitPassword() {
        setReqInProgress(true)
        setError(false)
        const status = await fetch(`http://127.0.0.1:5000/submitNewPassword?code=${code}&password=${password}&conpassword=${conPassword}`)
        await status.json().then((data) => {
            switch(data['message']) {
                case 'succes':
                    setPasswordChanged(true)
                    setReqInProgress(false)
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                    return
                case 'error':
                    setError("Дошло је до грешке, покушајте касније!")
                    setReqInProgress(false)
                    return
                case 'passerror':
                    setError("Унесите идентичне лозинке!")
                    setReqInProgress(false)
                    return
                case 'code':
                    setError("Неисправан код!")
                    setReqInProgress(false)
                    return
                default:
                    setError("Дошло је до грешке, покушајте касније!")
                    setReqInProgress(false)
                    return
            }
        })
    }

    async function resetCode(email) {
        setError(false)
        setReqInProgress(true)
        if(email == '') {
            setError("Попуните сва поља!")
            setReqInProgress(false)
        }
        const status = await fetch(`http://127.0.0.1:5000/resetpassword?email=${email}`)
        await status.json().then((data) => {
            switch(data['message']) {
                case 'nouser':
                    setError("Унети е-маил не постоји у нашем систему!")
                    setReqInProgress(false)
                    return
                case 'error':
                    setError("Дошло је до грешке, покушајте касније!")
                    setReqInProgress(false)
                    return
                default:
                    setSendReq(true)
                    setReqInProgress(false)
                    setTimeout(() => {
                        setFormIndex(false)
                    }, 3000)
            }
        })
    }

    return (
        <>
            <div id='resset-password-container'>
                <div id='reset-password'>
                    <SquareLink cssid={'reset-pass-logo'} cl={'none'} isButton={false} imgsrc={'/lock.png'}></SquareLink>
                    <div className='reset-pass-instructions'>
                        <h3>РЕСЕТОВАЊЕ ЛОЗИНКЕ</h3>
                    </div>
                    {formIndex ?
                    <>
                    <div className='reset-pass-instructions'>
                        <p>Унесите свој емаил који сте користили приликом регистрације на нашем веб-сајту. Послаћемо Вам мејл са инструкцијама ѕа ресетовање лозинке.</p>
                    </div>
                    <div className='reset-pass-instructions input'>
                        <form onSubmit={HandleSubmit}>
                            <input type="text" className='input-login-dialog' onChange={(e) => setEmail(e.target.value)} placeholder='Ваш е-маил'></input>
                            <div id='cap'>
                                <Captcha ref={kepchahRef}></Captcha>
                            </div>
                            <SubmitGenerator condition={sendReq} loading={reqInProgress} scMessage={"Мејл за ресетовање послат!"} btnValue={"Ресетуј лозинку"}></SubmitGenerator>
                        </form>
                    </div>
                    </>
                    :
                    <div className='reset-pass-new input'>
                        <form onSubmit={HandlePasswordChange}>
                            <input type="text" className='input-login-dialog' onChange={(e) => setCode(e.target.value)} placeholder='Код'></input>
                            <input type="password" className='input-login-dialog' onChange={(e) => setPassword(e.target.value)} placeholder='Нова лозинка'></input>
                            <input type="password" className='input-login-dialog' onChange={(e) => setConPassword(e.target.value)} placeholder='Потврдите лозинку'></input>
                            <SubmitGenerator condition={passwordChanged} loading={reqInProgress} scMessage={"Лозинка успешно промењена!"} btnValue={"Ресетуј лозинку"}></SubmitGenerator>
                        </form>
                    </div>
                    }
                    <div>
                    {
                        formIndex ?
                            <p id='code-message' onClick={switchPlatform}>Имате код?</p>
                            :
                            <p id='code-message' onClick={switchPlatform}>Немате код?</p>
                    }
                    </div>
                    <div id='reset-pass-error'>
                    {error ?
                            <p style={{display: 'block'}}>{error}</p>
                            :
                            <p style={{display: 'none'}}>{error}</p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPasswordDialog