import { useState } from 'react'
import musicMutedLogo from '../../images/musicMuted.svg'
import musicPlay from '../../images/play.svg'
import musicPause from '../../images/pause.svg'
import musicLogo from '../../images/music.svg'
import './MusicButton.css'

const audio = new Audio('/christmas.mp3')
audio.loop = true
audio.volume = 0.3

export const MusicButton = () => {
  const [isPlayingAudio, togglePlay] = useState(false)

  const playMusic = () => {
    if (isPlayingAudio) {
      audio.pause()
    } else {
      audio.play()
    }
    togglePlay(!isPlayingAudio)
  }

  return (
    <button aria-label='Music' onClick={playMusic}>
      <img alt='music logo' src={audio.muted ? musicMutedLogo : musicLogo} />
      <img
        className='music-controls'
        alt='music controls'
        src={isPlayingAudio ? musicPause : musicPlay}
      />
    </button>
  )
}
