import { useContext, useEffect, useState } from 'react'
import CompanyPerk from '../../../companyperks/company-perks'
import DataContext from '../../../context/data-context/data-context'
import Footer from '../../../footer/footer'
import AnchorLink from '../../../generators/anchor-link/anchor-link'
import Header from '../../../MainComponents/header/header'
import './userorder.css'
import main_service from '../../../services/main-services'
import OrderCard from './ordercard/ordercard'
import Loader from '../../../generators/loader/loader'
import { useNavigate } from 'react-router-dom'

const UserOrders = (props) => {
    const {data} = useContext(DataContext)
    const [orderDate, setOrderDate] = useState('')
    const [orderID, setOrderID] = useState('')
    const [ordersToDisplay, setOrdersToDisplay] = useState([])
    const [orderIndex, setOrderIndex] = useState(1)
    const [loading, setLoading] = useState(true)
    const {loggedIn, setLoggedIn} = useContext(DataContext)
    const navigate = useNavigate()

    async function getOrders() {
        let ms = new main_service()

        if(localStorage.getItem('orders'))
        {
            if((JSON.parse(localStorage.getItem('orders')))['orders'].length == 0)
            {
                setDisplayOrders()
                return
            } 
        }

        await ms.send_request('/getuserorders', { "token": data.token, "email": data.email }).then((result) => {
            console.log(result)
            if(result[0] == true) {
                let orders_list = {
                    orders: result[1]['data']
                }

                localStorage.setItem('orders', JSON.stringify(orders_list))

                if(result[1]['data'].length == 0) {
                    setOrdersToDisplay(
                        <div id='orders-container'>
                            <h3>Нисте имали поруџбине до сада</h3> 
                        </div>
                    )
                }
                else {   
                    setDisplayOrders()
                }
            }
        })
    }

    function setDisplayOrders()
    {
        try
        {
            let ordersData = JSON.parse(localStorage.getItem('orders'))['orders']
            let orderArray = []

            if(ordersData.length > 0)
            {   
                let maxIndex = orderIndex * 5
                let startIndex = maxIndex - 5 

                if(maxIndex > ordersData.length) maxIndex = ordersData.length

                for(let i = startIndex; i < maxIndex; i++)
                {
                    orderArray.push(
                        <OrderCard element={ordersData[i]}></OrderCard>
                    )
                }

                orderArray.push(
                    <div id='swiper'>
                        <button className='swiper-button' onClick={() => increaseIndex('-')}>{'<'}</button>
                        <button className='swiper-button' onClick={() => increaseIndex('+')}>{'>'}</button>
                    </div>
                )

                setLoading(false)
                setOrdersToDisplay(orderArray)
            }
            else
            {
                setLoading(false)
                setOrdersToDisplay(
                    <div id='orders-container' style={{height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <h3>Нисте имали поруџбине до сада</h3> 
                    </div>
                )
            }
        }
        catch(err)
        {
            setLoading(false)
            setOrdersToDisplay(
                <div id='orders-container'>
                    <h3>Нисте имали поруџбине до сада</h3> 
                </div>
            )
        }
    }

    function increaseIndex(action)
    {
        let orderLenght = JSON.parse(localStorage.getItem('orders'))['orders'].length

        if(action == '+')
        {
            if((orderIndex + 1) * 5 > orderLenght)
            {
                return
            }
            else
            {
                setOrderIndex(orderIndex + 1)
            }
        }
        else
        {
            if((orderIndex - 1) * 5 <= 0)
            {
                setOrderIndex(1)
            }
            else
            {
                setOrderIndex(orderIndex - 1)
            }
        }
    }

    useEffect(() => {
        setDisplayOrders()
    }, [orderIndex])

    useEffect(() => {
        if(!loggedIn) navigate('/')
        getOrders()
    }, [])

    return (
        <>
        <Header></Header>
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
                <div id='user-orders'>
                    {loading ?
                        <div style={{height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Loader elHeight={'100px'}></Loader>
                        </div>
                        :
                        ordersToDisplay
                    }   
                </div>
            </div>
        </div>
        <CompanyPerk></CompanyPerk>
        <Footer></Footer>
        </>
    )
}

export default UserOrders