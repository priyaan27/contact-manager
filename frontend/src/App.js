import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center"/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/addcontact" element={<AddEdit/>}/>
          <Route path="/update/:id" element={<AddEdit/>}/>
          <Route path="/view/:id" element={<View/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
