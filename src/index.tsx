import { render } from 'preact'
import './style/main.sass'
import './style/components.sass'
import './style/config.sass'
import './style/reset.css'


import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

export function App() {

	return (<>
		<main>
			Hello
		</main>
	</>)
}

render(<App />, document.getElementById('app'))
