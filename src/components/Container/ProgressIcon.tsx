import React from 'react'
import styled from 'styled-components'
import fileIcon from '../../icons/file-icon.svg'

type ProgressIconType = {
  loading: boolean
  url: string
}

const ProgressIcon: FC<ProgressIconType> = ({ className, loading, url }) => (
  <div className={className}>
    <div className="progress-icon-elipse" />
    <div className="progress-image-container">
      <img src={url || fileIcon} />
    </div>
  </div>
)

const StyledProgressIcon = styled(ProgressIcon)`
  height: 80px;
  width: 80px;
  align-self: center;
  margin: 0 auto;

  .progress-icon-elipse {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;

    /* STD W */

    background: #ffffff;
    /* B80 */

    border: 1px solid #d1e3f8;
    box-sizing: border-box;

    border-top: ${(props) => props.loading && '2px solid #3498db'}; /* Blue */
    animation: ${(props) => props.loading && 'spin 2s linear infinite'};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .progress-image-container {
    position: absolute;
    width: ${(props) => (props.url ? '80px' : '29.63px')};
    height: ${(props) => (props.url ? '80px' : '45.93px')};
    padding: ${(props) =>
      props.url ? '12px' : '17.78px 25.19px 16.3px 25.19px'};
    background-position: center;
    background-size: contain;
  }

  img {
    position: absolute;
    margin: auto;
    top: ${(props) => (props.url ? '0px' : '')};
    bottom: ${(props) => (props.url ? '0px' : '')};
    left: ${(props) => (props.url ? '0px' : '')};
    right: ${(props) => (props.url ? '0px' : '')};
    max-width: ${(props) => (props.url ? '55px' : '29.63px')};
    max-height: ${(props) => (props.url ? '55px' : '45.93px')};
  }
`

export { StyledProgressIcon as ProgressIcon }
