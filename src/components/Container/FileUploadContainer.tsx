import React, { useState } from 'react'
import styled from 'styled-components'
import { LogoContainer } from './LogoContainer';
import { DragDropBox } from './DragDropBox';

const FileUploadContainer: FC = ({ className }) => {

    const [url, setUrl] = useState();

    return (
        <div className={className}>
            <LogoContainer />
            <div className="horizontal-line" />
            <DragDropBox url={url} onChange={(url) => setUrl(url)} />
        </div>
    )
}

const StyledFileUploadContainer = styled(FileUploadContainer)`
    align-self: center;
    margin: 0 auto;
    position: relative;
    width: 400px;
    height: 590px;

    background: #FFFFFF;
    border: 1px solid #E8F1FB;
    box-sizing: border-box;

    .horizontal-line{
    height: 1px;
    background: #E8F1FB;
    }
`

export { StyledFileUploadContainer as FileUploadContainer }
