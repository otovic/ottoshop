import CompanyPerk from "../../companyperks/company-perks";
import Footer from "../../footer/footer";
import Header from "../../MainComponents/header/header";
import Ordering from "../../ordering/ordering";
import LoginDialog from "../../SideComponents/loginDialog/loginDialog";

const OrderingRoute = () => {
    return (
        <>
            <Header></Header>
            <LoginDialog></LoginDialog>
            <Ordering></Ordering>
            <CompanyPerk></CompanyPerk>
            <Footer></Footer>
        </>
    );
}

export default OrderingRoute