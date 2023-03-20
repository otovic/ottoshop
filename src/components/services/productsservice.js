import main_service from "./main-services"
import ShowProductCard from "../showproducts/showproductcard/showproductcard"
import DateService from "./dateservice"
import ShoppingCartProduct from "../shoppingcart/shoppingcartproduct/shoppingcartproduct"

class ProductsService
{
    storeProducts(category, products)
    {   
        let dateService = new DateService()
        let date_str = dateService.getDateAsString()

        let item = 
        {
            date: date_str,
            products: products
        }

        localStorage.setItem(category, JSON.stringify(item))
    }
    
    getProductsData(category)
    {
        if(localStorage.getItem(category))
            return JSON.parse(localStorage.getItem(category))
        
        return null
    }

    async fetchProducts(category)
    {
        let db = new main_service()
        let item = null

        const pullProducts = async () => {
            let product_cards = []

            let res = await db.send_request('getproducts', { category: category })
            let message = res[0]
            let products = res[1]['products']

            this.storeProducts(category, products)

            if (message == true) 
            {
                if (products != []) 
                {
                    for (const product of products) 
                    {
                        product_cards.push(
                            <ShowProductCard product={product}></ShowProductCard>
                        )
                    }

                }
            }

            return new Promise((resolve, reject) => {
                resolve(product_cards)
            })
        }

        if(localStorage.getItem(category))
        {
            item = this.getProductsData(category)
            let products = item.products
            let dateService = new DateService()

            let date_str = dateService.getDateAsString()
            
            if(dateService.TimeDifference(dateService.stringToDate(date_str), dateService.stringToDate(item.date)) > 300000)
            {
                return await pullProducts()
            }

            let product_cards = []

            for (const product of products) 
            {
                product_cards.push(
                    <ShowProductCard product={product}></ShowProductCard>
                )
            }

            return product_cards
        }

        let products = await pullProducts()
        
        return new Promise((resolve, reject) => {
            resolve(products)
        })
    }

    static getProductFromStorage(url)
    {
        let categories = ['muskarci', 'zene', 'deca', 'ottodivision']
        let found_product = null

        for(let category of categories)
        {
            if(!localStorage.getItem(category) || found_product != null)
            {
                continue
            }

            let products = JSON.parse(localStorage.getItem(category))['products']

            for(let product of products)
            {
                if(product[12] == url)
                    found_product = product
            }
        }

        return found_product
    }

    static getMaxSwipeIndex(product)
    {
        let images = product[9].split(':')

        return images[images.length - 1].split('-')[1]
    }

    static getProductCategory(categories)
    {
        function appendCategory(counter, cat, current)
        {
            if(counter == 0)
                return cat
            else
                return current + ', ' + cat
        }

        let each = null

        if(categories.includes('|'))
        {
            each = categories.split('|')
        }
        else
        {
            each = [categories]
        }

        let counter = 0
        let category_str = ''

        for(var category in each)
        {
            switch(each[category])
            {
                case '1':
                    category_str = appendCategory(counter, 'МУШКАРЦИ', category_str)
                    counter++
                    break
                case '2':
                    category_str = appendCategory(counter, 'ЖЕНЕ', category_str)
                    counter++
                    break
                case '3':
                    category_str = appendCategory(counter, 'ДЕЦА', category_str)
                    counter++
                    break
                case '4':
                    category_str = appendCategory(counter, 'OTTO-DIVISION', category_str)
                    counter++
                    break
            }
        }

        return category_str
    }

    static getProductPrice(price)
    {
        if(price.toString().length > 3 && price.toString().length < 5)
        {
            return price.toString().slice(0, -3) + ' ' + price.toString().slice(-3) + '.00 РСД'
        }
        if(price.toString().length > 4 && price.toString().length < 6)
        {
            return price.toString().slice(0, -4) + price.toString().slice(-4, -3) + ' ' + price.toString().slice(-3) + '.00 РСД'
        }
        if(price.toString().length > 5 && price.toString().length < 7)
        {
            return price.toString().slice(0, -5) + price.toString().slice(-5, -4) + price.toString().slice(-4, -3) + ' ' + price.toString().slice(-3) + '.00 РСД'
        }
        if(price.toString().length > 6 && price.toString().length < 8)
        {
            return price.toString().slice(0, -6) + ' ' + price.toString().slice(-6, -5) + price.toString().slice(-5, -3) + ' ' + price.toString().slice(-3, -3) + price.toString().slice(-3) + '.00 РСД'
        }
        return price + '.00 РСД'
    }

