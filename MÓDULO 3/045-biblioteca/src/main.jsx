import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './components/root'
import Index from './components/index'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root>
      <Index />
    </Root>
  </React.StrictMode>
)
