import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DataContext from './components/context/data-context/data-context';
import Home from './components/Routes/Home/Home';
import ResetPassword from './components/Routes/ResetPassword/resetpassword';
import { useEffect, useState } from 'react'
import RegisterUserRoute from './components/Routes/registeruser/register-user';
import ConfirmAccountRoute from './components/Routes/confirmaccount/confirmaccountcode';
import Info from './components/Routes/info/info';
import UserProfileRoute from './components/Routes/userprofile/userprofileroute';
import ShowProductsRoute from './components/Routes/showproducts/showproductsroute';
import ProductOverviewRoute from './components/Routes/productoverviewroute/productoverviewroute';
import ShoppingCartRoute from './components/Routes/shoppingcart/shoppingcartroute';
import OrderingRoute from './components/Routes/ordering/orderingroute';
import UserOrders from './components/Routes/userprofile/user-orders/userorders';

function App() {
  const [data, setData] = useState(0)
  const [loggedIn, setLoggedIn] = useState(() => {
    if(localStorage.getItem("token")) {
          var person = {
              "id": localStorage.getItem("id"),
              "name": localStorage.getItem("name"),
              "email": localStorage.getItem("email"),
              "token": localStorage.getItem("token"),
              "points": localStorage.getItem("points"),
              "surname": localStorage.getItem("surname"),
              "adress": localStorage.getItem("adress"),
              "phone": localStorage.getItem("phone"),
              "city": localStorage.getItem("city")
          }
      setData(person)
      return true
    }
    else {
      return false
    }
  })

  const [cart, setCart] = useState(() => {
    if(localStorage.getItem("cart")) 
    {
      return JSON.parse(localStorage.getItem("cart"))
    }
    return []
  })

  return (
    <DataContext.Provider value={{loggedIn, setLoggedIn, data, setData, cart, setCart}}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home></Home>}></Route>
        <Route path='resetovanjelozinke' element={<ResetPassword></ResetPassword>}></Route>
        <Route path='registracijakorisnika' element={<RegisterUserRoute></RegisterUserRoute>}></Route>
        <Route path='potvrdinalog' element={<ConfirmAccountRoute></ConfirmAccountRoute>}></Route>
        <Route path="informacije/:route" element={<Info></Info>} />
        <Route path="nalog-korisnika/profil" element={<UserProfileRoute></UserProfileRoute>} />
        <Route path="nalog-korisnika/porudzbine" element={<UserOrders></UserOrders>}></Route>
        <Route path="muskarci" element={<ShowProductsRoute index={'muskarci'}></ShowProductsRoute>}/>
        <Route path="zene" element={<ShowProductsRoute index={'zene'}></ShowProductsRoute>}/>
        <Route path="deca" element={<ShowProductsRoute index={'deca'}></ShowProductsRoute>}/>
        <Route path="ottodivision" element={<ShowProductsRoute index={'ottodivision'}></ShowProductsRoute>}/>
        <Route path="proizvod/:name" element={<ProductOverviewRoute></ProductOverviewRoute>} />
        <Route path="korpa" element={<ShoppingCartRoute></ShoppingCartRoute>} />
        <Route path="porucivanje" element={<OrderingRoute></OrderingRoute>} />
      </Routes>
    </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
