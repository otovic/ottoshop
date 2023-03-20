class UserService
{
    static getUserPoints()
    {
        if (localStorage.getItem('points'))
            return JSON.parse(localStorage.getItem('points'))
        
        return 0
    }
}

export default UserService