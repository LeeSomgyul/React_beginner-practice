import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import { fetchCoins } from "../api";

const Container = styled.div`
    padding: 0px 20px;
    margin: 0 auto;
    max-width: 480px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0px;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const CoinsList = styled.ul`
`;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 15px;
    a{
        display: flex;
        align-items: center;
    }
    &:hover{
        color: ${(props) => props.theme.accentColor};
    }
`;

const Img = styled.img`
    height: 25px;
    width: 25px;
    margin-right: 10px;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins (){
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);

    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? 
                (<Loader>Loading...</Loader>) :
                (<CoinsList>
                    {data?.slice(0,100).map((coin) => 
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`} state={{name: coin.name}}>
                                <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}/>
                                {coin.name}
                            </Link>
                        </Coin>)}
                </CoinsList>
                )
            }
        </Container>
    );

}

export default Coins;