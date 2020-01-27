import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { GlobalStyle } from './global-style'
import { FileUploader } from './components/Container/FileUploader'

console.info(`⚛️ ${React.version}`)

const App = () => {
  const [url, setUrl] = useState()

  return (
    <>
      <GlobalStyle />
      <FileUploader url={url} onChange={(url: string) => setUrl(url)} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

module.hot && module.hot.accept()
