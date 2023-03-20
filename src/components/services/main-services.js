class main_service {    
    async send_request(url, values) {
        let req_url = `http://127.0.0.1:5000/${url}`
        let counter = 0
        for(const obj in values) {
            if(counter == 0) {
                req_url = req_url + "?" + obj + "=" + values[obj]
                counter++
            } else {
                req_url = req_url + "&" + obj + "=" + values[obj]
            }
        }

        return new Promise((resolve, reject) => {
            fetch(req_url)
              .then(status => status.json()).then(data => {
                resolve(this.process_message(data));
              }).catch(error => {
                reject(error);
              });
          });
    }

    process_message(data) {
        switch(data['message']) {
            case 'adminloginsucces':
                return [true, data]
            case 'servererror': 
                return [false, 'Дошло је до грешке са сервером, покушајте касније!']
            case 'adminnotfound': 
                return [false, 'Не постоји!']
            case 'succes':
                return [true, data]
            case 'same':
                return [false, 'Мора се разликовати од већ постојећег!']
            case 'invalidinput':
                return [false, 'Поља могу садржати само слова!']
            case 'passwordnotmatch':
                return [false, 'Лозинке се не поклапају!']
            case 'wrongpassword':
                return [false, 'Погрешна стара лозинка!']
            case 'invalidphone':
                return [false, 'Погрешан формат телефона!']
            case 'noorders':
                return [false, 'Немате ниједну поруxбину!']
            case 'used':
                return [false, 'Купон је искоришћен!']
            case 'expired':
                return [false, 'Купон је истекао!']
            case 'invalid':
                return [false, 'Нетачан код!']
            case 'couponmt':
                return [false, 'Изгледа да је купон искоришћен у међувремену!']
            case 'successporudzbina':
                return [true, data]
            default:
                return [false, 'Дошло је до грешке са сервером, покушајте касније!']
        }
    }

    async getLatestProducts() {
        return new Promise((resolve, reject) => {
            fetch(`http://127.0.0.1:5000/getmostsold`)
            .then(status => status.json()).then(data => {
                    resolve([true, data])
                }).catch(error => {
                    reject([false, error])
                })
            })
    }

    async getProducts(url) {
        let req_url = `http://127.0.0.1:5000/${url}`

        return new Promise((resolve, reject) => {
            fetch(req_url)
              .then(status => status.json()).then(data => {
                resolve(this.process_message(data));
              }).catch(error => {
                reject(error);
              });
          });
    }
}

export default main_service