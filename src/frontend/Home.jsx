import '../css/home.css'
import Uploadbutton from './Uploadbutton'

export default function Home() {
	return (
		<>
			<main className='brand-name'>
				<h2>DataExtractor</h2>
			</main>
			<div className='container'>
				<Uploadbutton />
			</div>

		</>
	)
}
