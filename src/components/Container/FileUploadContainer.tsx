import React, { useState } from 'react'
import styled from 'styled-components'
import { LogoContainer } from './LogoContainer';
import { DragDropBox } from './DragDropBox';

const MainContainer = styled.div`
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
const FileUploadContainer: FC = ({ }) => {

    const [url, setUrl] = useState();

    return (
        <MainContainer>
            <LogoContainer />
            <div className="horizontal-line" />
            <DragDropBox url={url} onChange={(url) => setUrl(url)} />
        </MainContainer>
    )
}

export { FileUploadContainer }
