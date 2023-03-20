import './company-perks.css'
import CompanyPerkCard from './companyperkcard/company-perk-card'

const CompanyPerk = () => {

    const registration = {
        'img': '../register.png',
        'title': 'Регистрацијом до попуста',
        'text': 'Приликом сваке куповине добијате поене које можете искористити за различите погодности. Регистрација траје свега неколико минута.'
    }

    const delivery = {
        'img': '../delivery.png',
        'title': 'Плаћање поузећем',
        'text': 'Сваку поруџбину плаћате када Вам стигне пакет на адресу. Достава је бесплатна за износе преко 5000.00 РСД.'
    }

    const order = {
        'img': '../shopping-cart.png',
        'title': 'Наручивање',
        'text': 'Можете наручити преко сајта или мејлом на  prodaja@ottoshop.rs.'
    }

    return (
        <div id='perks-container'>
            <CompanyPerkCard values={registration}></CompanyPerkCard>
            <CompanyPerkCard values={delivery}></CompanyPerkCard>
            <CompanyPerkCard values={order}></CompanyPerkCard>
        </div>
    )
}

export default CompanyPerk