import { Breadcrumb, Layout, Menu } from 'antd'
import { FC, ReactNode } from 'react'
import { Content, Header, Logo, StyledBreadCrumb } from './styled'
import { Link } from 'react-router-dom'

export interface Crumb {
  readonly to?: string
  readonly label: string
}

export interface Props {
  readonly children: ReactNode
  readonly crumbs?: ReadonlyArray<Crumb>
  readonly activeMenu?: ReadonlyArray<string>
}

const Wrapper: FC<Props> = ({ children, crumbs, activeMenu }: Props) => {
  return (
    <Layout>
      <Header>
        <Logo src="https://metaco.gg/icon/logo-metaco.svg" alt="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={activeMenu as []}>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="tr">
            <Link to="tournament-result">Tournament Result</Link>
          </Menu.Item>
          <Menu.Item key="l">
            <Link to="leaderboard">Leader Board</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        {crumbs ? (
          <StyledBreadCrumb>
            {crumbs.map(({ to, label }, index) => (
              <Breadcrumb.Item key={index}>
                {to ? <Link to={to}>{label}</Link> : label}
              </Breadcrumb.Item>
            ))}
          </StyledBreadCrumb>
        ) : undefined}
        {children}
      </Content>
    </Layout>
  )
}

Wrapper.defaultProps = {
  activeMenu: [],
}

export default Wrapper
