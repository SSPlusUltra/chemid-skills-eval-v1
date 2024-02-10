import React, { useState } from 'react'
import '../css/dropbutton.css'

export default function DropzoneButton() {
	const [uploadedJsonData, setUploadedJsonData] = useState(null)

	const handleFileChange = async (event) => {
		const file = event.target.files[0]
		if (file) {
			if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
				const formData = new FormData()
				formData.append('csvFile', file)

				try {
					const response = await fetch('http://localhost:8080/upload', {
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
					<pre>{uploadedJsonData && JSON.stringify(uploadedJsonData, null, 2)}</pre>
				</div>
				<div>
					{uploadedJsonData && <h3>Format 2:</h3>}
					{uploadedJsonData && (
						<div className='json-data'>
							<h3>Received JSON Data:</h3>
							{Object.entries(uploadedJsonData).map(([key, value]) => (
								<div key={key}>
									<h4>{key}</h4>
									{Array.isArray(value) && (
										<table>
											<thead>
												<tr>
													{Object.keys(value[0]).map((header) => (
														<th key={header}>{header}</th>
													))}
												</tr>
											</thead>
											<tbody>
												{value.map((item) => (
													<tr key={`${item.Compound}-${item.Compound.length}`}>
														{Object.values(item).map((val) => (
															<td key={`${item.Compound}-${val}`}>{val}</td>

														))}
													</tr>
												))}
											</tbody>
										</table>
									)}
									{!Array.isArray(value) && (
										<pre>{JSON.stringify(value, null, 2)}</pre>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
