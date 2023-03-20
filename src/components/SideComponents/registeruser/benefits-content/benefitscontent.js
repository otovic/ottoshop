import './benefitscontent.css'

const BenefitsContent = (props) => {
    return (
        <div className={'benefit-register'}>
            <p>- {props.text}</p>
        </div>
    )
}

export default BenefitsContent