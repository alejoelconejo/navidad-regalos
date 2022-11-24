import { useState } from 'react'
import musicMutedLogo from '../../images/musicMuted.svg'
import musicLogo from '../../images/music.svg'
import './MusicButton.css'

const audio = new Audio('/christmas.mp3')
audio.muted = true
audio.loop = true
audio.autoplay = true
audio.volume = 0.3

export const MusicButton = () => {
  const [isAudioMuted, toggleMute] = useState(true)

  audio.muted = isAudioMuted

  return (
    <button onClick={() => toggleMute(!isAudioMuted)}>
      <img src={audio.muted ? musicMutedLogo : musicLogo} />
    </button>
  )
}
