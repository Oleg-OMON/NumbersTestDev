import './app';
import SearchPanel from '../search-order/search-order';
import OrdersList from '../order-list/orders-list';


function App() {
    return (
        <div className='app-x'>
            <div className="search-panel">
            <SearchPanel/>
            
            </div>
            <OrdersList/>
        </div>
        
            

           
    )
}

export default App;