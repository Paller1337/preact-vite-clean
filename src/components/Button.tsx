export default function Button(props) {

    return (<>
        <button className={`main-button ${props.red ? 'red' : ''}`}>
            <span className={'main-button__text'}>{props.text}</span>
            <div className='main-button__main'>
                <div className='main-button__flare' />
            </div>
            <div className='main-button__light' />
            <div className='main-button__before' />
            <div className='main-button__after'>
                <div className='main-button__after--block' />
                <div className='main-button__after--block' />
                <div className='main-button__after--block' />
                <div className='main-button__after--block' />
            </div>
        </button>
    </>)
}