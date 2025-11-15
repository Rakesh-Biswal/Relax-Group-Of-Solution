'use client'
import { Player } from '@lottiefiles/react-lottie-player'

export default function LottiePlayer({ src, style, autoplay = true, loop = true }) {
  return (
    <Player
      autoplay={autoplay}
      loop={loop}
      src={src}
      style={style}
    />
  )
}
