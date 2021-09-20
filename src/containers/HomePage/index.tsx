import Wrapper from 'components/Wrapper'
import { FC } from 'react'
import { Img, StyledCenter } from './styled'

const HomePage: FC = () => {
  return (
    <Wrapper activeMenu={['home']}>
      <StyledCenter>
        <Img
          src="https://cdn.techinasia.com/data/images/aSd3P1WwUFlUvNgq20VAyoZrNnaOlgPqSLSq1vxN.png"
          alt="home"
        />
      </StyledCenter>
    </Wrapper>
  )
}

export default HomePage
