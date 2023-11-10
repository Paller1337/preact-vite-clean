import { useEffect, useRef, useState } from 'preact/hooks';

export default function Header(props) {

    return (<>
        <header className={'header layout'}>
            <div className='header__wrapper'>
                <HeaderItem text='что такое майнкрафт?' index={1} />
                <HeaderItem text='Как начать играть?' index={2} />
                <HeaderItem text='Скачать лаунчер' index={3} />
            </div>
        </header>
    </>)
}


const HeaderItem = (props) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [backgroundPos, setBackgroundPos] = useState('0% 0%')
    const [circleVisible, setCircleVisible] = useState(false)
    const containerRef = useRef(null);

    const onMouseMove = (event) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left - 10; // учитываем позицию контейнера и вычитаем половину размера круга
            const y = event.clientY - rect.top - 10;
            setPosition({ x, y })
        }
    };

    const onTextMouseMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - 10; // учитываем позицию контейнера и вычитаем половину размера круга
        const y = e.clientY - rect.top - 10;
        setBackgroundPos(`${x}px ${y}px`)
    };

    const handleMouseEnter = () => {
        setCircleVisible(true)
    };

    const handleMouseLeave = () => {
        setCircleVisible(false)
    }

    return (<>
        <div
            ref={containerRef}
            className='header__item'
            onMouseMove={onMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`header__item-circle ${circleVisible ? 'visible' : ''}`}
                style={{
                    // Примените вычисленное смещение к свойству transform
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`
                }}
            />
            <span className='header__item-text'
                // onMouseMove={onTextMouseMove}
                // style={{
                //     backgroundImage: `radial-gradient(3% 900% at ${backgroundPos}, ${circleVisible ? 'rgba(0, 59, 72, 0.32)' : 'rgba(255, 255, 255, 1)'}, rgba(255, 255, 255, 1))`,
                // }}
            >{props.text}</span>
            {/* <span className='header__item-text-back'>{props.text}</span> */}
            <div className='header__item-after'>
                {Array.from({ length: props.index }, (_, index) => (
                    <div key={index} className='header__item-after--ell' />
                ))}
            </div>
        </div>
    </>)
}