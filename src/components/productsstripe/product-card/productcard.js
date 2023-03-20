import { useEffect, useState } from 'react'
import './productcard.css'

const ProductCard = (props) => {
    const [images, setImages] = useState([])

    function getProductPrice() {
        if(props.product[2]){
            return props.product[2] + '.00 РСД'
        }
        return <p></p>
    }

    function getProductName() {
        if(props.product[1]) {
            return props.product[1]
        }
        return <p></p>
    }

    function getProductCategory() {
        let categories = props.product[11].split('|')
        let categories_str = ''
        let counter = 0
        categories.forEach(element => {
            switch(element) {
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

    function getProductImage() {
        if(props.product[0])
            return setImages('/products/' + props.product[0] + '-1.png')
        else
            return setImages('/products/1-1.png')
    }

    function changeImage() {
        return setImages('/products/' + props.product[0] + '-2.png')
    }

    useEffect(() => {
        getProductImage()
    }, [])

    return (
        <div id='product-card' className={props.klas}>
            <div id='product-image' onMouseOver={changeImage} onMouseLeave={getProductImage}>
                <img src={images} width="50px" height="50px"></img>
                <div id='product-price'>
                    <p>{getProductPrice()}</p>
                </div>
            </div>
            <div id='product-name'>
                <p>{getProductName()}</p>
            </div>
            <div id='product-category'>
                <p>{getProductCategory()}</p>
            </div>
        </div>
    )
}

export default ProductCard