    static getProductColors(colors)
    {
        function colorPicker(color)
        {
            switch(color)
            {
                case 'crna':
                    return 'black'
                case 'bela':
                    return '#ffffff'
                case 'siva':
                    return '#808080'
                case 'plava':
                    return '#0000ff'
                case 'zelena':
                    return '#008000'
            }
        }
        function makeColorDivs(color, width)
        {
            return <div className="color-div" style={{backgroundColor: colorPicker(color), width: width}}></div>
        }

        let colors_arr = []

        if(colors.includes(':'))
        {
            colors_arr = colors.split(':')
        }
        else
        {
            colors_arr = [colors]
        }
        
        let colors_str = []

        for(let color of colors_arr)
        {
            if(color.includes('/'))
            {
                color = color.split('/')
                let color_divs = []

                for(let c of color)
                {
                    color_divs.push(makeColorDivs(c, '50%'))
                }

                colors_str.push(color_divs)
                continue
            }

            colors_str.push(makeColorDivs(colors_arr[0], '100%'))
        }

        return colors_str
    }

    static getAvailableSizes(url)
    {
        let ms = new main_service()

        let sizes = ms.send_request('getavailablesizes', {url: url})

        return sizes
    }

    static async AddToCart(product)
    {
        let cart = []

        if(localStorage.getItem('cart'))
        {
            cart = JSON.parse(localStorage.getItem('cart'))
            
            for(let i = 0; i < cart.length; i++)
            {
                if(cart[i]['id'] == product['id'])
                {
                    if(cart[i]['size'] == product['size'] && cart[i]['color'] == product['color'])
                    {
                        cart[i]['ammount'] = parseInt(cart[i]['ammount']) + parseInt(product['ammount'])

                        localStorage.setItem('cart', JSON.stringify(cart))
                        return new Promise((resolve, reject) => {
                            resolve(cart)
                        })
                    }
                }
            }

            cart.push(product)
            localStorage.setItem('cart', JSON.stringify(cart))

            return new Promise((resolve, reject) => {
                resolve(cart)
            })
        }
        else
        {
            cart.push(product)
            localStorage.setItem('cart', JSON.stringify(cart))
        }

        return new Promise((resolve, reject) => {
            resolve(cart)
        })
    }

    static getCartProducts(pppp)
    {
        let cart = []

        if(localStorage.getItem('cart'))
        {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        else
        {
            return []
        }

        let cart_products = []

        for(let product of cart)
        {
            cart_products.push(<ShoppingCartProduct func={pppp} product={product}></ShoppingCartProduct>)
        }

        return cart_products
    }

    static removeProductFromCart(product)
    {
        let cart = JSON.parse(localStorage.getItem('cart'))
        for(let i = 0; i < cart.length; i++)
        {
            if(JSON.stringify(cart[i]) === JSON.stringify(product))
            {
                cart.splice(i, 1)
                console.log(cart)
                break
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart))    
    }

    static changeCartProductAmmount(product, action, ammount)
    {
        let cart = JSON.parse(localStorage.getItem('cart'))
        let newAmmount = 0

        for(let i = 0; i < cart.length; i++)
        {
            if(JSON.stringify(cart[i]) === JSON.stringify(product))
            {
                if(action == '+')
                {
                    cart[i]['ammount'] = (parseInt(cart[i]['ammount']) + 1).toString()
                    newAmmount = cart[i]['ammount']
                    localStorage.setItem('cart', JSON.stringify(cart))
                    return newAmmount
                }
                else if(action == '-')
                {
                    if(cart[i]['ammount'] - 1 > 0)
                    {
                        cart[i]['ammount'] = (parseInt(cart[i]['ammount']) - 1).toString()
                        newAmmount = cart[i]['ammount']
                        localStorage.setItem('cart', JSON.stringify(cart))
                        return newAmmount
                    }
                }
                else
                {
                    cart[i]['ammount'] = ammount
                    localStorage.setItem('cart', JSON.stringify(cart))
                    return ammount
                }
                break
            }
        }

        return product['ammount']
    }

    static GetShippingCost(price)
    {
        if(price > 4999)
        {
            return 'БЕСПЛАТНА ПОШТАРИНА'
        }
        else
        {
            return 'ПОШТАРИНА СЕ НАПЛАЋУЈЕ'
        }
    }

    static GetTotalPrice()
    {
        if(!localStorage.getItem('cart'))
        {
            return 0
        }

        let cart = JSON.parse(localStorage.getItem('cart'))
        let total = 0

        for(let product of cart)
        {
            total += product['price'] * product['ammount']
        }

        return total
    }

    static GetNumberOfProducts()
    {
        if(!localStorage.getItem('cart'))
        {
            return 0
        }

        return JSON.parse(localStorage.getItem('cart')).length
    }

    static getCoupons()
    {
        let coupons = JSON.parse(localStorage.getItem('coupons'))

        return coupons
    }

    static async checkCouponValidity(coupon)
    {
        let ms = new main_service()

        let res = await ms.send_request('checkcouponvalidity', {coupon: coupon})

        return new Promise((resolve, reject) => {
            resolve(res)
        })
    }

    static updatePoints(points)
    {
        localStorage.setItem('points', points)
    }
}

export default ProductsService