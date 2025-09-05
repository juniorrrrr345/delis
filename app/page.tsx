import { Metadata } from 'next'
import HomePage from '../components/HomePage'

export const metadata: Metadata = {
  title: 'DELIS FOOD MARKET - Produits frais et de qualité',
  description: 'DELIS FOOD MARKET - Votre épicerie de proximité pour des produits frais et de qualité. Livraison rapide, produits locaux et bio.',
}

export default function Home() {
  return <HomePage />
}
