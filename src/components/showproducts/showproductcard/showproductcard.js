import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './showproductcard.css'

const ShowProductCard = (props) => {
    const [images, setImages] = useState(0)
    const [imageIndex, setImageIndex] = useState(1)

    function getImage()
    {
        let images = props.product[9].split(':')
        setImages(images.length)
    }

    function changeImage(action)
    {
        if(action === 1)
            setImageIndex(imageIndex + 1)
        else
            setImageIndex(1)
    }

    function getProductCategory() {
        let categories = props.product[11].split('|')
        let categories_str = ''
        let counter = 0

        categories.forEach(element => 
        {
            switch(element) 
            {
                case '1':
                    counter === 0 ? categories_str += 'Мушкарци' : categories_str += ', ' + 'Мушкарци'
                    counter++
                    break
                case '2':
                    counter === 0 ? categories_str += 'Жене' : categories_str += ', ' + 'Жене'
                    counter++
                    break
                case '3':
                    counter === 0 ? categories_str += 'Деца' : categories_str += ', ' + 'Деца'
                    counter++
                    break
                case '4':
                    counter === 0 ? categories_str += 'Otto-division' : categories_str += ', ' + 'Otto-division'
                    counter++
                    break
                default:
                    counter === 0 ? categories_str += 'Мушкарци' : categories_str += ', ' + 'Мушкарци'
                    counter++
                    break
            }
        })

        return categories_str
    }

    function getProductPrice() 
    {
        if(props.product[2])
        {
            return props.product[2] + '.00 РСД'
        }
        return <p></p>
    }

    return (
        <div id='display-product-container'>
            <Link to={'/proizvod/' + props.product[12]}>
            <div id='display-product-image'>
                <img src={'/products/'+ props.product[0] + '-' + imageIndex + '.png' } onMouseOver={() => changeImage(1)} onMouseLeave={() => changeImage(0)}></img>
                <div id='product-price'>
                    {getProductPrice()}
                </div>
            </div>
            </Link>
            <div id='product-info'>
                <p id='product-name'>{props.product[1]}</p>
                <p id='product-category'>{getProductCategory()}</p>
            </div>
        </div> 
    )
}

export default ShowProductCard