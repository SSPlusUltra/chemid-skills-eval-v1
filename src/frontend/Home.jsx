import '../css/home.css'
import DropzoneButton from './Dropbutton'

export default function Home() {
	return (
		<>
			<main className='brand-name'>
				<h2>DataExtractor</h2>
			</main>

			<div className='container'>
				<div>
					<DropzoneButton />
				</div>

			</div>

		</>
	)
}
