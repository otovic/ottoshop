import { useEffect, useReducer, useState } from 'react'
import main_service from '../services/main-services'
import ProductCard from './product-card/productcard'
import './productstripe.css'

//if there are less products then max number of products for showing
//we dont show left and right arrow
function shouldShowSwipe(curr_max){
    if(curr_max == 0) {
        return ['none-swipe', 'products-container-middle']
    }
    return ['product-swipe', 'products-container']
}

//reducer function that prevents rerendering of a component when the window is resized
function reducer(state, action) {
    //this function gets the value that should be swiped left or right
    //this swipe value indicates the margin that should be added to frist div so all divs move left or right
    //on mobile one product takes 100% of width so it should move 100% to the right so the next product shows
    function getValue(target) {
        switch(target) {
            case 4:
                return 20
            case 3:
                return 25
            case 2:
                return 33.3
            case 1:
                return 100
        }
    }

    //this function gets the max index based on current width of a window
    function getMax(product_number) {
        if(window.innerWidth > 1149){
            if(product_number <= 5){
                return 0
            }
            return product_number - 5
        }
        if(window.innerWidth <= 1149 && window.innerWidth > 850){
            if(product_number <= 4){
                return 0
            }
            return product_number - 4
        }
        if(window.innerWidth <= 850 && window.innerWidth > 600){
            if(product_number <= 3) {
                return 0
            }
            return product_number - 3
        }
        if(window.innerWidth <= 600){
            if(product_number == 1){
                return 0
            }
            return product_number - 1
        }
    }

    //this function rearanges the currently selected index if it exceeds the max index on window resize
    //and it also changes the swipe value (margin) that will be added to first product card when its swiped
    //basically by adding margin to first div, all divs move left or right, thats how i made swiping work
    function checkResolution(maxSwipeVal, width, targetWidthIndex, index) {
        let value = getValue(targetWidthIndex)
        //if current index of product card is larger then max swipe index, i set the current index to the new max index
        //this function executes on window resize
        if(index > maxSwipeVal)  {       
            return {
                max: getMax(state.products.length),
                width: targetWidthIndex,
                index: getMax(state.products.length),
                value: value,
                products: state.products,
                swipeid: shouldShowSwipe(getMax(state.products.length))
            }
        }
        //if current indec is not larger then the max swipe index then it stays unchanged
        return {
            max: getMax(state.products.length),
            width: targetWidthIndex,
            index: state.index,
            value: value,
            products: state.products,
            swipeid: shouldShowSwipe(getMax(state.products.length))
        }
    }

    if(action.type == 'index') {
        return {
            max: state.max,
            width: state.width,
            index: action.index,
            value: state.value,
            products: state.products,
            swipeid: shouldShowSwipe(getMax(state.products.length))
        }
    }

    //this code executes on window resize
    if(action.type == 'width') {
        if(window.innerWidth > 1149)
            return checkResolution(getMax(state.products.length), state.width, 4, state.index)
        if(window.innerWidth <= 1149 && window.innerWidth > 850) 
            return checkResolution(getMax(state.products.length), state.width, 3, state.index)
        if(window.innerWidth <= 850 && window.innerWidth > 600)
            return checkResolution(getMax(state.products.length), state.width, 2, state.index)
        if(window.innerWidth <= 600)
            return checkResolution(getMax(state.products.length), state.width, 1, state.index)
    }

    if(action.type == 'products'){
        if(action.products) {
            // we add product card component for every product that was fetched and update the state
            let products = []
            let counter = 0
            
            action.products.forEach(element => {
                //the first product card must have class 'first' because thats the lement that we change the margin to
                //to achieve the swiping effect
                if(counter == 0) {
                    products.push(<ProductCard klas={action.id + 'first'} product={element}></ProductCard>)
                    counter++
                }else{
                    products.push(<ProductCard product={element}></ProductCard>)
                }
                    
            })
            // if current selected index is not larger then the max we leave it as is
            return {
                max: getMax(products.length),
                width: state.width,
                index: state.index,
                value: state.value,
                products: products,
                swipeid: shouldShowSwipe(getMax(products.length))
            }
        }

        return {
            max: getMax(state.products.length),
            width: state.width,
            index: state.index,
            value: state.value,
            products: state.products,
            swipeid: shouldShowSwipe(getMax(state.products.length))
        }
    }

    return state
}

