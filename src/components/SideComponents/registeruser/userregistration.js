import './userregistration.css'
import FormGenerator from '../../generators/form-generator/generateform'
import { useRef, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BenefitsContent from './benefits-content/benefitscontent'
import DataContext from '../../context/data-context/data-context';

const UserRegistration = () => {
    const { loggedIn, setLoggedIn } = useContext(DataContext)
    const navigate = useNavigate()
    
    let userRegistrationRef = useRef(null)

    function submitForm(subValues) {
        let validityValues = {
            name: subValues[0]['name'],
            surname: subValues[1]['surname'],
            email: subValues[2]['email'],
            pass: subValues[3]['password'],
            connpass: subValues[4]['connpassword']
        }
        
        for(const obj in validityValues){
            if(validityValues[obj] == '') {
                userRegistrationRef.current.setProgressParent(false)
                userRegistrationRef.current.setErrorMessageParent('Попуните сва обавезна поља означена са * !')
                return
            }
        }
        
        getData(subValues)
    }

    async function getData(subValues) {
        const status = await fetch(`http://127.0.0.1:5000/registerNewUser?name=${subValues[0]['name']}&surname=${subValues[1]['surname']}&email=${subValues[2]['email']}&password=${subValues[3]['password']}&connpassword=${subValues[4]['connpassword']}&adress=${subValues[5]['adress']}&city=${subValues[6]['city']}&phone=${subValues[7]['phone']}`)
        await status.json().then(data => {
            switch(data['message']) {
                case 'succes':
                    userRegistrationRef.current.setConditionParent()
                    userRegistrationRef.current.setProgressParent(false)
                    setTimeout(() => {
                        navigate('/')
                    }, 8000)
                    break
                case 'Server error':
                    userRegistrationRef.current.setProgressParent(false)
                    userRegistrationRef.current.setErrorMessageParent('Дошло је до грешке са сервером, покушајте касније!')
                    break
                case 'exists':
                    userRegistrationRef.current.setProgressParent(false)
                    userRegistrationRef.current.setErrorMessageParent('Унети е-маил већ постоји у систему!')
                    break
                case 'password':
                    userRegistrationRef.current.setProgressParent(false)
                    userRegistrationRef.current.setErrorMessageParent('Лозинке се не подударају!')
                    break
                case 'values':
                    userRegistrationRef.current.setProgressParent(false)
                    userRegistrationRef.current.setErrorMessageParent('Попуните исправно поља! Поља за име, презиме и град не могу да садрже бројеве. Поље за телефон мора садржати само бројеве без знакова и размака')
                    break
                default:
                    userRegistrationRef.current.setProgressParent(false)
                    userRegistrationRef.current.setErrorMessageParent('Дошло је до грешке са сервером, покушајте касније!')
                    break
            }
        })
    }

    useEffect(() => {
        if(loggedIn) {
            navigate('/')
        }
    }, [loggedIn])

    const formInputs = "text,Име*,name:text,Презиме*,surname:email,Е-маил*,email:password,Лозинка*,password:password,Потврдите лозинку*,connpassword:text,Адреса,adress:text,Град,city:text,Телефон,phone:submit,Регистрација"
    return (
        <>
        <div id="register-user-container">
            <div id='user-registration'>
                <div className='content-cont'>
                    <p>РЕГИСТРАЦИЈА КОРИСНИКА</p>
                </div>
                <div id='registration-form-container'>
                    <FormGenerator prefix={'p'} useCaptcha={true} showMessage={true} submitFunc={submitForm} ref={userRegistrationRef} inputs={formInputs} scmsg="Послат Вам је мејл за потврду ваше регистрације, након потврде могуће је користити налог!" btnval="Регистрација"></FormGenerator>
                </div>
            </div>
            <div id='user-registration'>
                <div className='content-cont'>
                    <p>БЕНЕФИТИ ОД РЕГИСТРАЦИЈЕ</p>
                </div>
                <div id='registration-form-container'>
                    <div id='benefit-title'>
                        <p>Једноставном регистрацијом од свега неколико минута можете остварити разне погодности приликом куповине на нашем сајту. Погодности које остварујете регистрацијом су:</p>
                    </div>
                    <div id='benefit-title'>
                        <BenefitsContent text={'Купон за 10% попуста'}></BenefitsContent>
                        <BenefitsContent text={'200 поена'}></BenefitsContent>
                        <BenefitsContent text={'Специјалне понуде'}></BenefitsContent>
                    </div>
                    <div id='benefit-title'>
                        <p>Поене које остварите приликом куповине можете потрошити на:</p>
                    </div>
                    <div id='benefit-title'>
                        <BenefitsContent text={'Бесплатну доставу'}></BenefitsContent>
                        <BenefitsContent text={'Додатан попуст'}></BenefitsContent>
                    </div>
                    <div id='benefit-title'>
                        <p>Приликом сваке ваше поруџбине добијате одређени број поена које касније можете искористити да остварите неку погодност.</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserRegistration