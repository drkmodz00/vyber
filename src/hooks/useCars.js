import { useQuery } from '@tanstack/react-query'
import { fetchCars } from '../api/carsApi'

export default function useCars() {
  return useQuery({
    queryKey: ['cars'],
    queryFn: fetchCars,
    staleTime: 1000 * 60 * 5,
  })
}