import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MobileFooter from './components/MobileFooter'
import AboutUs from './pages/AboutUs'
import Home from './pages/Home'
import MaterialsConsultancy from './pages/MaterialsConsultancy'
import ProductionConsultancy from './pages/ProductionConsultancy'
import ProductionServices from './pages/ProductionServices'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/materials-consultancy" element={<MaterialsConsultancy />} />
        <Route path="/production-consultancy-services" element={<ProductionServices />} />
        <Route path="/production-consultancy" element={<ProductionConsultancy />} />
      </Routes>
      <MobileFooter />
    </>
  )
}

export default App
