import './app';
import SearchPanel from '../search-order/search-order';
import OrdersList from '../order-list/orders-list';


function App() {
    return (
        <div className="search-panel">
            <SearchPanel/>
            <OrdersList/>
        </div>
        
            

           
    )
}

export default App;