import { Metadata } from 'next'
import DelisFoodMarket from '../components/DelisFoodMarket'

export const metadata: Metadata = {
  title: 'DELIS FOOD MARKET - Produits frais et de qualité',
  description: 'DELIS FOOD MARKET - Votre épicerie de proximité pour des produits frais et de qualité. Livraison rapide, produits locaux et bio.',
  keywords: 'épicerie, produits frais, bio, local, livraison, DELIS FOOD MARKET',
  openGraph: {
    title: 'DELIS FOOD MARKET - Produits frais et de qualité',
    description: 'Découvrez notre sélection de produits frais et bio',
    type: 'website',
  }
}

export default function Home() {
  return <DelisFoodMarket />
}
