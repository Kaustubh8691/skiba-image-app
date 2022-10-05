import "./App.css";
import Posts from "./components/Posts";
import Add from "./components/Add";
import Login from "./components/Login";
import { BrowserRouter, Route,Routes} from 'react-router-dom';

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/posts" element={<Posts />}></Route>
      <Route path="/addImage" element={<Add />}></Route>
    </Routes>
  </BrowserRouter>
    
  );
}

export default App;