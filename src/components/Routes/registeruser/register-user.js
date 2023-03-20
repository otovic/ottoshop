import Footer from "../../footer/footer"
import Header from "../../MainComponents/header/header"
import LoginDialog from "../../SideComponents/loginDialog/loginDialog"
import UserRegistration from "../../SideComponents/registeruser/userregistration"

const RegisterUserRoute = () => {
    return (
        <>
            <Header></Header>
            <LoginDialog></LoginDialog>
            <UserRegistration></UserRegistration>
            <Footer></Footer>
        </>
    )
}

export default RegisterUserRoute