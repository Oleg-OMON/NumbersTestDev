

class OrdersApiService {
    _ApiUrl = "http://127.0.0.1:8000/api/v1/orders/"
    _proxyurl = "https://cors-anywhere.herokuapp.com/";
    // функция оправки запроса
    getResponce = async (url) => {
        let responce = await fetch(url);

        if (!responce.ok) {
            throw new Error(`Could not fetch ${url}, status ${responce.status}`)
        }

        return await responce.json();
    }

    // функция получения всех заказов(GET и POST методы)
    getAllOrders = () => {
        return this.getResponce(`${this._ApiUrl}`);
    }

    // функция получения одного заказа по номеру(GET,POST,PUT
    // и DELETE методы)
    getOrder = (id) => {
        return this.getResponce(`${this._ApiUrl}+${id}/`);
    }
}


export default OrdersApiService;