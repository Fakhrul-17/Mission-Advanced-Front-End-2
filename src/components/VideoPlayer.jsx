import { useState, useRef, useEffect } from 'react'

// Video sample yang PASTI bisa diputar
const RELIABLE_VIDEOS = [
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  'https://vjs.zencdn.net/v/oceans.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
]

function VideoPlayer({
  film,
  episode = null,
  episodeList = [],
  onClose,
  onEpisodeChange,
}) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const progressRef = useRef(null)
  const hideControlsTimerRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(true)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showEpisodeList, setShowEpisodeList] = useState(false)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [showConfirmExit, setShowConfirmExit] = useState(false)
  const [showSkipIntro, setShowSkipIntro] = useState(true)
  const [showSubtitle, setShowSubtitle] = useState(true)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [buffered, setBuffered] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [videoIndex, setVideoIndex] = useState(0)

  const isSeries = film?.isSeries
  const currentEpisode = episode || (isSeries && episodeList[0])

  function getVideoUrl() {
    if (currentEpisode?.videoUrl) return currentEpisode.videoUrl
    if (film?.videoUrl) return film.videoUrl
    const filmIndex = (parseInt(film?.id || 0) + videoIndex) % RELIABLE_VIDEOS.length
    return RELIABLE_VIDEOS[filmIndex]
  }

  const videoUrl = getVideoUrl()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setIsLoading(true)

    function handleTimeUpdate() {
      setCurrentTime(video.currentTime)
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1))
      }
    }

    function handleLoadedMetadata() {
      setDuration(video.duration)
      setIsLoading(false)
    }

    function handleCanPlay() {
      setIsLoading(false)
      video.play().catch(() => {})
    }

    function handlePlay() {
      setIsPlaying(true)
      setIsLoading(false)
    }

    function handlePause() {
      setIsPlaying(false)
    }

    function handleEnded() {
      setIsPlaying(false)
      if (isSeries && episodeList.length > 0) {
        handleNextEpisode()
      }
    }

    function handleWaiting() {
      setIsLoading(true)
    }

    function handlePlaying() {
      setIsLoading(false)
    }

    function handleError() {
      if (videoIndex < RELIABLE_VIDEOS.length - 1) {
        setVideoIndex(prev => prev + 1)
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('error', handleError)
    }
  }, [videoUrl])

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    clearTimeout(hideControlsTimerRef.current)
    if (showControls && isPlaying) {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false)
        setShowSpeedMenu(false)
        setShowVolumeSlider(false)
        setShowMobileMenu(false)
      }, 3000)
    }
    return () => clearTimeout(hideControlsTimerRef.current)
  }, [showControls, isPlaying])

  useEffect(() => {
    if (currentTime > 30) setShowSkipIntro(false)
  }, [currentTime])

  useEffect(() => {
    setShowSkipIntro(true)
  }, [currentEpisode?.number])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen()
        } else {
          handleBackClick()
        }
      }
      if (e.key === ' ') {
        e.preventDefault()
        togglePlay()
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        skipBackward()
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        skipForward()
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        adjustVolume(0.1)
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        adjustVolume(-0.1)
      }
      if (e.key === 'f' || e.key === 'F') toggleFullscreen()
      if (e.key === 'm' || e.key === 'M') toggleMute()
      setShowControls(true)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isFullscreen, isMuted, volume])

  function togglePlay() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(err => console.error('Play failed:', err))
    } else {
      video.pause()
    }
  }

  function skipBackward() {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.max(0, video.currentTime - 10)
  }

  function skipForward() {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.min(video.duration, video.currentTime + 10)
  }

  function handleProgressClick(e) {
    const video = videoRef.current
    if (!video || !progressRef.current || !duration) return
    const rect = progressRef.current.getBoundingClientRect()
    const clickX = (e.clientX || e.touches?.[0]?.clientX) - rect.left
    const percentage = clickX / rect.width
    video.currentTime = percentage * video.duration
  }

  function toggleMute() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  function handleVolumeChange(e) {
    const video = videoRef.current
    if (!video) return
    const newVolume = parseFloat(e.target.value)
    video.volume = newVolume
    setVolume(newVolume)
    if (newVolume === 0) {
      video.muted = true
      setIsMuted(true)
    } else if (video.muted) {
      video.muted = false
      setIsMuted(false)
    }
  }

  function adjustVolume(delta) {
    const video = videoRef.current
    if (!video) return
    const newVolume = Math.max(0, Math.min(1, video.volume + delta))
    video.volume = newVolume
    setVolume(newVolume)
    if (newVolume > 0 && video.muted) {
      video.muted = false
      setIsMuted(false)
    }
  }

  function changePlaybackSpeed(speed) {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = speed
    setPlaybackSpeed(speed)
    setShowSpeedMenu(false)
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  function handleNextEpisode() {
    if (!isSeries || episodeList.length === 0) return
    const currentIndex = episodeList.findIndex(ep => ep.number === currentEpisode?.number)
    if (currentIndex < episodeList.length - 1) {
      const nextEp = episodeList[currentIndex + 1]
      onEpisodeChange?.(nextEp)
      setCurrentTime(0)
    } else {
      alert('Ini episode terakhir!')
    }
  }

  function handleSelectEpisode(ep) {
    onEpisodeChange?.(ep)
    setShowEpisodeList(false)
    setCurrentTime(0)
  }

  function handleSkipIntro() {
    const video = videoRef.current
    if (video) {
      video.currentTime = Math.min(video.duration, video.currentTime + 30)
    }
    setShowSkipIntro(false)
  }

  function handleBackClick() {
    setShowConfirmExit(true)
  }

  function confirmExit() {
    setShowConfirmExit(false)
    if (isFullscreen) document.exitFullscreen()
    onClose()
  }

  function cancelExit() {
    setShowConfirmExit(false)
  }

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00'
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
  const bufferedPercent = duration > 0 ? (buffered / duration) * 100 : 0
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
      onMouseMove={() => setShowControls(true)}
      onTouchStart={() => setShowControls(true)}
    >

      {/* HTML5 VIDEO ELEMENT */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        autoPlay
        muted={isMuted}
        playsInline
        preload="auto"
        onClick={(e) => {
          e.stopPropagation()
          togglePlay()
        }}
      />

      {/* LOADING SPINNER - Responsive */}
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-white/20 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-white/70 text-xs sm:text-sm">Memuat video...</p>
          </div>
        </div>
      )}

      {/* MUTED INDICATOR - Responsive */}
      {isMuted && isPlaying && !isLoading && (
        <div
          className={`absolute top-14 sm:top-20 md:top-24 left-1/2 -translate-x-1/2 z-30 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] sm:text-xs font-medium flex items-center gap-1.5 sm:gap-2 transition-opacity max-w-[90%] ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 9l4 4m0-4l-4 4" />
          </svg>
          <span className="truncate">Klik ikon volume untuk nyalakan suara</span>
        </div>
      )}

      {/* TOMBOL KEMBALI - Responsive (Mobile: icon only, Desktop: icon + text) */}
      <button
        onClick={handleBackClick}
        className={`absolute top-2 sm:top-4 md:top-6 left-2 sm:left-4 md:left-6 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2.5 md:py-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition-all active:scale-95 group shadow-lg ${
          showControls ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
        title="Kembali (ESC)"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-1"
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-xs sm:text-sm md:text-base font-semibold">Kembali</span>
      </button>

      {/* CENTER PLAY/PAUSE BUTTON - Responsive */}
      {!isLoading && (
        <button
          onClick={togglePlay}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all active:scale-95 ring-2 ring-white/70 ${
            showControls || !isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
          }`}
        >
          {isPlaying ? (
            <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          ) : (
            <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}

      {/* LEWATI INTRO BUTTON - Responsive */}
      {isSeries && showSkipIntro && (
        <button
          onClick={handleSkipIntro}
          className={`absolute bottom-24 sm:bottom-28 md:bottom-32 right-2 sm:right-4 md:right-8 z-20 px-3 sm:px-5 md:px-6 py-1.5 sm:py-2.5 md:py-3 rounded-full bg-white text-black text-xs sm:text-sm md:text-base font-semibold hover:bg-gray-200 active:scale-95 transition-all shadow-xl ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          Lewati Intro
        </button>
      )}

      {/* BOTTOM CONTROLS BAR - Fully Responsive */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/80 to-transparent px-2 sm:px-4 md:px-6 lg:px-8 pb-2 sm:pb-4 md:pb-5 lg:pb-6 pt-10 sm:pt-14 md:pt-16 lg:pt-20 transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >

        {/* PROGRESS BAR - Responsive */}
        <div className="mb-2 sm:mb-3 md:mb-4 group">
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            onTouchStart={handleProgressClick}
            className="w-full h-1 sm:h-1.5 md:h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-2 sm:hover:h-2 md:hover:h-2.5 transition-all relative touch-none"
          >
            <div className="absolute top-0 left-0 h-full bg-white/30 rounded-full transition-all" style={{ width: `${bufferedPercent}%` }} />
            <div className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-indigo-500 rounded-full ring-2 ring-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2" />
            </div>
          </div>
          <div className="flex justify-between text-white/70 text-[9px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 font-medium tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* ============ MOBILE LAYOUT (< 640px) ============ */}
        <div className="sm:hidden">
          {/* Judul di atas untuk mobile */}
          <div className="mb-2 text-center px-2">
            <p className="text-white text-[11px] font-medium truncate">
              {film?.title}
              {isSeries && currentEpisode && (
                <span className="text-white/70"> · Ep {currentEpisode.number}</span>
              )}
            </p>
          </div>

          {/* Controls Row Mobile */}
          <div className="flex items-center justify-around">
            <button onClick={togglePlay} className="text-white p-1.5 active:scale-90 transition-transform">
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button onClick={skipBackward} className="text-white p-1.5 active:scale-90 transition-transform relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 016 6v0a6 6 0 01-6 6H8" />
              </svg>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7px] font-bold text-white mt-0.5">10</span>
            </button>

            <button onClick={skipForward} className="text-white p-1.5 active:scale-90 transition-transform relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 00-6 6v0a6 6 0 006 6h7" />
              </svg>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7px] font-bold text-white mt-0.5">10</span>
            </button>

            <button onClick={toggleMute} className="text-white p-1.5 active:scale-90 transition-transform">
              {isMuted || volume === 0 ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9l4 4m0-4l-4 4" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9" />
                </svg>
              )}
            </button>

            {isSeries && (
              <button onClick={handleNextEpisode} className="text-white p-1.5 active:scale-90 transition-transform">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
            )}

            {/* Mobile More Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-white p-1.5 active:scale-90 transition-transform"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01" />
                </svg>
              </button>

              {showMobileMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-1 min-w-[160px] z-40">
                  {isSeries && episodeList.length > 0 && (
                    <button
                      onClick={() => {
                        setShowEpisodeList(true)
                        setShowMobileMenu(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded text-white text-xs hover:bg-white/10 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      Daftar Episode
                    </button>
                  )}
                  <button
                    onClick={() => setShowSubtitle(!showSubtitle)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded text-white text-xs hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Subtitle {showSubtitle && '✓'}
                  </button>
                  <div className="px-3 py-2">
                    <p className="text-white/60 text-[10px] mb-1">Kecepatan</p>
                    <div className="flex flex-wrap gap-1">
                      {speeds.map((speed) => (
                        <button
                          key={speed}
                          onClick={() => {
                            changePlaybackSpeed(speed)
                            setShowMobileMenu(false)
                          }}
                          className={`px-2 py-1 rounded text-[10px] font-medium ${
                            playbackSpeed === speed
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white/10 text-white/70'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button onClick={toggleFullscreen} className="text-white p-1.5 active:scale-90 transition-transform">
              {isFullscreen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V5H5m4 4L4 4m11 5V5h4m-4 4l5-5M9 15v4H5m4-4l-5 5m11-5v4h4m-4-4l5 5" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ============ TABLET & DESKTOP LAYOUT (>= 640px) ============ */}
        <div className="hidden sm:flex items-center justify-between gap-3 md:gap-4">

          {/* LEFT CONTROLS */}
          <div className="flex items-center gap-4 md:gap-5 lg:gap-7">
            <button onClick={togglePlay} className="text-white hover:text-white/70 transition-colors" title="Play/Pause (Space)">
              {isPlaying ? (
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button onClick={skipBackward} className="text-white hover:text-white/70 transition-colors relative" title="Skip 10s ke belakang">
              <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 016 6v0a6 6 0 01-6 6H8" />
              </svg>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] md:text-[9px] lg:text-[10px] font-bold text-white mt-0.5">10</span>
            </button>

            <button onClick={skipForward} className="text-white hover:text-white/70 transition-colors relative" title="Skip 10s ke depan">
              <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 00-6 6v0a6 6 0 006 6h7" />
              </svg>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] md:text-[9px] lg:text-[10px] font-bold text-white mt-0.5">10</span>
            </button>

            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <button onClick={toggleMute} className="text-white hover:text-white/70 transition-colors" title="Volume">
                {isMuted || volume === 0 ? (
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9l4 4m0-4l-4 4" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9" />
                  </svg>
                )}
              </button>

              <div className={`overflow-hidden transition-all ${showVolumeSlider ? 'w-20 md:w-24 ml-2 opacity-100' : 'w-0 ml-0 opacity-0'}`}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* CENTER - JUDUL */}
          <div className="flex-1 text-center px-2 hidden md:block">
            <p className="text-white text-sm md:text-base font-medium truncate">
              {film?.title}
              {isSeries && currentEpisode && (
                <span> Episode {currentEpisode.number}: {currentEpisode.title}</span>
              )}
            </p>
          </div>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-4 md:gap-5 lg:gap-7">
            {isSeries && (
              <button onClick={handleNextEpisode} className="text-white hover:text-white/70 transition-colors" title="Episode Berikutnya">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
            )}

            {isSeries && episodeList.length > 0 && (
              <button onClick={() => setShowEpisodeList(!showEpisodeList)} className="text-white hover:text-white/70 transition-colors" title="Daftar Episode">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
            )}

            <button onClick={() => setShowSubtitle(!showSubtitle)} className={`transition-colors ${showSubtitle ? 'text-white' : 'text-white/50 hover:text-white'}`} title="Subtitle">
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>

            <div className="relative">
              <button onClick={() => setShowSpeedMenu(!showSpeedMenu)} className="text-white hover:text-white/70 transition-colors relative" title="Kecepatan">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                </svg>
                {playbackSpeed !== 1 && (
                  <span className="absolute -top-1 -right-2 text-[9px] font-bold text-indigo-400 bg-black/50 rounded px-1">
                    {playbackSpeed}x
                  </span>
                )}
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-1 min-w-[100px]">
                  {speeds.map((speed) => (
                    <button
                      key={speed}
                      onClick={() => changePlaybackSpeed(speed)}
                      className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-white/10 transition-colors ${
                        playbackSpeed === speed ? 'text-indigo-400 font-bold' : 'text-white'
                      }`}
                    >
                      {speed}x {playbackSpeed === speed && '✓'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={toggleFullscreen} className="text-white hover:text-white/70 transition-colors" title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}>
              {isFullscreen ? (
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V5H5m4 4L4 4m11 5V5h4m-4 4l5-5M9 15v4H5m4-4l-5 5m11-5v4h4m-4-4l5 5" />
                </svg>
              ) : (
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* EPISODE LIST SIDEBAR - Responsive */}
      {isSeries && showEpisodeList && (
        <div className="absolute top-0 right-0 bottom-0 w-full sm:w-80 md:w-96 bg-zinc-900/95 backdrop-blur-xl border-l border-white/10 z-40 overflow-y-auto animate-slide-in-right">
          <div className="sticky top-0 bg-zinc-900 border-b border-white/10 p-3 sm:p-4 flex items-center justify-between">
            <h3 className="text-white text-sm sm:text-base font-bold">Daftar Episode</h3>
            <button onClick={() => setShowEpisodeList(false)} className="text-white/60 hover:text-white w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-2 sm:p-3 space-y-2">
            {episodeList.map((ep) => (
              <button
                key={ep.number}
                onClick={() => handleSelectEpisode(ep)}
                className={`w-full flex gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg text-left transition-all ${
                  currentEpisode?.number === ep.number
                    ? 'bg-indigo-600/30 ring-2 ring-indigo-500'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="relative w-20 sm:w-24 aspect-video rounded-md overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${ep.thumbnail || film.url}')` }} />
                  {currentEpisode?.number === ep.number ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-white text-xs sm:text-sm font-semibold">Episode {ep.number}</p>
                    {currentEpisode?.number === ep.number && (
                      <span className="text-indigo-400 text-[9px] sm:text-[10px] font-bold">SEDANG DIPUTAR</span>
                    )}
                  </div>
                  <p className="text-white/70 text-[10px] sm:text-xs truncate">{ep.title}</p>
                  <p className="text-white/50 text-[10px] sm:text-[11px] mt-0.5 sm:mt-1">{ep.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI KELUAR - Responsive */}
      {showConfirmExit && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 max-w-sm sm:max-w-md w-full shadow-2xl">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>

            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold text-center mb-2">
              Kembali ke Beranda?
            </h3>
            <p className="text-white/70 text-xs sm:text-sm text-center mb-5 sm:mb-6">
              Apakah kamu yakin ingin berhenti menonton "{film?.title}"?
              {isSeries && ' Progres tontonan akan tersimpan.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button onClick={cancelExit} className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-colors">
                Lanjut Menonton
              </button>
              <button onClick={confirmExit} className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-lg">
                Ya, Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer