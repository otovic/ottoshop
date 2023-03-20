import { useParams } from "react-router-dom"
import Header from "../../MainComponents/header/header"
import LoginDialog from "../../SideComponents/loginDialog/loginDialog"
import CompanyPerk from "../../companyperks/company-perks"
import Footer from "../../footer/footer"
import './info.css'

const Info = () => {
    const { route } = useParams()

    function getTitle() {
        switch(route) {
            case 'nacin-placanja-i-isporuka':
                return 'Начин плаћања и испорука'
            case 'reklamacije-i-povracaj-novca':
                return 'Рекламације и повраћај новца'
            case 'kako-naruciti':
                return 'Како наручити'
            case 'uslovi-koriscenja':
                return 'Услови коришћења'
            case 'politika-privatnosti':
                return 'Политика приватности'
            case 'prava-kupca':
                return 'Права купца'
        }
    }

    function getText() {
        switch(route) {
            case 'nacin-placanja-i-isporuka':
                return <p>Dostavu pošiljaka vrši kurirska služba D Express. Očekivani rok isporuke je 3-5 radnih dana. U slučaju konsolidacije više pošiljaka u jednu, očekivani rok isporuke je 5-7 radnih dana. Ukoliko narudžbinu plaćate e-banking-om ili uplatnicom ovaj rok se računa od trenutka kada Shoppster evidentira Vašu uplatu. 
                    Ukoliko plaćate pouzećem ili platnom karticom rok za isporuku se računa od trenutka kreiranja narudžbine. <br></br><br></br> Dostavu pošiljaka vrši kurirska služba D Express. Očekivani rok isporuke je 3-5 radnih dana. U slučaju konsolidacije više pošiljaka u jednu, očekivani rok isporuke je 5-7 radnih dana. Ukoliko narudžbinu plaćate e-banking-om ili uplatnicom ovaj rok se računa od trenutka kada Shoppster evidentira Vašu uplatu. 
                    Ukoliko plaćate pouzećem ili platnom karticom rok za isporuku se računa od trenutka kreiranja narudžbine.</p>
            
            case 'reklamacije-i-povracaj-novca':
                return <p>Dostavu pošiljaka vrši kurirska služba D Express. Očekivani rok isporuke je 3-5 radnih dana. U slučaju konsolidacije više pošiljaka u jednu, očekivani rok isporuke je 5-7 radnih dana. Ukoliko narudžbinu plaćate e-banking-om ili uplatnicom ovaj rok se računa od trenutka kada Shoppster evidentira Vašu uplatu. 
                Ukoliko plaćate pouzećem ili platnom karticom rok za isporuku se računa od trenutka kreiranja narudžbine. <br></br><br></br> Dostavu pošiljaka vrši kurirska služba D Express. Očekivani rok isporuke je 3-5 radnih dana. U slučaju konsolidacije više pošiljaka u jednu, očekivani rok isporuke je 5-7 radnih dana. Ukoliko narudžbinu plaćate e-banking-om ili uplatnicom ovaj rok se računa od trenutka kada Shoppster evidentira Vašu uplatu. 
                Ukoliko plaćate pouzećem ili platnom karticom rok za isporuku se računa od trenutka kreiranja narudžbine.</p>
            
            case 'kako-naruciti':
                return <p>Dostavu pošiljaka vrši kurirska služba D Express. Očekivani rok isporuke je 3-5 radnih dana. U slučaju konsolidacije više pošiljaka u jednu, očekivani rok isporuke je 5-7 radnih dana. Ukoliko narudžbinu plaćate e-banking-om ili uplatnicom ovaj rok se računa od trenutka kada Shoppster evidentira Vašu uplatu. 
                Ukoliko plaćate pouzećem ili platnom karticom rok za isporuku se računa od trenutka kreiranja narudžbine. <br></br><br></br> Dostavu pošiljaka vrši kurirska služba D Express. Očekivani rok isporuke je 3-5 radnih dana. U slučaju konsolidacije više pošiljaka u jednu, očekivani rok isporuke je 5-7 radnih dana. Ukoliko narudžbinu plaćate e-banking-om ili uplatnicom ovaj rok se računa od trenutka kada Shoppster evidentira Vašu uplatu. 
                Ukoliko plaćate pouzećem ili platnom karticom rok za isporuku se računa od trenutka kreiranja narudžbine.</p>
            
            case 'uslovi-koriscenja':
                return <p>Dostavu pošiljaka vrši kurirska služba D Express. Očekivani rok isporuke je 3-5 radnih dana. U slučaju konsolidacije više pošiljaka u jednu, očekivani rok isporuke je 5-7 radnih dana. Ukoliko narudžbinu plaćate e-banking-om ili uplatnicom ovaj rok se računa od trenutka kada Shoppster evidentira Vašu uplatu. 
                Ukoliko plaćate pouzećem ili platnom karticom rok za isporuku se računa od trenutka kreiranja narudžbine. <br></br><br></br> Dostavu pošiljaka vrši kurirska služba D Express. Očekivani rok isporuke je 3-5 radnih dana. U slučaju konsolidacije više pošiljaka u jednu, očekivani rok isporuke je 5-7 radnih dana. Ukoliko narudžbinu plaćate e-banking-om ili uplatnicom ovaj rok se računa od trenutka kada Shoppster evidentira Vašu uplatu. 
                Ukoliko plaćate pouzećem ili platnom karticom rok za isporuku se računa od trenutka kreiranja narudžbine.</p>

            case 'politika-privatnosti':
                return <p>Dostavu pošiljaka vrši kurirska služba D Express. Očekivani rok isporuke je 3-5 radnih dana. U slučaju konsolidacije više pošiljaka u jednu, očekivani rok isporuke je 5-7 radnih dana. Ukoliko narudžbinu plaćate e-banking-om ili uplatnicom ovaj rok se računa od trenutka kada Shoppster evidentira Vašu uplatu. 
                Ukoliko plaćate pouzećem ili platnom karticom rok za isporuku se računa od trenutka kreiranja narudžbine. <br></br><br></br> Dostavu pošiljaka vrši kurirska služba D Express. Očekivani rok isporuke je 3-5 radnih dana. U slučaju konsolidacije više pošiljaka u jednu, očekivani rok isporuke je 5-7 radnih dana. Ukoliko narudžbinu plaćate e-banking-om ili uplatnicom ovaj rok se računa od trenutka kada Shoppster evidentira Vašu uplatu. 
                Ukoliko plaćate pouzećem ili platnom karticom rok za isporuku se računa od trenutka kreiranja narudžbine.</p>
            
            case 'prava-kupca':
                return <p>Dostavu pošiljaka vrši kurirska služba D Express. Očekivani rok isporuke je 3-5 radnih dana. U slučaju konsolidacije više pošiljaka u jednu, očekivani rok isporuke je 5-7 radnih dana. Ukoliko narudžbinu plaćate e-banking-om ili uplatnicom ovaj rok se računa od trenutka kada Shoppster evidentira Vašu uplatu. 
                Ukoliko plaćate pouzećem ili platnom karticom rok za isporuku se računa od trenutka kreiranja narudžbine. <br></br><br></br> Dostavu pošiljaka vrši kurirska služba D Express. Očekivani rok isporuke je 3-5 radnih dana. U slučaju konsolidacije više pošiljaka u jednu, očekivani rok isporuke je 5-7 radnih dana. Ukoliko narudžbinu plaćate e-banking-om ili uplatnicom ovaj rok se računa od trenutka kada Shoppster evidentira Vašu uplatu. 
                Ukoliko plaćate pouzećem ili platnom karticom rok za isporuku se računa od trenutka kreiranja narudžbine.</p>
        }
    }

    return (
        <>
            <Header></Header>
            <LoginDialog></LoginDialog>
            <div id="information-text">
                <h1>{getTitle()}</h1>
                <p>{getText()}</p>
            </div>
            <CompanyPerk></CompanyPerk>
            <Footer></Footer> 
        </>
    )
}

export default Info