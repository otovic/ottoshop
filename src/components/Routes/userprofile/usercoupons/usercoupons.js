import { useEffect } from 'react';
import CouponCard from './couponcard/couponcard'
import './usercoupons.css'

const UserCoupons = (props) => {
    function getCoupons() {
        let coupon_list = []

        props.coupons.forEach(element => {
            if(element[4] === 0)
            {
                coupon_list.push
                (
                    <CouponCard data={element}></CouponCard>
                )
            }
        });

        if(coupon_list.length === 0)
        {
            return <p>Немате ниједан купон.</p>
        }

        return coupon_list
    }

    return (
        <div className='coupon-container'>
            {getCoupons()}
        </div>
    )
}

export default UserCoupons