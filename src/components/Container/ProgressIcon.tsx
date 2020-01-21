import React from 'react'
import styled from 'styled-components'

const ProgressIcon: FC = ({ className }) => (
    <div className={className}>
        <div className="progress-icon-elipse">
        </div>
        <div className="progress-icon-rect-container">
            <img src={require('../../icons/file-icon.svg')} />
        </div>
    </div>
)

const StyledProgressIcon = styled(ProgressIcon)`
        height: 80px;
        width: 80px;
        align-self: center;
        margin: 0 auto;
        
    .progress-icon-elipse{
        position:absolute;
        width: 80px;
        height: 80px;
        border-radius: 50%;

        /* STD W */

        background: #FFFFFF;
        /* B80 */

        border: 1px solid #D1E3F8;
        box-sizing: border-box;
    }

    .progress-icon-rect-container{
        position:absolute;
        width: 29.63px;
        height: 45.93px;
        margin-top: 17.78px;
        margin-left: 25.19px;
        margin-bottom: 16.3px;
        margin-right:  25.19px;
    }
`
export { StyledProgressIcon as ProgressIcon }
