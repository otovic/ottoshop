import './landingpage.css'
import FormGenerator from '../../../generators/form-generator/generateform'
import { useContext, useRef } from 'react'
import main_service from '../../../services/main-services'
import { useNavigate } from 'react-router-dom'
import DataContext from '../../../context/data-context/data-context'

const AdminLandingPage = () => {
    let adminLoginRef = useRef(null)
    const {adminLoggedIn, setAdminLoggedIn, setAdminData} = useContext(DataContext)
    const navigate = useNavigate()

    function submitForm(values) {
        let service = new main_service()
        service.send_request('adminlogin', values).then(res => {
            if(res[0] == false) {
                adminLoginRef.current.setProgressParent(false)
                adminLoginRef.current.setErrorMessageParent(res[1])
            } else {
                adminLoginRef.current.setConditionParent(true)
                setAdminLoggedIn(true)
                let cookieData = {}
                Object.entries(res[1]).forEach(([key, value]) => {
                    localStorage.setItem(key, value)
                    cookieData[key] = value
                })
                setAdminData(cookieData)
                setTimeout(() => {
                    navigate('adminconsole')
                }, 1000)
            }
        })
    }

    const formInputs = "password, ,pass1:password, ,pass2:password, ,pass3:"

    return (
        <>
            <div id="container">
                <div id='admin-login-container'>
                    <FormGenerator showMessage={false} submitFunc={submitForm} ref={adminLoginRef} inputs={formInputs} scmsg="Успешно логовање!" btnval="Логовање"></FormGenerator>
                </div>
            </div>
        </>
    )
}

export default AdminLandingPage