import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Showroom from './pages/Showroom'
import Shop     from './pages/Shop'
import About    from './pages/About'
import CarDetail from './pages/CarDetail'

const qc = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Routes>
          <Route path="/"      element={<Showroom />} />
          <Route path="/shop"  element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/cars/:id" element={<CarDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}