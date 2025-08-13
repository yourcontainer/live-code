import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './Root'

const container = document.getElementById('root') as HTMLElement
createRoot(container).render(<Root />)

