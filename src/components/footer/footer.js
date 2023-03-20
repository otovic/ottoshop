import './footer.css'
import SquareLink from '../generators/square-link/square-link'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()

    function redirect(path) {
        navigate(path)
    }

    return (
        <div id='footer'>
            <div id='footer-card-contact'>
                <img src='../logo.png' onClick={() => redirect('/')}></img>
                <p><b>КОНТАКТИРАЈТЕ НАС: </b></p>
                <p style={{marginTop: '20px'}}><b>Е-маил:</b> prodaja@ottoshop.rs</p>
                <p style={{marginTop: '-10px'}}><b>Телефон:</b> 066 / 123123</p>
                <p style={{marginTop: '-10px'}}><b>Радно време:</b> 09:00 - 17-00</p>
            </div>
            <div id='footer-card-contact'>
                <p><b>ПОДРШКА: </b></p>
                <p style={{marginTop: '20px'}} id='footer-hover' onClick={() => redirect('/informacije/nacin-placanja-i-isporuka')}>Начин плаћања и испорука</p>
                <p style={{marginTop: '-10px'}} id='footer-hover' onClick={() => redirect('/informacije/reklamacije-i-povracaj-novca')}>Рекламације и повраћај новца</p>
                <p style={{marginTop: '-10px'}} id='footer-hover' onClick={() => redirect('/informacije/kako-naruciti')}>Како наручити</p>
            </div>
            <div id='footer-card-contact'>
                <p><b>УСЛОВИ КОРИШЋЕЊА: </b></p>
                <p style={{marginTop: '20px'}} id='footer-hover' onClick={() => redirect('/informacije/uslovi-koriscenja')}>Услови коришћења</p>
                <p style={{marginTop: '-10px'}} id='footer-hover' onClick={() => redirect('/informacije/politika-privatnosti')}>Политика приватности</p>
                <p style={{marginTop: '-10px'}} id='footer-hover' onClick={() => redirect('/informacije/prava-kupca')}>Права купца</p>
            </div>
            <div id='footer-card-contact'>
                <p><b>ЗАПРАТИТЕ НАС: </b></p>
                <div className={'footer-socials'}>
                    <SquareLink cssid={"social-facebook-header"} isButton={true} imgsrc={'/facebook.png'}></SquareLink>
                    <SquareLink cssid={"social-instagram-header"} isButton={true} imgsrc={'/instagram.png'}></SquareLink>
                </div>
            </div>
        </div>
    )
}

export default Footer