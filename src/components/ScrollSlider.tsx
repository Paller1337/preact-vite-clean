
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'preact/hooks'
import Button from './Button'

import { gsap } from 'gsap'
gsap.registerPlugin(ScrollTrigger)


export default function ScrollSlider() {
    const [pinFixed, setPinFixed] = useState(false)
    const scrollSliderImageRef = useRef(null)
    const firstTriggerRef = useRef(null)
    const secondTriggerRef = useRef(null)
    const thirdTriggerRef = useRef(null)
    const sliderContainerRef = useRef(null)
    const scrollImageRef = useRef(null)

    const [fixedTopPosition, setFixedTopPosition] = useState(0)
    const [currentImage, setCurrentImage] = useState(0)

    const [triggerPosition, setTriggerPosition] = useState(0)
    const [imageWrapperStyle, setImageWrapperStyle] = useState({
        width: 0,
        height: 0,
    })

    // useEffect(() => console.log('fin pixed: ', triggerPosition))

    const slidesRef = useRef([])
    const pinSlides = [
        '/images/pin/1.png',
        '/images/pin/2.png',
        '/images/pin/3.png',
    ]

    const handlePin = () => {
        setPinFixed(p => !p)
    }

    useEffect(() => {
        if (scrollSliderImageRef.current) {
            const imageWrapper = scrollSliderImageRef.current as HTMLDivElement
            setImageWrapperStyle({
                height: imageWrapper.clientHeight,
                width: imageWrapper.clientWidth,
            })
        }
    }, [scrollSliderImageRef, firstTriggerRef])

    const calcTriggerPosition = () => {
        const parentRect = sliderContainerRef.current.getBoundingClientRect()
        const childRect = scrollImageRef.current.getBoundingClientRect()
        const relativeOffsetTop = childRect.top - parentRect.top
        setTriggerPosition(relativeOffsetTop)
    }

    useEffect(() => {
        const triggers = [firstTriggerRef.current, secondTriggerRef.current, thirdTriggerRef.current];
        const sliderImageRef = scrollSliderImageRef.current as HTMLDivElement

        const startPosition = sliderImageRef.getBoundingClientRect().top + window.scrollY;

        triggers.forEach((trigger, index) => {
            ScrollTrigger.create({
                trigger: trigger,
                start: index === 0 ? 'top center' : 'top-=150 center',
                end: index === 2 ? 'bottom-=400 center' : 'bottom center',
                onEnter: () => {

                    setCurrentImage(index)
                    setPinFixed(true)
                    if (index === 0) {
                        const trPos = startPosition - window.scrollY
                        setFixedTopPosition(trPos) //устанавливаем отступ top для fixed
                    }
                },
                onLeave: () => {
                    if (index === triggers.length - 1) {
                        if (sliderContainerRef.current && scrollImageRef.current) {
                            calcTriggerPosition()
                        }

                        setPinFixed(false);
                    }
                },
                onEnterBack: () => {
                    setCurrentImage(index)
                    setPinFixed(true)
                },
                onLeaveBack: () => {
                    if (index === 0) {
                        setPinFixed(false)
                        calcTriggerPosition()
                    } else {
                        setCurrentImage(index - 1)
                    }
                },
                // markers: true,
            });
        });

        // Удалите ScrollTriggers при размонтировании
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (<>
        <div ref={sliderContainerRef} className='what-is__scroll-slider scroll-slider container'>
            <div className='scroll-slider__scroll-area'>
                <div ref={scrollSliderImageRef} className='scroll-slider__pin-space'>
                    <div ref={scrollImageRef} className={`scroll-slider__images-wrap ${pinFixed ? 'fixed' : ''}`}
                        style={{
                            width: pinFixed ? `${imageWrapperStyle.width}px` : `${imageWrapperStyle.width || 0}px`,
                            height: pinFixed ? `${imageWrapperStyle.height}px` : `${imageWrapperStyle.height || 0}px`,
                            top: pinFixed ? `${fixedTopPosition}px` : `${triggerPosition}px`,
                        }}>
                        {pinSlides.map((src, index) => (
                            <picture key={'slide-' + index}>
                                <source type="image/jpeg" srcset={src} />
                                <img
                                    alt=""
                                    class={`scroll-slider__image ${currentImage === index ? 'visible' : 0}`}
                                    src="undefined"
                                />
                            </picture>
                        ))}

                    </div>
                </div>
                <div className='scroll-slider__content-wrap'>
                    <div className='m-container' onClick={handlePin} ref={firstTriggerRef}>
                        <span className='m-title'>Создай и Выживи!</span>
                        <span className='m-text'>Собери ресурсы, построй убежище и остерегайся монстров, которые появляются ночью.</span>
                        <Button text='Скачать' />
                    </div>

                    <div className='m-container' ref={secondTriggerRef}>
                        <span className='m-title'>Вместе Веселее!</span>
                        <span className='m-text'>Играй с друзьями онлайн! Стройте, исследуйте и приключайтесь вместе.</span>
                        <Button text='Скачать' />
                    </div>

                    <div className='m-container' ref={thirdTriggerRef}>
                        <span className='m-title'>Творчество Без Границ!</span>
                        <span className='m-text'>В режиме "Творчество" у тебя есть все блоки и материалы. Строй свои шедевры!</span>
                        <Button text='Скачать' />
                    </div>
                </div>
            </div>
        </div>
    </>)
}