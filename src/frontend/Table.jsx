import React from 'react'
import PropTypes from 'prop-types'

export default function Table({ data }) {
	return (
		<>
			<h3>Received JSON Data:</h3>
			{Object.entries(data).map(([key, value]) => (
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
		</>
	)
}
Table.propTypes = {
	data: PropTypes.object.isRequired
}
