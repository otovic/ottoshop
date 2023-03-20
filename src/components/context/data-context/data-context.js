import { createContext } from "react";

const DataContext = createContext({
    loggedIn: false,
    data: {},
    adminLoggedIn: false,
    adminData: {},
    setLoggedIn: (index) => {},
    setData: (index) => {},
    setAdminLoggedIn: (index) => {},
    setAdminData: (index) => {},
    cart: [],
    setCart(index) {}
})

export default DataContext