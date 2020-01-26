import React from 'react'
import styled from 'styled-components'

type ProgressIconType = {
    loading: boolean,
    url: string
}

type ProgressEclipseIconType = {
    loading: boolean
}

type ImageContainerType = {
    url: string
}

const ProgressElipse = styled.div<ProgressEclipseIconType>`
    position:absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;

    /* STD W */

    background: #FFFFFF;
    /* B80 */

    border: 1px solid #D1E3F8;
    box-sizing: border-box;

    border-top: ${props => props.loading && '2px solid #3498db'}; /* Blue */
    animation: ${props => props.loading && 'spin 2s linear infinite'};

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

const ImageContainer = styled.div<ImageContainerType>`
    position:absolute;
    width: ${props => props.url ? '80px' : '29.63px'};
    height: ${props => props.url ? '80px' : '45.93px'};
    padding: ${props => props.url ? '12px' : '17.78px 25.19px 16.3px 25.19px'};
    background-position: center;
    background-size: contain;

    img{
        position: absolute;
        margin:auto;
        top:${props => props.url ? '0px' : ''};
        bottom:${props => props.url ? '0px' : ''};
        left:${props => props.url ? '0px' : ''};
        right:${props => props.url ? '0px' : ''};
        max-width: ${props => props.url ? '55px' : '29.63px'};
        max-height: ${props => props.url ? '55px' : '45.93px'};
    }
`

const ProgressIcon: FC<ProgressIconType> = ({ className, loading, url }) => (
    <div className={className}>
        <ProgressElipse className="progress-icon-elipse" loading={loading} />
        <ImageContainer url={url}>
            <img src={url || require('../../icons/file-icon.svg')} />
        </ImageContainer>
    </div>
)

const StyledProgressIcon = styled(ProgressIcon)`
        height: 80px;
        width: 80px;
        align-self: center;
        margin: 0 auto;
`

export { StyledProgressIcon as ProgressIcon }
