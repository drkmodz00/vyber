import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: 'application/json' },
})

export const fetchCars = () =>
  api.get('/cars').then(r => r.data.data)

export const fetchCar = (id) =>
  api.get(`/cars/${id}`).then(r => r.data.data)  // ← add .data here