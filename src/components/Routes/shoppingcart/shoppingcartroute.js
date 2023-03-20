import CompanyPerk from "../../companyperks/company-perks";
import Footer from "../../footer/footer";
import Header from "../../MainComponents/header/header";
import ShoppingCart from "../../shoppingcart/shoppingcart";
import LoginDialog from "../../SideComponents/loginDialog/loginDialog";

const ShoppingCartRoute = () => {
    return (
        <>
            <Header></Header>
            <LoginDialog></LoginDialog>
            <ShoppingCart></ShoppingCart>
            <CompanyPerk></CompanyPerk>
            <Footer></Footer>
        </>
    )
}

export default ShoppingCartRoute;