import { useContext, useEffect } from 'react'
import { render } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import DataContext from '../../context/data-context/data-context'
import AnchorLink from '../../generators/anchor-link/anchor-link'
import SquareLink from '../../generators/square-link/square-link'
import './header.css'

const Header = () => {
    const { loggedIn, setLoggedIn } = useContext(DataContext)
    const { data, setData } = useContext(DataContext)
    const navigate = useNavigate()

    function showLoginDialog() {
        if (!loggedIn) {
            var loginDialog = document.getElementById("hidelogindialog");
            loginDialog.setAttribute("id", "showlogindialog");
        }
        else {
            navigate('/nalog-korisnika/profil')
        }
    }

    function change() {
        setLoggedIn(!loggedIn)
    }

    return (
        <>
            <header>
                <div id='top-stripe'>
                    <div id='top-stripe-container'>
                        <div id='top-stripe-socials'>
                            <SquareLink cssid={"social-facebook-header"} isButton={true} imgsrc={'/facebook.png'}></SquareLink>
                            <SquareLink cssid={"social-instagram-header"} isButton={true} imgsrc={'/instagram.png'}></SquareLink>
                        </div>
                        <div id='top-stripe-message'>
                            <p>БЕСПЛАТНА ДОСТАВА ЗА ПОРУЏБИНЕ ПРЕКО 5000,00 РСД</p>
                        </div>
                        <div id='top-stripe-loggedin'>
                            <p onClick={showLoginDialog}>{loggedIn ? "Добродошли " + data.name : "Нисте пријављени"}</p>
                        </div>
                    </div>
                </div>
                <div id='main-header'>
                    <div id='main-header-container'>
                        <div id='main-header-left'>
                            <SquareLink cssid={'header-left-logo'} cl={'none'} isButton={true} path={'/'} imgsrc={'/logo.png'}></SquareLink>
                        </div>
                        <div id='main-header-center'>
                            <AnchorLink text={"МУШКАРЦИ"} path={'/muskarci'} boldText={false}></AnchorLink>
                            <AnchorLink text={"ЖЕНЕ"} path={'/zene'} boldText={false}></AnchorLink>
                            <AnchorLink text={"ДЕЦА"} path={'/deca'} boldText={false}></AnchorLink>
                            <AnchorLink text={"OTTO-DIVISION"} path={'/ottodivision'} boldText={true}></AnchorLink>
                        </div>
                        <div id='main-header-right'>
                            <SquareLink cssid={'header-right-search'} isButton={false} imgsrc={'/search.png'}></SquareLink>
                            <SquareLink cssid={'header-right-cart'} path={'/korpa'} isButton={false} isCart={true} imgsrc={'/shopping-cart.png'}></SquareLink>
                            <SquareLink cssid={'header-right-user'} clickFunction={showLoginDialog} pathFunc={showLoginDialog} isButton={false} imgsrc={'/user.png'}></SquareLink>
                            <SquareLink cssid={'header-left-menu-mb'} cl={'mb'} isButton={false} imgsrc={'/menu-short.png'}></SquareLink>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header