import React from 'react'
import styled from 'styled-components'

const LogoContainer : FC = ({className})=>(
    <div className={className}>
        <h1>Company Logo</h1>
        <h2>Logo should be square, 100px size and in png, jpeg file format.</h2>
    </div>
)

const StyledLogoContainer = styled(LogoContainer)`
    width: 400px;
    height: 79px;
    padding: 21px 24px 0px 29px;

    h1{
        width: 347px;
        height: 20px;

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
`

export { StyledLogoContainer as LogoContainer}
