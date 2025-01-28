export interface TruckProps {
  id: number,
  year: string,
  make: string,
  model: string,
  description: string,
  status: string,
  image_url: string
  price?: number,
}

export interface NewTruckProps {
  year: string,
  make: string,
  model: string,
  status: string,
  description: string,
  image_file: File | null
}