import { useEffect } from 'react'
import { useState } from 'react'
import './bannerimages.css'

const BannerImages = () => {
    const [bannerPath, setbannerPath] = useState(null)
    let numOfBanners = 2
    const [selectedBanner, setSelectedBanner] = useState(1)

    function nextBanner() {
        if(selectedBanner + 1 <= numOfBanners) 
            setSelectedBanner(selectedBanner + 1)
    }

    function previousBanner() {
        if(selectedBanner - 1 > 0)
            setSelectedBanner(selectedBanner - 1)
    }

    function change(){
        if(window.innerWidth > 1149) {
            if(bannerPath != null) {
                if(bannerPath != `/banners/${selectedBanner}-1200.jpg`) {
                    setbannerPath('/banners/'+ selectedBanner + '-1200.jpg')
                }
            }
        }
        else if(window.innerWidth <= 1149 && window.innerWidth > 601) {
            if(bannerPath != null) {
                if(bannerPath != `/banners/${selectedBanner}-900.jpg`)
                    setbannerPath(`/banners/${selectedBanner}-900.jpg`)
            }
        }
        else if(window.innerWidth <= 600) {
            if(bannerPath != null) {
                if(bannerPath != `/banners/${selectedBanner}-600.jpg`)
                    setbannerPath(`/banners/${selectedBanner}-600.jpg`)
            }
        }
    }

    useEffect(() => {
        if(window.innerWidth > 1149) {
            setbannerPath(`/banners/${selectedBanner}-1200.jpg`)
        }
        else if(window.innerWidth <= 1149 && window.innerWidth > 601) {
            setbannerPath(`/banners/${selectedBanner}-900.jpg`)
        }
        else if(window.innerWidth <= 600) {
            setbannerPath(`/banners/${selectedBanner}-600.jpg`)
        }

        const timeout = setTimeout(() => {
            if(selectedBanner + 1 > numOfBanners)
                setSelectedBanner(1)
            else 
                setSelectedBanner(selectedBanner + 1)
        }, 7000)
        
        window.addEventListener('resize', change)

        return () => {
            clearTimeout(timeout)
            window.removeEventListener('resize', change)
        }

    }, [selectedBanner, bannerPath])

    return (
        <div id="banner-images-container">
            <div id='banner-image'>
                <img src={bannerPath} width="auto"></img>
                {numOfBanners > 1 ? <><div id='banner-left-swipe' onClick={previousBanner}>
                    <p>{'<'}</p>
                </div>
                <div id='banner-right-swipe' onClick={nextBanner}>
                    <p>{'>'}</p>
                </div></> : <p>Petar</p>}
            </div>
        </div>
    )
}

export default BannerImages