import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ProgressIcon } from './ProgressIcon'
import { fetchToken, googleAuth, uploadFile } from '../../lib/driveapis'

type DragDropBoxType = {
  url: string
  onChange: (url: string) => void
}

const DragDropBox: FC<DragDropBoxType> = (props) => {
  const [dragStatus, setDragStatus] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [authToken, setAuthToken] = useState<string>()
  const [fileId, setFileId] = useState<string>()
  const [prevUrl, setPrevUrl] = useState<string>()
  const [controller, setController] = useState<AbortController | undefined>()
  const [paramCode] = useState<string>(
    new URLSearchParams(window.location.search).get('code') || ''
  )

  useEffect(() => {
    const msg =
      'Please login to your google drive account to test the full demo Or just view the UI components'
    if (!paramCode && confirm(msg)) {
      googleAuth()
    }
  }, [paramCode])

  let fileInput: any
  const onFileInputLabelClick = () => {
    if (fileInput) {
      fileInput.click()
    }
  }

  const onCancelClick = () => {
    setLoading(false)
    if (controller) controller.abort()
    if (prevUrl) props.onChange(prevUrl)
  }

  const fetchTokenAndUpload = (fileId: string | undefined, file: any) => {
    if (file.size / 1024 / 1924 > 20) {
      alert('Maximum upload file size 20MB')
      return false
    } else if (!paramCode) {
      if (confirm('Please login to your google drive account to test demo')) {
        googleAuth()
      }

      return false
    }

    setLoading(true)
    setPrevUrl(props.url)
    props.onChange(URL.createObjectURL(file))
    const myRequestController = new AbortController()
    setController(myRequestController)

    if (!authToken) {
      fetchToken(paramCode).then((authToken: string) => {
        setAuthToken(authToken)
        uploadFile(authToken, myRequestController, file, fileId).then(
          (newFileId: string) => {
            setFileId(newFileId)
            setLoading(false)
          }
        )
      })
    } else {
      uploadFile(authToken, myRequestController, file, fileId).then(
        (newFileId: string) => {
          setFileId(newFileId)
          setLoading(false)
        }
      )
    }
  }

  const dragDropHandler = (ev: any, fileId: string | undefined) => {
    ev.preventDefault()
    setDragStatus(false)

    if (
      !ev.dataTransfer.files ||
      !ev.dataTransfer.files[0].type.includes('image')
    ) {
      alert('Only file type image allowed')
      return false
    }

    const file = ev.dataTransfer.files[0]
    fetchTokenAndUpload(fileId, file)
  }

  const onFileInputChange = (ev: any, fileId: string | undefined) => {
    ev.preventDefault()
    if (!ev.target.files || !ev.target.files[0]) {
      return false
    }

    const file = ev.target.files[0]
    fetchTokenAndUpload(fileId, file)
    ev.target.value = null
  }

  const dragDropMsg = loading
    ? 'Uploading'
    : 'Drag & drop here' + (props.url ? ' to replace' : '')
  const fileInputLabel = loading
    ? 'cancel'
    : 'Select file to ' + (props.url ? 'replace' : 'upload')

  return (
    <div className={props.className}>
      <div
        className={
          'drag-over-indicator-container' +
          (dragStatus ? ' drag-over-indication' : '')
        }
        onDragLeave={() => setDragStatus(false)}
        onDragOver={(evt) => {
          evt.preventDefault()
          setDragStatus(true)
        }}
        onDrop={(event) => dragDropHandler(event, fileId)}
      >
        <ProgressIcon loading={loading} url={props.url} />
        <div className="drag-here-label">{dragDropMsg}</div>
        <div className="or-label">{'- or -'}</div>
        <div
          className="file-input-label"
          onClick={loading ? onCancelClick : onFileInputLabelClick}
        >
          {fileInputLabel}
        </div>
        <input
          ref={(inputRef) => {
            fileInput = inputRef
          }}
          onChange={(event) => onFileInputChange(event, fileId)}
          type="file"
          accept="image/*"
          hidden
        />
      </div>
    </div>
  )
}

const StyledDragDropBox = styled(DragDropBox)`
  width: 400px;
  height: 511px;
  padding-top: 19px;

  .drag-over-indicator-container {
    margin: 0px auto;
    width: 360px;
    height: 470px;
    padding-top: 146px;
  }

  .drag-over-indication {
    background: #f5f9ff;
    border: 1px dashed #4991e5;
    box-sizing: border-box;
  }

  h1 {
    width: 347px;
    height: 20px;
    margin: 21px 24px 0px 29px;

    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 20px;

    color: #1a2533;
  }

  h2 {
    width: 347px;
    height: 20px;
    margin: 0px 24px 18px 29px;

    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 12px;
    display: flex;
    align-items: center;

    /* TX 3 */

    color: #6b85a3;
  }

  .horizontal-line {
    height: 1px;
    background: #e8f1fb;
  }

  .drag-here-label {
    margin-top: 9px;

    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 12px;
    /* identical to box height */

    text-align: center;

    /* TX 2 */

    color: #324964;
  }

  .or-label {
    margin-top: 8px;

    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 12px;
    /* identical to box height */

    text-align: center;

    /* TX 3 */

    color: #6b85a3;
  }

  .file-input-label {
    margin-top: 4px;

    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 12px;
    /* identical to box height */

    text-align: center;
    color: #4991e5;
  }

  .file-input-label:hover {
    cursor: pointer;
  }
`

export { StyledDragDropBox as DragDropBox }
