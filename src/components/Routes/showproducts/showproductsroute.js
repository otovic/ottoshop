import CompanyPerk from "../../companyperks/company-perks"
import Footer from "../../footer/footer"
import Header from "../../MainComponents/header/header"
import ShowProducts from "../../showproducts/showproducts"
import LoginDialog from "../../SideComponents/loginDialog/loginDialog"

const ShowProductsRoute = (props) => {
    return (
        <>
            <Header></Header>
            <LoginDialog></LoginDialog>
            <ShowProducts index={props.index}></ShowProducts>
            <CompanyPerk></CompanyPerk>
            <Footer></Footer>
        </>
    )
}

export default ShowProductsRoute