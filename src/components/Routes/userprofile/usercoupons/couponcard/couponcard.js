import { useEffect } from 'react';
import './couponcard.css';

const CouponCard = (props) => {
    function getColor() 
    {
        switch(props.data[3]) {
            case 10:
                return 'rgb(255, 40, 40)'
            case 13:
                return 'rgb(53, 132, 250)'
            case 15:
                return 'rgb(25, 233, 29)'
            default:
                return 'rgb(213, 238, 54)'
        }
    }

    useEffect(() => {
        console.log(props.data)
    }, [])

    return(
        <div className={'coupon-card'} style={{backgroundColor: getColor()}}>
            <div id='coupon-info'>
                <div id='coupon-title'>
                    <p>КУПОН</p>
                </div>
                <div id='coupon-date'>
                    {'Важи до: ' + props.data[5]}
                </div>
                <div id='coupon-code'>
                    {props.data[2]}
                </div>
            </div>
            <div id='coupon-ammount'>
                {props.data[3] + '%'}
            </div>
        </div>
    )
}

export default CouponCard