import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router, Switch, Route, BrowserRouter, Routes} from 'react-router-dom';
import './App.css';

function App() {
  return (
  
    <Router>
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<><Banner/><Movies/></>}/>
      <Route path='/favourites' Component={Favourite}/>
      
      
      {/* <Movies/> */}
      {/* <Favourite/> */}
      </Routes>
    </Router>
    
  );
}

export default App;
