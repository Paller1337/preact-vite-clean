import { useEffect, useRef, useState } from 'preact/hooks'


export default function VideoContainer() {
    const [isPause, setIsPause] = useState(false)
    const videoRef = useRef(null)
    const [firstPlay, setFirstPlay] = useState(false)
    const [pauseHovered, setPauseHovered] = useState(false)

    const changeState = () => {
        setIsPause(p => !p)
        setFirstPlay(true)
    }
    
    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current as HTMLVideoElement
            isPause ? video.play() : video.pause()
        }
    }, [videoRef.current, isPause])


    return (<>
        <div className='video-about__video-container'>
            <div className={`video-about__video-action video-action  ${isPause ? 'playing' : ''} ${pauseHovered ? 'pause-hovered' : ''}`}
                onClick={changeState}>

                {!firstPlay ?
                    <div className='video-action__btn'>
                        <img src='/svg/play.svg' alt='' width={256} height={256} />
                        <span className='video-action__text'>Смотреть видео</span>
                    </div>
                    :
                    <div className='video-action__btn' onMouseLeave={() => setPauseHovered(false)} onMouseEnter={() => setPauseHovered(true)}>
                        <img src='/svg/play.svg' alt='' width={256} height={256} />
                        <span className='video-action__text'>пауза</span>
                    </div>
                }
            </div>

            <video ref={videoRef} className='video-about__video' loop muted playsInline>
                <source src={'/video/main-video.mp4'} type='video/mp4'></source>
            </video>
        </div >
    </>)
}