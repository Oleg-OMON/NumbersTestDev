import { Component } from "react";
import orderId from "react-id-generator";
import OrdersApiService from "../../services/OrdersServices";
import './orders-list-item.css';
class OrdersListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            nextpage: "",
            previouspage: "",
            orderId: ""
        }
    }

    

    componentDidMount() { 
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

    getOrder = () => {
        this.orderService.getOrder(this.state.orderId).then(res => {
            const data = {results : [res]};
            const nextpage = null
            const previouspage = null
            this.setState({data, nextpage , previouspage});
        })
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
  
    render() {
        
        const listItem = this.state.data.results?.map((item, index) => (
 
            <tr>
                <th scope="row">{index + 1}</th>
                <td><input type="number" defaultValue={item.order_id}/></td>
                <td><input type="number" defaultValue={item.price_in_dollar}/>&#36;</td>
                <td><input type="number" defaultValue={item.price_in_rub} readOnly/>&#8381;</td>
                <td><input type="text" defaultValue={item.date_delivery}/></td>
                <button type="button" className="btn btn-secondary btn-sm">Удалить</button>
                <button type="button" className="btn btn-secondary btn-sm">Обновить</button>
            </tr>
 
        ));

    return (
    <div>
        <div className='search-panel'>
            <input type='text' 
                className="form-control search-input"
                placeholder="Введите нормер заказа"
                name="orderId"
                value={this.orderId}
                onChange={this.onValueChange}>
                </input>
            <div className="search-btn">
                <button type="button"  className="btn btn-primary" onClick={this.getOrder}>Найти</button>
            </div>
            <div className="search-btn">
                <button type="button" className="btn btn-primary" onClick={this.addOrders}>Все заказы</button>
            </div>     
        </div>
        
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
