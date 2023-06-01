import Axios from "axios";

interface GetCatsResponse {
    height: number;
    id: string;
    url: string;
    width: number;
}

const test: string = 'test';

export async function getCats(): Promise < GetCatsResponse[] | false > {

  // Axios 는 비동기 이기 때문애 Promise로 감싸줘야한다.

    try {
        const {data} = await Axios.get<GetCatsResponse[]>(
            'https://api.thecatapi.com/v1/images/search?limit=10'
        );
        return data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export type { GetCatsResponse }