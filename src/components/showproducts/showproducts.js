import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './showproducts.css';
import main_service from '../services/main-services';
import ProductCard from '../productsstripe/product-card/productcard';
import ShowProductCard from './showproductcard/showproductcard';
import ProductsService from '../services/productsservice';
import DateService from '../services/dateservice';
import Loader from '../generators/loader/loader';

const ShowProducts = (props) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    function generateProducts(products)
    {
        setProducts(products)
        setLoading(false)
    }

    function getDisplayCategory()
    {
        let path = location.pathname.split('/')[1]

        switch(path) 
        {
            case 'muskarci':
                return 'МУШКАРЦИ'
            case 'zene':
                return 'ЖЕНЕ'
            case 'deca':
                return 'ДЕЦА'
            case 'ottodivision':
                return 'OTTO-DIVISION'
        }
    }

    useEffect(() => {
        let path = location.pathname.split('/')[1]
        let productsService = new ProductsService()

        let products = async () => {
            await productsService.fetchProducts(path).then(res => {
                generateProducts(res)
            })
        }
        
        products()
    }, [props.index])

    return (loading ? <div id='loader-container'><Loader elHeight="100px"></Loader></div> :
        <div id='show-product-container'>
            <div id='category-title'>
                <p>{getDisplayCategory()}</p>
            </div>
            <div id='products-wrapper'>
                {products}
            </div>
        </div>
    )
}

export default ShowProducts