import { Routes, Route,  BrowserRouter, useNavigate } from 'react-router-dom';
import { createContext, useState } from 'react';
import './css/style-min.css';
import './css/custom.css';
import './css/article.css';
import Api from './Api';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './components/Home';
import Resume from './components/Resume';

const apiToken = createContext();
const userData = createContext();

function App() {
  const {token, user} = Api();
  const [appToken, setAppToken] = useState(token);
  const userInfo = user;
  const navigate = useNavigate();

  return (
    <div>
      <apiToken.Provider value={[appToken, setAppToken]}>
        <userData.Provider value={userInfo}>
          <Header />        
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/logout' element={<Login />} />
                <Route path='/resume' element={<Resume />} />
              </Routes>
          <Footer />
        </userData.Provider>
      </apiToken.Provider>
    </div>
  );
}

export default App;
export {apiToken, userData};
