import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import MaterialsConsultancy from './pages/MaterialsConsultancy'
import ProductionConsultancy from './pages/ProductionConsultancy'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materials-consultancy" element={<MaterialsConsultancy />} />
        <Route path="/production-consultancy" element={<ProductionConsultancy />} />
      </Routes>
    </>
  )
}

export default App
