import CompanyPerk from "../../companyperks/company-perks"
import Footer from "../../footer/footer"
import Header from "../../MainComponents/header/header"
import ProductOverview from "../../productoverview/productoverview"
import LoginDialog from "../../SideComponents/loginDialog/loginDialog"

const ProductOverviewRoute = () => {
    return (
        <>
            <Header></Header>
            <LoginDialog></LoginDialog>
            <ProductOverview></ProductOverview>
            <CompanyPerk></CompanyPerk>
            <Footer></Footer>
        </>
    )
}

export default ProductOverviewRoute