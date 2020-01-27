import React, { useState } from 'react'
import styled from 'styled-components'
import { LogoContainer } from './LogoContainer'
import { DragDropBox } from './DragDropBox'

type FileUploaderType = {
  url: string
  onChange: (url: string) => void
}

const FileUploader: FC<FileUploaderType> = ({ url, onChange, className }) => {
  return (
    <div className={className}>
      <LogoContainer />
      <div className="horizontal-line" />
      <DragDropBox url={url} onChange={onChange} />
    </div>
  )
}

const StyledFileUploader = styled(FileUploader)`
  align-self: center;
  margin: 0 auto;
  position: relative;
  width: 400px;
  height: 590px;

  background: #ffffff;
  border: 1px solid #e8f1fb;
  box-sizing: border-box;

  .horizontal-line {
    height: 1px;
    background: #e8f1fb;
  }
`

export { StyledFileUploader as FileUploader }
