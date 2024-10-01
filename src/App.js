import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/dashboard/Dashboard';
import CreateEvent from './components/CreateEvent';
import { Toaster } from 'react-hot-toast';
import ViewEvents from './components/ViewEvents';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dashboard/' element={<Dashboard />}>
          <Route path='create-event' element={<CreateEvent />} />
          <Route path='view-events' element={<ViewEvents />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
