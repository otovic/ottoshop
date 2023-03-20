import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ConfirmAccountRoute = () => {
    const [code, setCode] = useState('')
    const navigate = useNavigate()

    function ConfirmAccount() {
        const queryParams = new URLSearchParams(window.location.search)
        setCode(queryParams.get("code"))
        if(code != '')
            sendRequest()
    }

    async function sendRequest() {
        if(code != '') {
            const status = await fetch(`http://127.0.0.1:5000/confirmaccount?code=${code}`)
            status.json().then(async (data) => {
                console.log(data)
                switch(data['message']) {
                    case 'succes':
                        navigate('/')
                        break
                    case 'error':
                        alert('Greska')
                        break
                }
            })
        }
    }

    useEffect(() => {
        ConfirmAccount()
    }, [code])

    return (
            <p>{code}</p>
    )
}

export default ConfirmAccountRoute