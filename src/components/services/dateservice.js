class DateService{
    TimeDifference(currentDate, previousDate)
    {
        let difference = currentDate.getTime() - previousDate.getTime();
        return difference;
    }

    stringToDate(date)
    {
        let date_arr = date.split('-')
        let date_obj = new Date(date_arr[0], date_arr[1], date_arr[2], date_arr[3], date_arr[4], date_arr[5])
        return date_obj
    }

    getDateAsString()
    {
        let date = new Date()
        let date_str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds()
        return date_str
    }
}

export default DateService