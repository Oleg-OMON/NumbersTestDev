import { Component } from "react";
import OrdersApiService from "../../services/OrdersServices";
import './orders-list-item.css';

class OrdersListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            nextpage: "",
            previouspage: "",
        }
    }

    componentDidMount() {
        this.addOrders();
        this.addNewPageOrders();
        this.addPagePreviousOrders();
    }
    
    orderService = new OrdersApiService();

    addPagePreviousOrders = () => {
        this.orderService.getAllOrders(this.state.previouspage).then(res => {
            const data = res;
            const nextpage = res.next
            const previouspage = res.previous
            this.setState({data, nextpage , previouspage});            
    })
    }

    addNewPageOrders = () => {
        this.orderService.getAllOrders(this.state.nextpage).then(res => {
            const data = res;
            const nextpage = res.next
            const previouspage = res.previous
            this.setState({data, nextpage , previouspage});            
    })
    }

      addOrders = () => {
        this.orderService.getAllOrders().then(res => {
                const data = res;
                const nextpage = res.next
                const previouspage = res.previous
                this.setState({data, nextpage , previouspage});               
        })
    }
  
    render() {

        const listItem = this.state.data.results?.map((item, index) => (
                
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td><input type="number" value={item.order_id}/></td>
                        <td><input type="number" value={item.price_in_dollar}/>&#36;</td>
                        <td><input type="number" value={item.price_in_rub} readOnly/>&#8381;</td>
                        <td><input type="text" value={item.date_delivery}/></td>
                        <button type="button" className="btn btn-secondary btn-sm">Удалить</button>
                        <button type="button" className="btn btn-secondary btn-sm">Обновить</button>
                    </tr>
                    

        ));

    return (
    <div>
        <table className="table-sm">
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

        <nav className="panel-pag">
            <ul className="pagination pagination-sm">
                <li className="page-item"><a className="page-link" href="#"onClick={this.addPagePreviousOrders}>Предыдущая</a></li>
                <li className="page-item"><a className="page-link"  href="#" onClick={this.addNewPageOrders}>Следующая</a></li>
            </ul>
        </nav>
    </div>  
    )

    
    
}
}
export default OrdersListItem;
