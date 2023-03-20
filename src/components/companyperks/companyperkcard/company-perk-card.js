import { useEffect } from 'react'
import './company-perk-card.css'

const CompanyPerkCard = (props) => {
    return (
        <div id='perk-card-container'>
            <img src={props.values['img']}></img>
            <h2>{props.values['title']}</h2>
            <p>{props.values['text']}</p>
        </div>
    )
}

export default CompanyPerkCard