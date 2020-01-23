import React from 'react'
import styled from 'styled-components'

type ProgressIconType = {
    loading: boolean,
    url: string
}

type ProgressEclipseIconType = {
    loading: boolean
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
type ImageContainerType = {
    url: string
}

const ImageContainer = styled.div<ImageContainerType>`
    position:absolute;
    width: 29.63px;
    height: 45.93px;
    margin: 17.78px 25.19px 16.3px 25.19px;
    background-position: center;
    background-size: contain;
    background: ${props => props.url && "url('" + props.url + "')"}
`

const ProgressIcon: FC<ProgressIconType> = ({ className, loading, url }) => (
    <div className={className}>
        <ProgressElipse className="progress-icon-elipse" loading={loading} />
        <ImageContainer url={url}>
            {!url && <img src={require('../../icons/file-icon.svg')} />}
        </ImageContainer>
    </div>
)

const StyledProgressIcon = styled(ProgressIcon)`
        height: 80px;
        width: 80px;
        align-self: center;
        margin: 0 auto;

        img{
            max-width: 29.63px;
            max-height: 45.93px;
        }
`

export { StyledProgressIcon as ProgressIcon }
