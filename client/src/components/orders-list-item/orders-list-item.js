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

        const listItem = this.state.data?.map((item, index) => (
            
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{item.order_id}</td>
                        <td>{item.price_in_dollar}&#36;</td>
                        <td>{item.price_in_rub}&#8381;</td>
                        <td>{item.date_delivery}</td>
                    </tr>
                
            
            // 
            //     <div className="update-btn">
            //         <button type="button" className="btn btn-danger">Удалить</button>
            //     </div>
            //     <div className="update-btn">
            //         <button type="button" className="btn btn-danger">Обновить</button>
            //     </div> 
            // 
        ));
        return (
            
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Номер заказа</th>
                        <th scope="col">Цена в долларах</th>
                        <th scope="col">Цена в рублях</th>
                        <th scope="col">Срок доставки</th>
                    </tr>
                </thead>
                    <tbody>
                     {listItem}
                    </tbody>
            </table>
           
            
        )

    
    
}
}
export default OrdersListItem;