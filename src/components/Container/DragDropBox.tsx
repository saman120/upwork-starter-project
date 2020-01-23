import React, { useState } from 'react'
import styled from 'styled-components'
import { ProgressIcon } from './ProgressIcon';

const uploadFile = (file: any) => {
    new Promise((resolve, reject) => {

    })
};

const DragDropBox: FC = ({ className }) => {
    const [dragStatus, setDragStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState();
    const [authToken, setAuthToken] = useState(
        window.location.href.includes('access_token=') && window.location.href.split('access_token=')[1].split('&')[0]);

    const dragDropMsg = loading ? 'Uploading' : "Drag & drop here" + (url ? " to replace" : '');
    const fileInputLabel = loading ? 'cancel' : 'Select file to ' + (url ? "replace" : 'upload');

    let fileInput: any;
    const onFileInputLabelClick = (evt: any) => {
        if (fileInput) {
            fileInput.click();
        }
    }

    const googleAuth = () => {
        window.location.replace('https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/devstorage.read_write&include_granted_scopes=true&state=pass-through value&redirect_uri=http://localhost:3000&response_type=token&client_id=818757178082-t1eu7hnakaur4ddpud8q5n1r495t0hje.apps.googleusercontent.com');
    }

    if (!authToken) {
        googleAuth();
        return;
    }

    const onCancelClick = (evt: any) => {
        googleAuth();
        setLoading(false);
    }

    const replaceUrl = (file: any) => {
        fetch(
            "https://photoslibrary.googleapis.com/v1/uploads",
            {
                method: "POST",
                body: file,
                headers: {
                    "Authorization": "Bearer " + authToken,
                    "Content-type": "application/octet-stream",
                    "X-Goog-Upload-File-Name": "imagefile_test",
                    "X-Goog-Upload-Protocol": "raw"
                }
            }
        ).then(res => {
            console.log("resssponse", res);
            return res.json();
        }).then(rJson => {
            setUrl(URL.createObjectURL(file));
        })

    }

    const dragDropHandler = (ev: any) => {
        ev.preventDefault();

        setLoading(true);
        setDragStatus(false);

        const file = ev.dataTransfer.files[0];
        console.log(file.name, file);

        replaceUrl(file);
    }

    const onFileInputChange = (ev: any) => {
        ev.preventDefault();
        setLoading(true);

        const file = ev.target.files[0];
        console.log(file.name, file);

        replaceUrl(file);
    }

    return (
        <div className={className}>
            <div className={'drag-over-indicator-container' + (dragStatus ? ' drag-over-indication' : '')}
                onDragLeave={evt => setDragStatus(false)}
                onDragOver={evt => {
                    evt.preventDefault();
                    setDragStatus(true);
                }}
                onDrop={dragDropHandler}>
                <ProgressIcon loading={loading} url={url} />
                <div className="drag-here-label">{dragDropMsg}</div>
                <div className="or-label">{'- or -'}</div>
                <div
                    className="file-input-label"
                    onClick={loading ? onCancelClick : onFileInputLabelClick}>{fileInputLabel}</div>
                <input ref={input => fileInput = input} onChange={onFileInputChange} type="file" accept="image/*" hidden />
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
