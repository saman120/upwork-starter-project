import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalStyle } from './global-style'
import { FileUploadContainer } from './components/Container/FileUploadContainer';

console.info(`⚛️ ${React.version}`)

const App = () => (
  <>
    <GlobalStyle />
    <FileUploadContainer />
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))

module.hot && module.hot.accept()
