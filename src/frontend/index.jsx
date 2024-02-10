import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '../css/index.css'
import React from 'react'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<MantineProvider>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</MantineProvider>
	</BrowserRouter>
)
