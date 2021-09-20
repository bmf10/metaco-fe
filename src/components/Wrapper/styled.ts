import { Breadcrumb, Layout } from 'antd'
import styled from 'styled-components'

export const Logo = styled.img`
  height: 100%;
  padding: 10px;
`

export const Content = styled(Layout.Content)`
  padding: 20px 50px;
  min-height: 100vh;
`

export const Header = styled(Layout.Header)`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 992px) {
    flex-direction: row;
    padding: 0px 50px !important;
    justify-content: space-between;
  }
`

export const StyledBreadCrumb = styled(Breadcrumb)`
  margin: 0px 0px 20px;
`
