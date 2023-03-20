import { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../generators/loader/loader';
import ProductsService from '../services/productsservice';
import './productoverview.css';
import DataContext from '../context/data-context/data-context';

const ProductOverview = (props) => {
    const [product, setProduct] = useState([])
    const [maxIndex, setMaxIndex] = useState(0)
    const [imageIndex, setImageIndex] = useState(1)
    const [category, setCategory] = useState('')
    const [colors, setColors] = useState(false)
    const [selectedColor, setSelectedColor] = useState(false)
    const [sizes, setSizes] = useState([])
    const [loading, setLoading] = useState(true)
    const [ammounterror, setAmmountError] = useState(false)
    const [maxAmmount, setMaxAmmount] = useState(0)
    const [selectedAmmountValue, setSelectedAmmountValue] = useState('1')
    const [selectedSize, setSelectedSize] = useState(false)
    const {cart, setCart} = useContext(DataContext)
    const location = useLocation()

    let size_txt = {
        0: 'S',
        1: 'M',
        2: 'L',
        3: 'XL',
        4: 'XXL',
        5: 'XXXL'
    }

    function swipeImage(action)
    {
        switch(action)
        {
            case 1:
                if(imageIndex + 1 > maxIndex)
                {
                    setImageIndex(1)
                }
                else
                {
                    setImageIndex(imageIndex + 1)
                }
                break
            case 0:
                if(imageIndex - 1 < 0)
                {
                    setImageIndex(maxIndex)
                }
                else
                {
                    setImageIndex(imageIndex - 1)
                }
                break
        }
    }

    useEffect(() => {
        let product_name = location.pathname.split('/')[2]
        let found_product = ProductsService.getProductFromStorage(product_name)
        
        const getAvailableSizes = async (url) => {
            let sizes = await ProductsService.getAvailableSizes(url)
            
            if(sizes[0] == true)
            {
                setSizes([sizes[1]['s'], sizes[1]['m'], sizes[1]['l'], sizes[1]['xl'], sizes[1]['xxl'], sizes[1]['xxxl']])
            }

            setLoading(false)
        }
            

        if(found_product != null)
        {
            setProduct(found_product)
            setMaxIndex(ProductsService.getMaxSwipeIndex(found_product))
            setCategory(ProductsService.getProductCategory(found_product[11]))

            if(found_product[14] != '')
            {
                setColors(ProductsService.getProductColors(found_product[14]))
            }

            getAvailableSizes(product_name)
        }

    }, [])

    function selectColor(cla)
    {
        let element = document.getElementsByClassName(cla)
        element[0].style.border = '3px solid rgb(85, 116, 255)'

        for(let i = 0; i < colors.length; i++)
        {
            if(i != cla)
            {
                let element = document.getElementsByClassName(i)
                element[0].style.border = '3px solid rgb(218, 218, 218)'
            }
        }

        setSelectedColor(cla)
    }

    function printColorOptions()
    {
        let arr = []
        let counter = 0

        for(let i = 0; i < colors.length; i++)
        {
            let curr = counter
            if(colors[i].length > 1)
            {
                arr.push(
                <div id='color-option' class={counter} onClick={() => {selectColor(curr)}}>
                    {colors[i][0]}
                    {colors[i][1]}
                </div>)

                counter++
                continue
            }

            console.log(colors)

            arr.push(
            <div id='color-option' class={counter} onClick={() => {selectColor(curr)}}>
                {colors[0]}
            </div>)

            counter++
        }

        return arr
    }

    function selectSize(index)
    {
        let element_id = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']

        element_id.forEach((element, indexx) => {
            let element_selected = document.getElementById(element)
            
            if(element == index)
            {
                setMaxAmmount(sizes[indexx])
                setSelectedSize(index)

                if(selectedAmmountValue > sizes[indexx])
                {
                    let ammount = document.getElementById('ammount-selector')
                    ammount.value = sizes[indexx]
                }

                if(element_selected.style.border === '3px solid gray')
                {
                    element_selected.style.border = '3px solid rgb(85, 116, 255)'
                }
            }
            else
            {
                element_selected.style.border = '3px solid gray'
            }
        });
    }

    function setAmmount(event)
    {
        setSelectedAmmountValue(event.target.value)
    }

    function addToCart()
    {   
        setAmmountError(false)

        if(selectedSize == false)
        {
            setAmmountError('Изаберите величину!')
            return
        }

        if(selectedAmmountValue > maxAmmount)
        {
            setAmmountError(`Нема довољно на лагеру! Од величине ${selectedSize} има на залихама ${maxAmmount} комада!`)
            return
        }

        if(colors != false)
        {
            if(selectedColor === false)
            {
                setAmmountError('Изаберите боју!')
                return
            }
        }

        let selectedProduct = {
            id: product[0],
            name: product[1],
            price: product[2],
            size: selectedSize,
            ammount: parseInt(selectedAmmountValue),
            img: product[9].split(':')[0]
        }

        if(colors != false)
        {
            selectedProduct['color'] = product[14].split(':')[selectedColor]
        }

        ProductsService.AddToCart(selectedProduct).then((res) => {
            setCart(res)
        })
    }

    return (
        loading ? <div id='loading-div'><Loader elHeight={'100px'}></Loader></div>
        :
        <div id='product-preview-container'>
            <div id='product-preview'>
                <div id='product-preview-image'>
                    <img src={'/products/'+ product[0] + '-' + imageIndex + '.png'}></img>
                    <button id='swipe-left' onClick={() => swipeImage(0)}>
                        <p>{'<'}</p>
                    </button>
                    <button id='swipe-right' onClick={() => swipeImage(1)}>
                        <p>{'>'}</p>
                    </button>
                </div>
                <div id='product-order-details'>
                    <p id='product-preview-name'>{product[1]}</p>
                    <p id='product-preview-category'>Категорија: {category}</p>
                    <p id='product-preview-price'>Цена: <b>{ProductsService.getProductPrice(product[2])}</b></p>
                    <div id='description-container'>
                        <p id='product-preview-description'>{product[13]}</p>
                    </div>
                    {colors ? <><p id='color-select-text'>Изаберите боју:</p><div id='color-picker'>
                        {printColorOptions()}
                    </div></>
                    : null}
                    <p id='color-select-text'>Изаберите величину:</p>
                    <div id='sizes-container'>
                        {sizes.length > 0 &&
                            sizes.map((size, index) => {
                                if(size != 0)
                                {
                                    return (<div id={size_txt[index]} style={{border: '3px solid gray'}} class='active-size' key={index} onClick={() => selectSize(size_txt[index])}>{size_txt[index]}</div>)
                                }
                                else
                                {
                                    return (<div id={size_txt[index]} style={{border: '3px solid gray'}} class='inactive-size' key={index}>{size_txt[index]}</div>)
                                }
                            })
                        }
                    </div>
                    <p id='color-select-text'>Количина:</p>
                    <input id='ammount-selector' type={'number'} defaultValue='1' placeholder="Количина" min='1' max={maxAmmount} onChange={(e) => setAmmount(e)}></input>
                    {ammounterror != false ? <p id='ammount-error' style={{color: 'red'}}>{ammounterror}</p> : null}
                    <button id='add-to-cart' onClick={addToCart}>У Корпу</button>
                    <Link to="/porucivanje"><button id='order-button-overview'>Наручи</button></Link>
                </div>
            </div>
        </div>
    )
}

export default ProductOverview