import { useContext, useState } from 'react';
import DataContext from '../../context/data-context/data-context';
import './loginDialog.css'
import { Outlet, Link } from 'react-router-dom';
import SubmitGenerator from '../../generators/Submit/submit-generator';
import { useNavigate } from 'react-router-dom';

const LoginDialog = (props) => {
    const { loggedIn, setLoggedIn, data, setData } = useContext(DataContext)
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [isLoginInProgress, SetLoginProgress] = useState(false)
    const [fillFormWarning, setFillFormWarning] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    function closeLoginDialog() {
        if(!loggedIn) {
            var logindialog = document.getElementById('showlogindialog');
            logindialog.setAttribute("id", "hidelogindialog")
        }
    }

    function switchTab() {
        navigate('/registracijakorisnika')
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (email == "" || password == "") {
            setErrorMessage("Морате попунити оба поља!")
            setFillFormWarning(false)
            return
        }
        SetLoginProgress(true)
        logIn()
    }

    async function logIn() {
        setFillFormWarning(true)
        const login = await fetch(`http://127.0.0.1:5000/loginUser?email=${email}&password=${password }`)
        await login.json().then((data) => {
            if(data.message == "11") {
                let cookieData = {}
                Object.entries(data).forEach(([key, value]) => {
                    localStorage.setItem(key, value)
                    cookieData[key] = value
                })
                setData(cookieData)
                SetLoginProgress(false)
                setLoggedIn(true)

                setTimeout(() => {
                    closeLoginDialog()
                }, 2000)
            } else if (data.message == "Server error"){
                setErrorMessage("Дошло је до грешке са сервером!")
                setFillFormWarning(false)
                SetLoginProgress(false)
            } else if (data.message == "Error"){
                setErrorMessage("Неисправан мејл или лозинка!")
                setFillFormWarning(false)
                SetLoginProgress(false)
            } else if (data.message == "account") {
                setErrorMessage("Морате да потврдите ваш налог кликом на линк у мејлу који Вам је послат!")
                setFillFormWarning(false)
                SetLoginProgress(false)
            }
        })
    }

    return (
        <>
        <div id='hidelogindialog'>
            <div id="login-dialog-background">

            </div>
            <div id="login-dialog-container">
                <div id='login-dialog'>
                    <div id='login-dialog-content'>
                        <img src='../x.png' width={"20px"} height="20px" onClick={closeLoginDialog}></img>
                        <h1>УЛОГУЈТЕ СЕ</h1>
                        <div id='form-container'>
                            <form onSubmit={handleSubmit}>
                                <label class="form-label">Е-маил:</label>
                                <input class="input-login-dialog" type="email" value={email} onChange={(e) => SetEmail(e.target.value)} placeholder='Ваш е-маил'></input>
                                <label class="form-label">Лозинка:</label>
                                <input class="input-login-dialog" type="password" value={password} onChange={(e) => SetPassword(e.target.value)} placeholder='Ваша лозинка'></input>
                                <Link to="/resetovanjelozinke"><p class="login-dialog-message">Заборавили сте лозинку?</p></Link>
                                <SubmitGenerator condition={loggedIn} loading={isLoginInProgress} scMessage={"Успешно логовање!"} btnValue={"Улогуј ме"}></SubmitGenerator>
                            </form>
                        </div>
                        {!fillFormWarning ?
                            <p class="login-dialog-message" style={{color: "red", display: "block", marginBottom: "0px"}}>{errorMessage}</p>
                            :
                            <p class="login-dialog-message" style={{color: "red", display: "none"}}>{errorMessage}</p>
                        }
                        <p class="login-dialog-message"><Link to='/registracijakorisnika'>Немате профил?</Link></p>
                    </div>
                    
                </div>
            </div>
        </div>
        <Outlet />
        </>
    )
}

export default LoginDialog