import { Col, Row } from 'antd'
import Wrapper from 'components/Wrapper'
import { FC } from 'react'
import LeaderBoard from './LeaderBoard'
import UserCoin from './UserCoin'

const LeaderBoardPage: FC = () => {
  return (
    <Wrapper
      activeMenu={['l']}
      crumbs={[{ to: '/', label: 'Home' }, { label: 'Leader Board' }]}
    >
      <Row gutter={[12, 0]}>
        <Col span={12}>
          <LeaderBoard />
        </Col>
        <Col span={12}>
          <UserCoin />
        </Col>
      </Row>
    </Wrapper>
  )
}

export default LeaderBoardPage
