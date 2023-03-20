import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import './captcha.css'

const Captcha = forwardRef((props, ref) => {
    const [captchaLetters, setCaptchaLetters] = useState([])
    const [inputLetters, setinputLetters] = useState('')
    const [generatedString, setGeneratedString] = useState('')
    const [showError, setShowError] = useState(false)
    
    useImperativeHandle(ref, () => ({
        checkCaptchaValidity() {
            setShowError(false)
            if(inputLetters == generatedString)
                return true
            setShowError(true)
            return false
        },
        resetCaptcha() {
            setSmetalo()
            generateLetters()
        }
    }))

    function genkey() {
        return Math.random()
    }
    
    function generateLetters() {
        const characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var captchaLettersVal = []
        var letters = []
        let newString = ''
        for(var i = 0; i < 6; i++){
            let currLetter = characters[Math.round(Math.random() * (characters.length - 1))]
            newString = newString + currLetter
            letters.push(currLetter)
            captchaLettersVal.push(<div id='letter' key={Math.random()}><p>{letters[i]}</p></div>)
        }
        setGeneratedString(newString)
        setCaptchaLetters(captchaLettersVal)
    }

    function setSmetalo() {
        var smetalos = document.getElementsByClassName('smetalo')
        
        for(var i = 0; i < smetalos.length; i++) {
            smetalos[i].style.top = '0%'
            smetalos[i].style.left = '0%'
            if(Math.floor(Math.random() * 2) == 1) {
                smetalos[i].style.width = '100%'
                smetalos[i].style.height = (Math.floor(Math.random() * 8)).toString() + 'px'
                smetalos[i].style.top = (Math.floor(Math.random() * (80 - 20) + 20)).toString() + "%"
            } else {
                smetalos[i].style.width = (Math.floor(Math.random() * 8)).toString() + 'px'
                smetalos[i].style.height = '100%'
                smetalos[i].style.left = (Math.floor(Math.random() * 99)).toString() + "%"
            }
        }
    }

    useEffect(() => {
        generateLetters()
        setSmetalo()
    }, []) 

    return (
        <>
            <div id="captcha-container">
                <div id='captcha-letters'>
                    <div id='smetalo-container'>
                        <div className='smetalo'></div>
                        <div className='smetalo'></div>
                        <div className='smetalo'></div>
                        <div className='smetalo'></div>
                        <div className='smetalo'></div>
                        <div className='smetalo'></div>
                        <div className='smetalo'></div>
                        <div className='smetalo'></div>
                        <div className='smetalo'></div>
                        <div className='smetalo'></div>
                    </div>
                    {captchaLetters}
                </div>
                <div id='captcha-text'>
                    <p>Унесите код са слике:</p>
                </div>
                <div id='captcha-input'>
                    <input type='text' placeholder='Код' value={inputLetters} onChange={(event) => setinputLetters(event.target.value)}></input>
                </div>
                {showError ? <p id="error_msg_captcha">Unesite ispravan kod!</p> : <p id="error_msg_captcha_hide"></p>}
            </div>
        </>
    )
})

export default Captcha