import { useEffect, useRef, useState } from 'preact/hooks'


function Card(props) {

    return (<>
        <div className='pets-cards__item' style={{ backgroundImage: `url(${props.background})` }}>
            <img className='pets-cards__item-img' src={props.pet} alt='' height={405} width={410} />
            <div className='pets-cards__item-text'>{props.text}</div>
        </div>
    </>)
}

export default function PetCards() {
    const containerRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [autoScroll, setAutoScroll] = useState(null)

    useEffect(() => {
        // Начать автоматическую прокрутку вправо
        startAutoScroll('right')

        // Очистить интервал при размонтировании компонента
        return () => {
            if (autoScroll) clearInterval(autoScroll)
        }
    }, [])


    // Функция для автоматической прокрутки
    const startAutoScroll = (direction) => {
        setAutoScroll(setInterval(() => {
            if (containerRef.current) {
                containerRef.current.scrollLeft += (direction === 'right' ? 1 : -1)
            }
        }, 10))
    }

    // Остановить автоматическую прокрутку при взаимодействии пользователя
    const stopAutoScroll = () => {
        if (autoScroll) clearInterval(autoScroll)
    }

    const onMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - containerRef.current.offsetLeft)
        setScrollLeft(containerRef.current.scrollLeft)
        stopAutoScroll()
    }

    const onMouseLeave = () => {
        setIsDragging(false)
        // Можно добавить логику для возобновления автоматической прокрутки, если нужно
    }

    const onMouseUp = () => {
        setIsDragging(false)
        // Можно добавить логику для возобновления автоматической прокрутки, если нужно
        const timeout = setTimeout(() => startAutoScroll('right'), 1600)
        return () => clearTimeout(timeout)
    }

    const onMouseMove = (e) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - containerRef.current.offsetLeft
        const walk = (x - startX) * 2  // Умножение на 2 для увеличения скорости прокрутки
        containerRef.current.scrollLeft = scrollLeft - walk
    }

    return (<>
        <div className='pets-cards'
            ref={containerRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
            <Card background={'/images/cards/1.png'} pet={'/images/pets/1.png'} text='волчок' />
            <Card background={'/images/cards/2.png'} pet={'/images/pets/2.png'} text='Котик' />
            <Card background={'/images/cards/3.png'} pet={'/images/pets/3.png'} text='Попугайчик' />
            <Card background={'/images/cards/4.png'} pet={'/images/pets/4.png'} text='Лошадка' />
            <Card background={'/images/cards/5.png'} pet={'/images/pets/5.png'} text='Лама' />
            <Card background={'/images/cards/6.png'} pet={'/images/pets/6.png'} text='Дельфинчик' />
            <Card background={'/images/cards/7.png'} pet={'/images/pets/7.png'} text='Лисичка' />
            <Card background={'/images/cards/8.png'} pet={'/images/pets/8.png'} text='Черепашка' />
            <Card background={'/images/cards/9.png'} pet={'/images/pets/9.png'} text='Пчелка' />
            <Card background={'/images/cards/10.png'} pet={'/images/pets/10.png'} text='паучок' />
        </div>
    </>)
}