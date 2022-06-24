import { Component } from "react";
import OrdersApiService from "../../services/OrdersServices";

class OrdersListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
    }
    }

    componentDidMount() {
        this.addOrders();
    }
    

    orderService = new OrdersApiService();
    addOrders = () => {
        this.orderService.getAllOrders().then(res => {
            
                const data = res;
                this.setState({data});            
        })
    }
  

    render() {

        const listItem = this.state.data?.map((item) => (
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item">{item.order_id}</li>
                <li className="list-group-item">{item.price_in_dollar}</li>
                <li className="list-group-item">{item.price_in_rub}</li>
                <li className="list-group-item">{item.date_delivery}</li>
                <div className="update-btn">
                    <button type="button" className="btn btn-danger">Удалить</button>
                </div>
                <div className="update-btn">
                    <button type="button" className="btn btn-danger">Обновить</button>
                </div> 
            </ul>
        ));
        return (
            
            <div>{listItem}</div>
           
            
        )

    
    
}
}
export default OrdersListItem;