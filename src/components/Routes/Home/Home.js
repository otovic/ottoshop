import Header from '../../MainComponents/header/header'
import './Home.css'
import LoginDialog from '../../SideComponents/loginDialog/loginDialog'
import BannerImages from '../../MainComponents/BannerImages/bannerimages'
import ProductStripe from '../../productsstripe/productstripe'
import CompanyPerk from '../../companyperks/company-perks'
import Footer from '../../footer/footer'

const Home = () => {
   
    return (
        <>
            <Header></Header>
            <LoginDialog></LoginDialog>
            <BannerImages></BannerImages>
            <ProductStripe title={'НАЈПРОДАВАНИЈЕ'} dataIndex={1} id={'one'}></ProductStripe>
            <ProductStripe title={'НАЈНОВИЈЕ'} dataIndex={1} id={'two'}></ProductStripe>
            <CompanyPerk></CompanyPerk>
            <Footer></Footer> 
        </>
    )
}

export default Home