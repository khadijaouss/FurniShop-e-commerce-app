import React ,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import './App.css';
import AppNavBar from './components/AppNavBar';
import AppBanner from './components/AppBanner';
import ProductsList from './components/ProductsList';
import ProductDetails from './components/ProductDetails';


function App() {
  const [isPressed,setIsPressed]=useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const handleItemSelect = (item) => {
    setIsPressed(true);
    setSelectedItem(item);
  };

  return (
    <div className="App">
      {isPressed ? (
        <>
        <ProductDetails item={selectedItem} />
        
        </>
      ) : (
        <>
          <AppNavBar />
          <AppBanner />
          <ProductsList handleItemSelect={handleItemSelect} />
        </>
      )}
    </div>
  );
}

export default App;

