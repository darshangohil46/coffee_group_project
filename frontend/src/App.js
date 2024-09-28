import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import Home from './Pages/Home';

function App({value}) {
  console.log(value.notify)
  return (
    <>
    <Header value={{'notify':value.notify,'setnotify':value.setnotify}}/>
    <Outlet/>
    </>

  )
}

export default App;
