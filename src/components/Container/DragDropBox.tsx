import React, { useState } from 'react'
import styled from 'styled-components'
import { ProgressIcon } from './ProgressIcon';

const DragDropBox: FC = ({ className }) => {
    const [dragStatus, setDragStatus] = useState(false);

    let fileInput: any;
    const onFileInputLabelClick = (evt: any) => {
        if (fileInput) {
            fileInput.click();
        }
    }

    const dragDropHandler = (ev :any)=>{
        console.log('File(s) dropped');
      
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();

        setDragStatus(false)
      
        if (ev.dataTransfer.items) {
          // Use DataTransferItemList interface to access the file(s)
          for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[i].kind === 'file') {
              var file = ev.dataTransfer.items[i].getAsFile();
              console.log('... file[' + i + '].name = ' + file.name);
            }
          }
        } else {
          // Use DataTransfer interface to access the file(s)
          for (var i = 0; i < ev.dataTransfer.files.length; i++) {
            console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
          }
        }
      }

    return (
        <div className={className}>
            <div className={'drag-over-indicator-container' + (dragStatus ? ' drag-over-indication' : '')}
                    onDragLeave={evt => setDragStatus(false)}
                    onDragOver={evt => {
                        evt.preventDefault();setDragStatus(true)}}
                    onDrop={dragDropHandler}>
                <ProgressIcon />
                <div className="drag-here-label">{'Drag & drop here'}</div>
                <div className="or-label">{'- or -'}</div>
                <div className="file-input-label" onClick={onFileInputLabelClick}>{'Select file to upload'}</div>
                <input ref={input => fileInput = input} type="file" hidden />
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
