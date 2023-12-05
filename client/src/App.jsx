import RouteController from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from "./layout/nav/Nav";


function App() {
  

  return (
    <>
    <Nav/>
      <RouteController/>
      <ToastContainer/>
    </>
  );
}

export default App;