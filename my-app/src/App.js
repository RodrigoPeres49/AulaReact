
import './css/App.css';
import { UserProvider } from './context/usercontext.jsx';
import { BrowserRouter, Route, Routes }  from 'react-router-dom';

// Importação das paginas em pages

import Header from './pages/header.jsx'
import Footer from './pages/footer.jsx'
import Main_Left from './pages/main-left.jsx';
import List from './pages/main_right/user/list/people_list.jsx';
import InactiveList from './pages/main_right/user/list/people_inactive_list.jsx';
import Login from './pages/main_right/user/operations/login.jsx';
import Register from './pages/main_right/user/operations/register.jsx';
import Edit from './pages/main_right/user/operations/edit.jsx';
import Dismiss from './pages/main_right/user/operations/dismiss.jsx';


function App() {
  return (
    <div className="main">
      <Header/>
      <div className='menu_and_body'>
        <Main_Left/>
        <Routes>
          <Route path="/" Component={Login}/> {/* 👈 Renders at /app/ */}
          <Route path="/lista" Component={List}/>
          <Route path='/lista/inativos' Component={InactiveList}></Route>
          <Route path="/cadastro" Component={Register}/>
          <Route path="/editar/:matricula" Component={Edit}/>
          <Route path="/demitir/:matricula" Component={Dismiss}/>
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
