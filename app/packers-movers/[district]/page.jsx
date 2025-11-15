import React from 'react'
import DistrictPage from './wrappingdistrict'

// ✅ Always receive params from Next.js and pass them down
export default function Page({ params }) {
  return <DistrictPage params={params} />
}
