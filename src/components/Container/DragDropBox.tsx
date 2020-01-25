import React, { useState, useEffect } from 'react'
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
    const [authToken, setAuthToken] = useState();
    const [fileId, setFileId] = useState();

    const urlParams = new URLSearchParams(window.location.search);
    const [paramCode, setParamCode] = useState(urlParams.get('code') || '');

    const dragDropMsg = loading ? 'Uploading' : "Drag & drop here" + (url ? " to replace" : '');
    const fileInputLabel = loading ? 'cancel' : 'Select file to ' + (url ? "replace" : 'upload');

    let fileInput: any;
    const onFileInputLabelClick = (evt: any) => {
        if (fileInput) {
            fileInput.click();
        }
    }

    const fetchToken = () => {
        const redirect_uri = "http://localhost:3000" // replace with your redirect_uri;
        const scope = "https://www.googleapis.com/auth/drive";
        const client_secret = "0UB8wZRCyQKhh5enYDZMwM-c"; // replace with your client secret
        const clientId = "818757178082-t1eu7hnakaur4ddpud8q5n1r495t0hje.apps.googleusercontent.com"// replace it with your client id;

        let formData = new FormData();
        formData.append('code', paramCode);
        formData.append('redirect_uri', redirect_uri);
        formData.append('client_secret', client_secret);
        formData.append('client_id', clientId);
        formData.append('scope', scope);
        formData.append('grant_type', 'authorization_code');

        fetch("https://www.googleapis.com/oauth2/v4/token", {
            method: 'post',
            body: formData
        }).then((res: any) => res.json()).then((resultData: any) => {
            setAuthToken(resultData.access_token);
        })
    }

    const googleAuth = () => {
        const redirect_uri = "http://localhost:3000" // replace with your redirect_uri;
        const scope = "https://www.googleapis.com/auth/drive";
        var clientId = "818757178082-t1eu7hnakaur4ddpud8q5n1r495t0hje.apps.googleusercontent.com"// replace it with your client id;

        let url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + redirect_uri
            + "&prompt=consent&response_type=code&client_id=" + clientId + "&scope=" + scope
            + "&access_type=offline";
        window.location.replace(url);
    }

    if (!paramCode) {
        googleAuth();
        return;
    } else if (!authToken) {
        setAuthToken('dummy');
    }

    useEffect(() => {
        if (authToken === 'dummy') {
            fetchToken()
        }
    }, [authToken])

    const onCancelClick = (evt: any) => {
        //googleAuth();
        setLoading(false);
    }

    const replaceUrl = (file: any, fileId: string) => {
        var formData = new FormData();

        formData.append("file", file, file.name);
        formData.append("upload_file", "true");

        fetch(
            "https://www.googleapis.com/upload/drive/v2/files" + (fileId ? '/' + fileId : ''),
            {
                method: fileId ? 'PUT' : "POST",
                body: formData,
                headers: {
                    "Authorization": "Bearer " + authToken
                }
            }
        ).then(res => {
            console.log("resssponse", res);
            return res.json();
        }).then(rJson => {
            setFileId(rJson.id);
            setLoading(false);
            setUrl(URL.createObjectURL(file));
        })

    }

    const dragDropHandler = (ev: any, fileId: string) => {
        ev.preventDefault();

        setLoading(true);
        setDragStatus(false);

        const file = ev.dataTransfer.files[0];
        console.log(file.name, file);

        replaceUrl(file, fileId);
    }

    const onFileInputChange = (ev: any, fileId: string) => {
        ev.preventDefault();
        setLoading(true);

        const file = ev.target.files[0];
        console.log(file.name, file);

        replaceUrl(file, fileId);
    }

    return (
        <div className={className}>
            <div className={'drag-over-indicator-container' + (dragStatus ? ' drag-over-indication' : '')}
                onDragLeave={evt => setDragStatus(false)}
                onDragOver={evt => {
                    evt.preventDefault();
                    setDragStatus(true);
                }}
                onDrop={(event) => dragDropHandler(event, fileId)}>
                <ProgressIcon loading={loading} url={url} />
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
