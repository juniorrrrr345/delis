import { Metadata } from 'next'
import AdminDashboard from '../../components/AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin - DELIS FOOD MARKET',
  description: 'Panneau d\'administration DELIS FOOD MARKET',
}

export default function AdminPage() {
  return <AdminDashboard />
}
