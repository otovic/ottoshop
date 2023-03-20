import { forwardRef, useEffect, useState } from 'react';
import ProductsService from '../../services/productsservice';
import './shoppingcartproduct.css';

const ShoppingCartProduct = (props) => {
    const [ammountVal, setAmmountVal] = useState(1)

    function removeProduct()
    {
        ProductsService.removeProductFromCart(props.product)
        props.func(true)
    }

    function changeAmmount(action)
    {
        let newAmmount = ProductsService.changeCartProductAmmount(props.product, action, 0)
        console.log(newAmmount)
        setAmmountVal(newAmmount)
        props.func(true)
    }

    function changeAmmountVal(e)
    {
        if(e.target.value < 1)
        {
            e.target.value = 1
        }
        setAmmountVal(e.target.value)
        ProductsService.changeCartProductAmmount(props.product, '0', e.target.value)
        props.func(true)
    }

    useEffect(() => {
        setAmmountVal(props.product['ammount'])
    }, [])

    return (
            <div id='cart-product'>
                <div id='product-deatils'>
                    <div id='product-info-container'>
                        <img src='../x.png' width={"20px"} height="20px" onClick={() => removeProduct()}></img>
                        <div id='image-background'>
                            <img src={'/products/' + props.product['img'] + '.png'}></img>
                        </div>
                        <div id='product-data'>
                            <p><b>{props.product['name']}</b></p>
                            <p>{props.product['size']}</p>
                            <p>{props.product['color']}</p>
                            <p className='hidden'>{ProductsService.getProductPrice(props.product['price'])}</p>
                            <div id='ammount-selector'>
                            <button className='hidden' onClick={() => changeAmmount('-')}>-</button>
                            <input className='hidden' type='number' min={'1'} onChange={(e) => changeAmmountVal(e)} value={ammountVal}></input>
                            <button className='hidden' onClick={() => changeAmmount('+')}>+</button>
                            <p className='hidden'><b>УКУПНО:</b></p>
                            <p className='hidden'>{ProductsService.getProductPrice(props.product['ammount'] * props.product['price'])}</p>
                        </div>
                        </div>
                    </div>
                    <div id='ammount-container'>
                        <p><b>КОЛИЧИНА:</b></p>
                        <div id='ammount-selector'>
                            <button onClick={() => changeAmmount('-')}>-</button>
                            <input type='number' min={'1'} onChange={(e) => changeAmmountVal(e)} value={ammountVal}></input>
                            <button onClick={() => changeAmmount('+')}>+</button>
                        </div>
                    </div>
                    <div id='price-div'>
                        <p><b>ЦЕНА:</b></p>
                        <p>{ProductsService.getProductPrice(props.product['price'])}</p>
                    </div>
                    <div id='total-sum'>
                        <p><b>УКУПНО:</b></p>
                        <p>{ProductsService.getProductPrice(props.product['ammount'] * props.product['price'])}</p>
                    </div>
                </div>
            </div>
    )
}

export default ShoppingCartProduct