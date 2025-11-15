'use client'

import dynamic from 'next/dynamic'

const LottiePlayer = dynamic(() => import('./LottiePlayer'), { ssr: false })

export default function LottieWrapper({ src, style }) {
  return (
    <div>
      <LottiePlayer src={src} style={style} />
    </div>
  )
}
