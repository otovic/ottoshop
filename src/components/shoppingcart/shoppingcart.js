import ProductsService from '../services/productsservice'
import './shoppingcart.css'
import { useState, useEffect, useRef, useContext } from 'react'
import DataContext from '../context/data-context/data-context'
import { Link } from 'react-router-dom'

const ShoppingCart = () => {
    const [totalSum, setTotalSum] = useState(0)
    const [products, setProducts] = useState([])
    const {cart, setCart} = useContext(DataContext)

    function getCartProducts(changeCart)
    {
        let productsElements = ProductsService.getCartProducts(getCartProducts)
        let total = ProductsService.GetTotalPrice()

        setTotalSum(total)
        setProducts(productsElements)

        if(changeCart)
        {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
    }

    useEffect(() => {
        getCartProducts(false)
    }, [])

    return (
        <>
        {products.length === 0 ? 
        <div id='cart-container'>
            <div id='cart-title'>
                <p>КОРПА</p>
            </div>
            <div style={{height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1vw'}}>
                <p style={{fontSize: '1.5vw'}}>Nema proizvoda u korpi</p>
            </div>
        </div> 
        : 
        <div id='cart-container'>
            <div id='cart-title'>
                <p>КОРПА</p>
            </div>
            <div id='shopping-cart'>
                {products}
            </div> 
            <div id='total-sum-price'>
                <p><b>УКУПНО ЗА НАПЛАТУ: {ProductsService.getProductPrice(totalSum)}</b></p>
                <p><b>{ProductsService.GetShippingCost(totalSum)}</b></p>
            </div>
            <div id='order-button-container'>
                {products.length > 0 ?
                <Link to={'/porucivanje'} style={{textDecoration: 'none'}}><button id='order-button'>
                    ПОРУЧИВАЊЕ
                </button></Link>
                : null}
            </div>     
        </div>}</>
    )
}

export default ShoppingCart