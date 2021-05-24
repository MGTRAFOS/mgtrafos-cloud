import { Container } from '../styles/home';
import { LeftSideBar } from '../components/LeftSideBar';
import { Content } from '../components/Content';

export default function Home() {
    return(
        <Container>
            <LeftSideBar />
            <Content />
        </Container>  
    )
}
