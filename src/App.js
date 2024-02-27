import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home';
import FavList from './component/FavList/FavList';
import NavbarList from './component/NavbarList/NavbarList';
  
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavbarList/>
        <Routes>
          <Route path='/' element={<Home />}> </Route>
          <Route path='/favList' element={<FavList />}> </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;