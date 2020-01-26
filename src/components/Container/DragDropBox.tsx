import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ProgressIcon } from './ProgressIcon'
import { fetchToken, googleAuth, uploadFile } from '../../lib/driveapis'

type DragDropBoxType = {
    url: string,
    onChange: (url: string) => void
}

const DragDropBox: FC<DragDropBoxType> = (props) => {
    const [dragStatus, setDragStatus] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    let [authToken, setAuthToken] = useState<string>()
    const [fileId, setFileId] = useState<string>()
    const [controller] = useState<AbortController>(new AbortController())
    const [paramCode] = useState<string>(new URLSearchParams(window.location.search).get('code') || '')

    useEffect(() => {
        if (!paramCode && confirm("Need to login to your google drive account to test demo")) {
            googleAuth()
        }
    })

    let fileInput: any
    const onFileInputLabelClick = (evt: any) => {
        if (fileInput) {
            fileInput.click()
        }
    }

    const onCancelClick = (evt: any) => {
        setLoading(false)
        controller.abort()
    }

    const fetchTokenAndUpload = (fileId: string | undefined, file: object) => {
        props.onChange(URL.createObjectURL(file))

        if (!authToken) {
            fetchToken(paramCode)
                .then((authToken: string) => {
                    setAuthToken(authToken)
                    uploadFile(authToken, controller, file, fileId)
                        .then((newFileId: string) => {
                            setFileId(newFileId)
                            setLoading(false)
                        })
                }).catch(err => {
                    if (confirm("Token expired: Need to relogin to your google drive account")) {
                        googleAuth()
                    }
                })
        } else {
            uploadFile(authToken, controller, file, fileId)
                .then((newFileId: string) => {
                    setFileId(newFileId)
                    setLoading(false)
                })
        }
    }

    const dragDropHandler = (ev: any, fileId: string | undefined) => {
        ev.preventDefault()

        setLoading(true)
        setDragStatus(false)

        const file = ev.dataTransfer.files[0]
        fetchTokenAndUpload(fileId, file)
    }

    const onFileInputChange = (ev: any, fileId: string | undefined) => {
        ev.preventDefault()

        setLoading(true)

        const file = ev.target.files[0]
        fetchTokenAndUpload(fileId, file)
    }

    const dragDropMsg = loading ? 'Uploading' : "Drag & drop here" + (props.url ? " to replace" : '')
    const fileInputLabel = loading ? 'cancel' : 'Select file to ' + (props.url ? "replace" : 'upload')

    return (
        <div className={props.className}>
            <div className={'drag-over-indicator-container' + (dragStatus ? ' drag-over-indication' : '')}
                onDragLeave={evt => setDragStatus(false)}
                onDragOver={evt => {
                    evt.preventDefault();
                    setDragStatus(true);
                }}
                onDrop={(event) => dragDropHandler(event, fileId)}>
                <ProgressIcon loading={loading} url={props.url} />
                <div className="drag-here-label">{dragDropMsg}</div>
                <div className="or-label">{'- or -'}</div>
                <div
                    className="file-input-label"
                    onClick={loading ? onCancelClick : onFileInputLabelClick}>{fileInputLabel}</div>
                <input ref={input => fileInput = input} onChange={(event) => onFileInputChange(event, fileId)} type="file" accept="image/*" hidden />
            </div>
        </div>
    )
}

const StyledDragDropBox = styled(DragDropBox)`
    width: 400px;
    height: 511px;
    padding-top: 19px;

    .drag-over-indicator-container{
        margin: 0px auto;
        width: 360px;
        height: 470px;
        padding-top: 146px;
    }

    .drag-over-indication{
        background: #F5F9FF;
        /* Accord Blue */

        border: 1px dashed #4991E5;
        box-sizing: border-box;
    }

    h1{
        width: 347px;
        height: 20px;
        margin:  21px 24px 0px  29px;

        font-family: Proxima Nova;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 20px;

        color: #1A2533;
    }

    h2{
        width: 347px;
        height: 20px;
        margin:  0px 24px 18px  29px;

        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 12px;
        display: flex;
        align-items: center;

        /* TX 3 */

        color: #6B85A3;
    }

    .horizontal-line{
        height: 1px;
        background: #E8F1FB;
    }

    .drag-here-label{
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

    .or-label{
        margin-top: 8px;

        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 12px;
        /* identical to box height */

        text-align: center;

        /* TX 3 */

        color: #6B85A3;
    }

    .file-input-label{
        margin-top: 4px;

        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 12px;
        /* identical to box height */

        text-align: center;

        /* Accord Blue */

        color: #4991E5;
    }

    .file-input-label:hover{
        cursor: pointer;
    }
`

export { StyledDragDropBox as DragDropBox }
