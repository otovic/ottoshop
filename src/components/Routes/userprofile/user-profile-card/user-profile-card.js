import './user-profile-card.css'
import DataContext from '../../../context/data-context/data-context'
import { useContext, useEffect, useRef, useState } from 'react'
import AnchorLink from '../../../generators/anchor-link/anchor-link'
import { useNavigate } from 'react-router-dom'
import FormGenerator from '../../../generators/form-generator/generateform'
import main_service from '../../../services/main-services'
import Loader from '../../../generators/loader/loader'
import UserOrders from '../user-orders/userorders'
import UserCoupons from '../usercoupons/usercoupons'

const UserProfileCard = () => {
    const { loggedIn, setLoggedIn } = useContext(DataContext)
    const { data, setData } = useContext(DataContext)
    const navigate = useNavigate()
    const [orders, setOrders] = useState(null)
    const nameChangeRef = useRef()
    const passwordChangeRef = useRef()
    const deliveryChangeRef = useRef()
    const [orderIndex, setOrderIndex] = useState(1)
    const [displayOrders, setDisplayOrders] = useState([])

    const nameChangeInputs = "text,Име*,name:text,Презиме*,surname:"
    const passwordChangeInputs = "password,Стара лозинка,oldpass:password,Нова лозинка,newpass:password,Потврди нову лозинку,connpass:"
    const deliveryChangeInputs = "text,Адреса,adress:text,Град,city:text,Број телефона,phone:"

    const [pathIndex, setPathIndex] = useState(<>
        <div id='name-surname'>
            <h3>Име и презиме</h3>
            <FormGenerator useCaptcha={false} prefix={'o'} fieldValues={[data.name, data.surname]} showMessage={false} submitFunc={submitNameChange} ref={nameChangeRef} inputs={nameChangeInputs} scmsg="Успешно промењено име!" btnval="Промени"></FormGenerator>
        </div>
        <div id='name-surname'>
            <h3>Промена лозинке</h3>
            <FormGenerator useCaptcha={false} prefix={'q'} showMessage={false} submitFunc={submitPasswordChange} ref={passwordChangeRef} inputs={passwordChangeInputs} scmsg="Успешно промењена лозинка!" btnval="Промени"></FormGenerator>
        </div>
        <div id='name-surname'>
            <h3>Информације за доставу</h3>
            <FormGenerator useCaptcha={false} prefix={'w'} fieldValues={[data.adress, data.city, data.phone]} showMessage={false} submitFunc={submitDeliveryChange} ref={deliveryChangeRef} inputs={deliveryChangeInputs} scmsg="Успешно сте променили податке!" btnval="Промени"></FormGenerator>
        </div>
        </>
    )

    function redirect(path) {
        navigate(path)
    }

    async function submitNameChange(formvalues) {
        let ms = new main_service()
        let values = {
            "name": formvalues[0]['name'],
            "surname": formvalues[1]['surname'],
            "token": data.token,
            "email": data.email,
        }
        await ms.send_request('/changenameofuser', values).then((result) => {
            if(result[0] == true) {
                let person = {
                    "id": data.id,
                    "name": formvalues[0]['name'],
                    "email": data.email,
                    "token": data.token,
                    "points": data.points,
                    "surname": formvalues[1]['surname'],
                    "adress": data.adress,
                    "phone": data.phone,
                    "city": data.city
                }
                localStorage.setItem("name", result[1]['name'])
                localStorage.setItem("surname", result[1]['surname'])
                nameChangeRef.current.setConditionParent(true)

                setData(person)
            } else {
                nameChangeRef.current.setProgressParent(false)
                nameChangeRef.current.setErrorMessageParent(result[1])
            }
        })
    }

    async function submitPasswordChange(formvalues) {
        let ms = new main_service()
        let values = {
            "oldpassword": formvalues[0]['oldpass'],
            "password": formvalues[0]['newpass'],
            "connpassword": formvalues[0]['connpass'],
            "token": data.token,
            "email": data.email,
        }
        await ms.send_request('changepasswordofuser', values).then((result) => {
            if(result[0] == true) {
                passwordChangeRef.current.setConditionParent(true)
            } else {
                passwordChangeRef.current.setProgressParent(false)
                passwordChangeRef.current.setErrorMessageParent(result[1])
            }
        })
    }

    async function submitDeliveryChange(formvalues) {
        let ms = new main_service()
        let values = {
            "adress": formvalues[0]['adress'],
            "city": formvalues[1]['city'],
            "phone": formvalues[2]['phone'],
            "token": data.token,
            "email": data.email,
        }
        await ms.send_request('/changedeliverydata', values).then((result) => {
            if(!result) {
                deliveryChangeRef.current.setProgressParent(false)
                deliveryChangeRef.current.setErrorMessageParent("Грешка на серверу!")
                return
            }
            if(result[0] == true) {
                deliveryChangeRef.current.setConditionParent(true)
                localStorage.setItem("adress", result[1]['adress'])
                localStorage.setItem("city", result[1]['city'])
                localStorage.setItem("phone", result[1]['phone'])
                let person = {
                    "id": data.id,
                    "name": data.name,
                    "email": data.email,
                    "token": data.token,
                    "points": data.points,
                    "surname": data.surname,
                    "adress": result[1]['adress'],
                    "phone": result[1]['phone'],
                    "city": result[1]['city']
                }
                setData(person)
            } else {
                deliveryChangeRef.current.setProgressParent(false)
                deliveryChangeRef.current.setErrorMessageParent(result[1])
            }
        })
    }

    function changeOrderIndex(action)
    {
        switch(action)
        {
            case '+':
                setOrderIndex(orderIndex + 1)
                break
            case '-':
                setOrderIndex(orderIndex - 1)
                break
        }
    }

    useEffect(() => {
        setPathIndex(<div>{displayOrders}</div>)
        if(displayOrders.length > 0)
        {
            setPathIndex(
                <>
                <div id='orders-container'>
                    <h3>Преглед ваших поруџбина</h3>
                    {displayOrders}
                </div>
                <div id='swiper'>
                    <button id='previousorderbutton' onClick={() => changeOrderIndex('-')}>{'<'}</button>
                    <button id='nextorderbutton' onClick={() => changeOrderIndex('+')}>{'>'}</button>
                </div>
                </>
            )
        }
    }, [displayOrders])

    async function getCoupons() {
        let ms = new main_service()

        await ms.send_request('/getusercoupons', { "token": data.token, "email": data.email }).then((result) => {
            if(result[0] == true) {
                let coupons_list = {
                    coupons: result[1]['data']
                }
                localStorage.setItem('coupons', JSON.stringify(coupons_list))
                if(result[1]['data'].length == 0) {
                    setPathIndex(
                        <div id='orders-container'>
                                <h3>Тренутно немате ни један купон</h3> 
                        </div>
                    )
                }else {
                    setPathIndex(
                        <UserCoupons coupons={result[1]['data']}></UserCoupons>
                    )
                }
            }
        })
    }

    useEffect(() => {
        if(!loggedIn) {
            redirect('/')
        }
    }, [loggedIn])

    return (
        <>
        <div id='profile-card-container'>
            <div id='profile-card'>
                <div id='profile-title'>
                    <div id="profile-title-welcome">
                        <h2>Добродошли, {data.name + ' ' + data.surname}</h2>
                    </div>
                    <div id='profile-title-points'>
                        <p>Vasi poeni : <b>{data.points}</b></p>
                    </div>
                </div>
                <div id='profile-card-menu'>
                        <AnchorLink text={"ПРОФИЛ"} path={'/nalog-korisnika/profil'} boldText={false}></AnchorLink>
                        <AnchorLink text={"ПОРУЏБИНЕ"} path={'/nalog-korisnika/porudzbine'} boldText={false}></AnchorLink>
                </div>
                <div id='profile-card-path'>
                    <div id='name-surname'>
                        <h3>Име и презиме</h3>
                        <FormGenerator useCaptcha={false} prefix={'o'} fieldValues={[data.name, data.surname]} showMessage={false} submitFunc={submitNameChange} ref={nameChangeRef} inputs={nameChangeInputs} scmsg="Успешно промењено име!" btnval="Промени"></FormGenerator>
                    </div>
                    <div id='name-surname'>
                        <h3>Промена лозинке</h3>
                        <FormGenerator useCaptcha={false} prefix={'q'} showMessage={false} submitFunc={submitPasswordChange} ref={passwordChangeRef} inputs={passwordChangeInputs} scmsg="Успешно промењена лозинка!" btnval="Промени"></FormGenerator>
                    </div>
                    <div id='name-surname'>
                        <h3>Информације за доставу</h3>
                        <FormGenerator useCaptcha={false} prefix={'w'} fieldValues={[data.adress, data.city, data.phone]} showMessage={false} submitFunc={submitDeliveryChange} ref={deliveryChangeRef} inputs={deliveryChangeInputs} scmsg="Успешно сте променили податке!" btnval="Промени"></FormGenerator>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserProfileCard