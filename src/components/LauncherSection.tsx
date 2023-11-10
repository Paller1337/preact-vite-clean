import { useEffect, useRef, useState } from 'preact/hooks';
import Button from './Button'

import ScrollTrigger from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
gsap.registerPlugin(ScrollTrigger)

export default function LauncherSection(props) {
    const launcherContainer = useRef(null)
    const [uiPos, setUiPos] = useState(50)
    useEffect(() => {
        const trigger = launcherContainer.current

        const updateUiPos = (self) => {
            const progress = self.progress // Прогресс прокрутки от 0 до 1
            const newPos = 10 - progress * 50 // Новое значение uiPos от 50 до 0
            setUiPos(newPos)
        }

        ScrollTrigger.create({
            trigger: trigger,
            start: 'top center',
            end: 'bottom-=800 center',
            scrub: true, 
            onUpdate: updateUiPos, 
            // markers: true,
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <section ref={launcherContainer} className='launcher layout'>
            <img src='/images/launcher-ui.png' alt='' className='launcher__ui'
                style={{
                    transform: `translate(-50%, ${uiPos}%)`
                }} />
            <div className='launcher__content'>
                <div className='launcher__ell' />
                <span className='launcher__text'>
                    Присоединяйся к нашему удивительному лаунчеру и стань частью нашей большой семьи!
                </span>
                <Button text='Скачать лаунчер' red />
            </div>
        </section>
    )
}