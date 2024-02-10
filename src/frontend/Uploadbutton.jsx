import React, { useState } from 'react'
import '../css/dropbutton.css'
import Table from './Table'

export default function Uploadbutton() {
	const [uploadedJsonData, setUploadedJsonData] = useState(null)

	const handleFileChange = async (event) => {
		const file = event.target.files[0] /* file handling logic and api communication */
		if (file) {
			if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
				const formData = new FormData()
				formData.append('csvFile', file)
				try {
					const response = await fetch('http://localhost:8080/upload', { /* sending uploaded file to api */
						method: 'POST',
						body: formData
					})

					if (response.ok) {
						const uploadedData = await response.json()
						setUploadedJsonData(uploadedData)
						console.log('Received JSON data:', uploadedData)
					}
					else {
						console.error('Error uploading file:', response.statusText)
					}
				}
				catch (error) {
					console.error('Error uploading file:', error.message)
				}
			}
			else {
				console.error('Please select a CSV file.')
			}
		}
	}

	return (
		<div className='file-input-container'>
			<label htmlFor='file-upload' className='custom-file-upload'>
				<input
					id='file-upload'
					type='file'
					accept='.csv'
					onChange={handleFileChange}
					className='file-input'
				/>
				Choose a CSV file
			</label>
			<div className='val-container'>
				<div>
					{uploadedJsonData && <h3>Format 1:</h3>}
					{/* displaying format1: json format */}
					<pre>{uploadedJsonData && JSON.stringify(uploadedJsonData, null, 2)}</pre>
				</div>
				<div>
					{/* displaying format2: table format */}
					{uploadedJsonData && <h3>Format 2:</h3>}
					{uploadedJsonData && <Table data={uploadedJsonData} />}
				</div>
			</div>
		</div>
	)
}
