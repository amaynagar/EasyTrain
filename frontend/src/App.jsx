import { useState } from 'react'
import ModelSelect from './pages/model_select'
import './App.css'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import TrainModel from './pages/train_model'
import LandPage from './pages/land_page/land_page'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandPage />} />
          <Route path="/model-select" element={<ModelSelect />} />
          <Route path='/train' element={<TrainModel />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
