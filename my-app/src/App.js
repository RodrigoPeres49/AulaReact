
import './App.css';
import { UserProvider } from './context/usercontext.jsx';
import { BrowserRouter, Route, Routes }  from 'react-router-dom';

// Importação das paginas em pages

import Header from './pages/header.jsx'
import Footer from './pages/footer.jsx'
import Main_Left from './pages/main-left.jsx';
import Login from './pages/main_right/login.jsx';
import Register from './pages/main_right/register.jsx';
import List from './pages/main_right/people_list.jsx';

function App() {
  return (
    <div className="main">
      <Header/>
      <div className='menu_and_body'>
        <Main_Left/>
        <Routes>
          <Route path="/" Component={Login}/> {/* 👈 Renders at /app/ */}
          <Route path="/lista" Component={List}/>
          <Route path="/cadastro" Component={Register}/>
        </Routes>
      </div>
      <Footer/>
    </div>
    
  );
}

function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
export default AppWrapper;
