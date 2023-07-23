import './app.css'
import PageRouter from './components/PageRouter'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <PageRouter/>
    </div>
  )
}

export default App
