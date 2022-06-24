import OrdersListItem from "../orders-list-item/orders-list-item";


const OrdersList = () => {
    return (
        <div className="list-el">
            <ul className="app-list list-froup">
                <OrdersListItem/>
            </ul>
        </div>
    )
}

export default OrdersList;