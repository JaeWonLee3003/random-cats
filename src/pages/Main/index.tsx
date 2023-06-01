import {Link} from 'react-router-dom'

import Button from '../../components/Button';
import {Container, Title} from './styled'

function Main() {
    return (
        <Container>
            <Title>랜덤 고양이 사진 만들기</Title>
            <Button bgColor="red" color="white" pointer={true}>
            <Link to="/cats">시작</Link>
            </Button>
        </Container>

    );
}

export default Main;