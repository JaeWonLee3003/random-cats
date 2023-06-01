import {useEffect , useState} from "react";
import {getCats} from "../../api/getCats";
import type { GetCatsResponse } from "../../api/getCats";
import { Container, Image, Item, List } from "./styled";
import { useQuery } from "react-query";
import Modal from "react-modal"
import Button from "../../components/Button";

Modal.setAppElement("#root")

function Cats() {
    const [cats,setCats] = useState<GetCatsResponse[]>([]);
    const [isOpen, setisOpen] = useState<boolean>(false);

    const {data, isLoading , refetch} = useQuery(['cats'], getCats);
    
    const refresh = () => refetch();

    const handleOpenModal = () => setisOpen(true);
    const handleCloseModal = () => setisOpen(false);


    useEffect(() => {
        if(!data) return;
        setCats(data);       
    }, [data]);   

    

    return (
    <Container>
        고양이들
        <Button onClick={refresh}>새로고침</Button>
        {isLoading && <div>로딩중입니다...</div>}
        {!isLoading && (
        <List>
        {cats.map(({id, url}) => {

            return (
                <Item key={id} onClick={handleOpenModal}>
                <Image src={url} alt={id}/>
            </Item>
            );
        })}
        </List>
        )}        
        <Modal isOpen={isOpen} shouldCloseOnOverlayClick={true} onRequestClose={handleCloseModal}></Modal>
            </Container>
);
}

export default Cats;