function setValues(max, width, index, value, products, swipeid){
    return {
        max: max,
        width: width,
        index: index,
        value: value,
        products: products,
        swipeid: swipeid
    }
}

//function for setting initial values on first render
function initial() {
    if(window.innerWidth > 1149) {
        return setValues(3, 4, 0, 20, [], shouldShowSwipe(0))
    }
    if(window.innerWidth <= 1149 && window.innerWidth > 850) {
        return setValues(4, 4, 0, 25, [], shouldShowSwipe(0))
    }
    if(window.innerWidth <= 850 && window.innerWidth > 600) {
        return setValues(5, 4, 0, 33.3, [], shouldShowSwipe(0))
    }
    else {
        return setValues(7, 4, 0, 100, [], shouldShowSwipe(0))
    }
}

const ProductStripe = (props) => {
    //data taht contains current max value that indicates how many times can we swipe
    //width value that indicates what resolution is currently active, i use this to prevent component rerendering
    //index value holds current image index thats into view
    //value indicates by how much should margin change when we click swipe, its different on different resolutions
    const [data, setData] = useReducer(reducer, initial())

    //when left button is clicked, image index is increased by 1, next image comes into view
    //reducer function is called when clicked
    function swipeLeft() {

        if(data.index - 1 > -1){
            let card = document.querySelector('.' + props.id + 'first')
            data.index -= 1
            card.style.marginLeft = "-" + data.value * data.index + "%"
        }
    }

    //when right button is clicked, image index is decreased by 1, next image comes into view
    //reducer function is called when clicked
    function swipeRight() {
        if(data.index + 1 <= data.max) {
            let card = document.querySelector('.' + props.id + 'first')
            data.index += 1
            card.style.marginLeft = "-" + data.value * data.index + "%"
        }
    }

    //this function is used to pass arguments to function on event listener
    //by default you cannot do this so i need to add wrapper function thats called with arguments being passed
    //check useEffect event listener
    function wrapper() {
        setData({type: 'width'})
    }

    useEffect(() => {
        //async function for fetching the products
        const fetchData = async() => {
            if(props.dataIndex == 1) {
                let ms = new main_service()
                let products =  await ms.getLatestProducts()
                //if fetch was successfull
                if(products[0] == true)
                    setData({type: 'products', products: products[1]['message'], id: props.id})
            }
        }

        //if product list is empty we call the async fetch data function
        if(data.products.length == 0) {
            fetchData().catch((err) => console.log(err))
        }

        //we set the correct margin of the first element on every rerender
        let card = document.querySelector('.' + props.id + 'first')
        if(card)
            card.style.marginLeft = "-" + data.value * data.index + "%"

        //listener for resize window event that calls setWidthIndex function that changes width index and rearanges the images
        //based on new resolution, if width index changed
        window.addEventListener('resize', wrapper)

        return () => {
            window.removeEventListener('resize', wrapper)
        }
    }, [data])

    return (
        <div id="products-stripe">
            <div id='stripe-title'>
                <p>{props.title}</p>
            </div>
            <div id={data.swipeid[1]}>
                {data.products.length != 0 ? data.products : <p></p>}
                <div id={data.swipeid[0]} className={'product-left-pos'} onClick={swipeLeft}>
                    <p>{'<'}</p>
                </div>
                <div id={data.swipeid[0]} className={'product-right-pos'} onClick={swipeRight}>
                    <p>{'>'}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductStripe