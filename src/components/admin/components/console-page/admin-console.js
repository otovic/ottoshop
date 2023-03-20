import { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import DataContext from '../../../context/data-context/data-context';
import AddProduct from "./admin-add-product/admin-add-product";
import './admin-console.css'
import BannerImagesUpload from "./banner-images/admin-banner-images";

const AdminConsole = () => {
    const navigate = useNavigate()
    const { adminData, adminLoggedIn, setAdminLoggedIn } = useContext(DataContext)
    const [menuClass, setMenuClass] = useState('admin-console-side-menu-no')
    const [currentOption, setCurrentOption] = useState(<BannerImagesUpload></BannerImagesUpload>)

    useEffect(() => {
        setTimeout(() => {
            if(!adminLoggedIn)
                navigate('/')      
        })
    }, [adminLoggedIn])

    function show_menu() {
        if(menuClass == 'admin-console-side-menu-no') {
            setMenuClass('admin-console-side-menu-yes')
        } else {
            setMenuClass('admin-console-side-menu-no')
        }
    }

    function switchOption(num) {
        switch(num) {
            case 1:
                setCurrentOption(<BannerImagesUpload></BannerImagesUpload>)
                break
            case 2:
                setCurrentOption(<AddProduct></AddProduct>)
                break
        }
    }

    return (
        <>
            <div id='page-container'>
                <div id="admin-console-header">
                    <div id="header-left-menu">
                        <img src="/menu-short.png" width={'50px'} height={'50px'} onClick={show_menu}></img>
                    </div> 
                    <div id="header-center-menu">
                        <img src="/logo.png" width={'70px'} height={'70px'}></img>
                    </div>
                    <div id="header-right-menu">
                        <p>{adminData.name}</p>
                    </div>
                </div>
                <div className={menuClass}>
                    <div id="side-menu-title">
                        <img src="/menu-short.png" width={'50px'} height={'50px'} onClick={show_menu}></img>
                    </div>
                    <div id="side-menu-tabs">
                        <h2 onClick={() => switchOption(1)}>Банер слике</h2>
                        <h2 onClick={() => switchOption(2)}>Додај производ</h2>
                    </div>
                </div>
                {currentOption}
            </div>
        </>
    )
}
export default AdminConsole