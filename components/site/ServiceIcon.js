import { Building2, Car, Home, Package, Route, Warehouse } from "lucide-react"

const MAP = {
  home: Home,
  building: Building2,
  car: Car,
  package: Package,
  route: Route,
  warehouse: Warehouse,
}

export default function ServiceIcon({ name, size = 22, className = "" }) {
  const Icon = MAP[name] || Package
  return <Icon size={size} className={className} strokeWidth={1.75} />
}
