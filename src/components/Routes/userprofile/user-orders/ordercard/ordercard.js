import { useEffect, useState } from 'react'
import './ordercard.css'

const OrderCard = (props) => {
    const [order, setOrder] = useState(null);

    function getDate()
    {
        try
        {
            let orderDate = order[13].split(' ')
            return orderDate[1] + '-' + orderDate[2] + '-' + orderDate[3]
        }
        catch(err)
        {
            return 'None'
        }
    }

    function getCode()
    {
        try
        {
            return order[15]
        }
        catch(err)
        {
            return 'None'
        }
    }

    function getContent()
    {

    }

    useEffect(() => {
        setOrder(props.element)
    }, [])

    useEffect(() => {
        setOrder(props.element)
    }, [props.element])

    return(
        <div id='user-order-container'>
            <div id='order-user-info'>
                <p>Датум: <b>{getDate()}</b></p>
                <p>Код пошиљке: <b>{getCode()}</b></p>
                <p style={{marginTop: '10px'}}>Садржај: </p>
            </div>
            <div>

            </div>
        </div>
    )
}

export default OrderCard