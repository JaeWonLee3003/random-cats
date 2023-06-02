import { useState , Fragment } from "react"; // react import
import { useQuery } from "react-query"; // react-query import
import Modal from "react-modal"; // react-modal import
import { getCats } from "../../api/getCats"; // 고양이 사진을 불러오는 api 함수 import
import type { GetCatsResponse } from "../../api/getCats"; // getCats의 response data type import 
import Button from "../../components/Button"; // Button component import
import { Container, List, Item, Image } from "./styled"; // styled-components import

Modal.setAppElement("#root"); // Modal을 사용하기 위해 Modal의 기준 element를 지정해줌 (#root)

function Cats() {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Modal의 상태를 담아놓은 state
  const [modalImgUrl, setModalImgUrl] = useState<string>("");

  const { data, isFetching, refetch } = useQuery(["cats"], getCats, {
    refetchOnWindowFocus: false,
  }); // react-query를 사용하여 고양이 사진 가져오는 api를 실행함
  // data: api로 불러온 response data
  // isFetching: api요청으로 fetch가 일어나는 상황을 알려줌
  // refetch: api 재요청
  
  const refresh = () => refetch(); // react-query의 refetch 함수를 실행시키는 함수

  const handleOpenModal = (url: string) => {
    setModalImgUrl(url)
    setIsOpen(true); // Modal의 상태를 true(보여줌)으로 바꿔주는 함수
  }

  const handleCloseModal = () => {
    setModalImgUrl("");
    setIsOpen(false); // Modal의 상태를 false(숨김)으로 바꿔주는 함수
  }

  return (
    <Container>
      고양이들
      <Button onClick={refresh}>새로고침</Button>
      {isFetching && <div>로딩중입니다...</div>}
      {!isFetching && data && ( // fetch 중이 아니면서 data가 있을 때만 component를 return
        <List>
          {data.map(({ id, url }, index) => {
            if (index > 8 ) return <Fragment key={id} />;
            const itemClick = () => handleOpenModal(url);

            return (
              <Item key={id} onClick={itemClick}>
                <Image src={url} alt={id} objectFit="cover"/>
              </Item>
            );
          })}
        </List>
      )}
      <Modal
        isOpen={isOpen} // Modal이 열려있는 상태인가
        shouldCloseOnOverlayClick={true} // Modal의 바깥을 클릭하면 Modal이 꺼지는가
        onRequestClose={handleCloseModal} // Modal을 끄는 요청을 하면 실행되는 함수
        style={{
          content: {
            overflow:"hidden",
          },
        }}
      >
        <Image src={modalImgUrl} alt="modal-img" objectFit="contain" />
      </Modal>
    </Container>
  );
}

export default Cats;