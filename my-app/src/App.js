
import './App.css';

// Importação das paginas em pages

import Header from './pages/header.jsx'
import Footer from './pages/footer.jsx'
import Main_Left from './pages/main-left.jsx';
import Main_Right from './pages/main-right.jsx';

function App() {
  return (
    <div className="main">
      <Header/>
      <div className='menu_and_body'>
        <Main_Left/>
        <Main_Right/>
      </div>
      <Footer/>

    </div>
  );
}

export default App;
