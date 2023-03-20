import './ordering.css';
import FormGenerator from '../generators/form-generator/generateform';
import { useContext, useEffect, useRef, useState } from 'react';
import ProductsService from '../services/productsservice';
import Loader from '../generators/loader/loader';
import DataContext from '../context/data-context/data-context';
import UserService from '../services/userservice';
import Captcha from '../generators/captcha/captcha';
import SubmitGenerator from '../generators/Submit/submit-generator';
import main_service from '../services/main-services';
import { useNavigate } from 'react-router-dom';

const Ordering = () => {
    const formInputs = "text,Име*,name:email,Е-маил*,email:text,Адреса,adress:text,Град,city:text,Телефон,phone:submit,Регистрација"
    const orderingRef = useRef(null)
    const [lenghtCoup, setLengthCoup] = useState(0)
    const [coupons, setCoupons] = useState([])
    const [totalSum, setTotalSum] = useState(0)
    const [displayManualCoup, setDisplayManualCoup] = useState(true)
    const [manualCoup, setManualCoup] = useState(null)
    const [checkingCoupValidity, setCheckingCoupValidity] = useState(false)
    const [displayElement, setDisplayElement] = useState('')
    const {loggedIn, setCart} = useContext(DataContext)
    const [displayPerks, setDisplayPerks] = useState([])
    const [selectedPerk, setSelectedPerk] = useState(null)
    const [errorCoupon, setErrorCoupon] = useState('')
    const [freeShipping, setFreeShipping] = useState(false)
    const [userInfo, setUserInfo] = useState([])
    const kepchah = useRef(null)
    const navigate = useNavigate()

    function submitForm(e)
    {
        if(e[0]['name'] == '' || e[1]['email'] == '' || e[2]['adress'] == '' || e[3]['city'] == '' || e[4]['phone'] == '')
        {
            orderingRef.current.setErrorMessageParent('Морате попунити сва поља!')
            orderingRef.current.setProgressParent(false)
            return
        }

        let product = ''

        for(let i = 0; i < JSON.parse(localStorage.getItem('cart')).length; i++)
        {
            product += JSON.parse(localStorage.getItem('cart'))[i]['id'] + ','
            product += JSON.parse(localStorage.getItem('cart'))[i]['size'] + ','
            product += JSON.parse(localStorage.getItem('cart'))[i]['color'] + ','
            product += JSON.parse(localStorage.getItem('cart'))[i]['ammount'] + ','
            product += JSON.parse(localStorage.getItem('cart'))[i]['name'] + ','
            product += JSON.parse(localStorage.getItem('cart'))[i]['price'] + ':'
        }
        
        let ms = new main_service()
        let token = null

        if(loggedIn)
        {
            token = localStorage.getItem('token')
        }

        ms.send_request('setorder', {
            'name': e[0]['name'],
            'email': e[1]['email'],
            'adress': e[2]['adress'],
            'city': e[3]['city'],
            'phone': e[4]['phone'],
            'products': product,
            'token': token,
            'coupon': manualCoup,
            'perk': selectedPerk,
            'logged': loggedIn
        }).then((res) => {
            if(res[0] == true)
            {
                orderingRef.current.setConditionParent(true)
                console.log(res)
                ProductsService.updatePoints(res[1]['points'])

                setTimeout(() => {
                    localStorage.removeItem('cart')
                    setCart([])
                    navigate('/')
                }, 5000)
            }
            else
            {
                orderingRef.current.setErrorMessageParent(res[1])
                orderingRef.current.setProgressParent(false)
            }
        })
    }

    function setManualCoupon(value)
    {
        setErrorCoupon('')
        let coupon = value.split('-')
        let counter = 0

        for(let part in coupon)
        {
            if(coupon[part].length == 4)
            {
                counter++
            }
        }

        if(counter == 4)
        {
            setCheckingCoupValidity(true)
            ProductsService.checkCouponValidity(value).then((res) => {
                console.log(res)
                if(res[0] == true)
                {
                    let couponInfo = res[1]
                    let total = ProductsService.GetTotalPrice()

                    setCheckingCoupValidity(false)
                    setManualCoup(value)
                    setTotalSum(total - (total * couponInfo['discount'] / 100))
                    setDisplayPerks([])
                }
                else
                {
                    setCheckingCoupValidity(false)
                    setDisplayManualCoup(true)
                    setErrorCoupon(res[1])
                }
            })
        }
    }

    function getAvailablePerks()
    {
        const perks = {
            '1': [300, 'Бесплатна достава'],
            '2': [400, 'Попуст 10%'],
            '3': [550, 'Попуст 15%'],
        }

        if(loggedIn)
        {
            let points = UserService.getUserPoints()
            let display = []

            display.push(
                <option value='0'>Без погодности</option>
            )

            for(let perk in perks)
            {
                if(points >= perks[perk][0])
                {
                    display.push(
                        <option value={perk}>{perks[perk][1]}</option>
                    )
                }
            }

            setDisplayPerks(display)
        }
    }

    function getAction()
    {
        if(manualCoup != null)
        {
            setDisplayElement(<p style={{color: 'green'}}>{manualCoup} купон је валидан и унет!</p>)
        }
        else if(checkingCoupValidity == true)
        {
            setDisplayElement(<Loader elHeight={'50px'}></Loader>)
        }
        else
        {
            setDisplayElement(<>
                <p style={{marginTop: '20px'}}>Унесите ручно код купона: </p>
                <input type="text" name="coupon" id="coupon" placeholder='Код купона за попуст' onChange={(e) => setManualCoupon(e.target.value)}></input>
            </>)
        }
    }

    function handlePerkChange(e)
    {
        if(e != 0)
        {
            setDisplayManualCoup(false)

            if(e == 1)
            {
                setSelectedPerk(1)
                setTotalSum(ProductsService.GetTotalPrice())
                setFreeShipping(true)
            }
            if(e == 2)
            {
                setSelectedPerk(2)
                let total = ProductsService.GetTotalPrice()
                setTotalSum(total - (total * 10 / 100))
            }
            if(e == 3)
            {
                setSelectedPerk(3)
                let total = ProductsService.GetTotalPrice()
                setTotalSum(total - (total * 15 / 100))
            }
        }
        else
        {
            setTotalSum(ProductsService.GetTotalPrice())
            setDisplayManualCoup(true)
        }
    }

    function setUserData()
    {
        let user = []

        user.push(localStorage.getItem('name') + ' ' + localStorage.getItem('surname'))
        user.push(localStorage.getItem('email'))
        user.push(localStorage.getItem('adress'))
        user.push(localStorage.getItem('city'))
        user.push(localStorage.getItem('phone'))

        setUserInfo(user) 
    }

    useEffect(() => {
        if(loggedIn)
        {
            getAvailablePerks()
            setUserData()
        }
        getAction()
        if(localStorage.getItem('coupons')) {
            let a = JSON.parse(localStorage.getItem('coupons'))
            setLengthCoup(a['coupons'].length)
            setCoupons(a['coupons'])
        }

        setTotalSum(ProductsService.GetTotalPrice())
    }, [])

    useEffect(() => {
        getAction()
    }, [manualCoup])

    useEffect(() => {
        if(loggedIn)
        {
            getAvailablePerks()
        }
    }, [loggedIn])
    
    return (
        <>
            <div id='order-container'>
                <div id='order-form-container'>
                     <FormGenerator prefix={'r'} 
                    useCaptcha={true} 
                    submitFunc={submitForm} 
                    ref={orderingRef} 
                    inputs={formInputs} 
                    scmsg="Хвала Вам на поруџбини. Примили смо вашу поруџбину и ускоро ће Вам стићи мејл са детаљима исте!" 
                    btnval="Наручивање"
                    fieldValues={userInfo}></FormGenerator>
                    {/* <form>
                        <input type='text' placeholder='Ваше пуно име' value={userInfo['name']} class="input-login-dialog"></input>
                        <input type='email' placeholder='Ваш емаил' value={userInfo['email']} class="input-login-dialog"></input>
                        <input type='text' placeholder='Ваш телефон' value={userInfo['phone']} class="input-login-dialog"></input>
                        <input type='text' placeholder='Вашa adresa' value={userInfo['adress']} class="input-login-dialog"></input>
                        <input type='text' placeholder='Вашa adresa' value={userInfo['city']} class="input-login-dialog"></input>
                        <Captcha ref={kepchah}></Captcha>
                        <SubmitGenerator></SubmitGenerator>
                    </form> */}
                </div>
                <div id='order-details'>
                    <p><b>ПРЕГЛЕД ПОРУЏБИНЕ</b></p>
                    <p>Број артикала у каси: {ProductsService.GetNumberOfProducts()}</p>
                    <p>Укупно за наплату: <b>{ProductsService.getProductPrice(totalSum)}</b></p>
                    <p>{freeShipping ? 'БЕСПЛАТНА ПОШТАРИНА' : ProductsService.GetShippingCost(totalSum)}</p>
                    {/* <p style={{marginTop: '20px'}}>Ваши купони: </p> */}
                    {/* {lenghtCoup > 0 ?
                    <select name="coupons" id="cars" onChange={(e) => selectCoupon(e.target.value)}>
                        <option value="empty"></option>
                        {coupons.map((coupon, index) => {
                            return <option value={coupon[2]}>{coupon[3] + '% popusta'}</option>
                        })
                        }
                    </select>
                    :
                    <p>Нема купона</p>} */}
                    {(loggedIn && displayPerks.length > 0) && 
                    <>
                    <p style={{marginTop: '10px'}}>Доступне погодности:</p>
                    <select onChange={(e) => handlePerkChange(e.target.value)}>
                        {displayPerks}
                    </select></>}
                    {displayManualCoup ? displayElement : null}
                    {errorCoupon != '' ? <p style={{color: 'red'}}>{errorCoupon}</p> : null}
                    {loggedIn ?
                    <p>Овом поруџбином освајате {10 + parseInt(ProductsService.GetTotalPrice() / 1000)} поен/а.</p>
                    :
                    null}
                </div>
            </div>
        </>
    )
}

export default Ordering