import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="App">
          <header className="App-header">
            <button className="btn btn-primary">Test button</button>
          </header>
        </div>
    </>
  )
}

export default App
