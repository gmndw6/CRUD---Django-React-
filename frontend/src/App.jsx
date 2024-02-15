import {Routes, Route} from 'react-router-dom'
import Home from './component/Home';
import Create from './component/Create';
import About from './component/About';
import Navbar from './component/Navbar';
import Edit from './component/Edit';
import Delete from './component/Delete';
function App() {
  const width = 220
  return (
    <div className="App">

      <Navbar
        drawerWidth={width}
        content = {
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/create" element={<Create/>} />
            <Route path="/edit/:id" element={<Edit/>} />
            <Route path="/delete/:id" element={<Delete/>} />
          </Routes>
        }
      />
    </div>
  );
}

export default App;
