
import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './components/app'
import api from '../src/services'

injectTapEventPlugin()

render(<App name='job-search' api={api}/>, document.querySelector('main'))
console.log('welcome to job-search')
