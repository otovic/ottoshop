import Footer from "../../footer/footer"
import Header from "../../MainComponents/header/header"
import LoginDialog from "../../SideComponents/loginDialog/loginDialog"
import ResetPasswordDialog from "../../SideComponents/resetpassword/resetpassdialog"

const ResetPassword = () => {
    return (
        <>
            <Header></Header>
            <LoginDialog></LoginDialog>
            <ResetPasswordDialog></ResetPasswordDialog>
            <Footer></Footer>
        </>
    )
}

export default ResetPassword