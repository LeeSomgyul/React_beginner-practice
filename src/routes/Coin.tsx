import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0,0,0,0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child{
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 0px;
`;

interface IInfoData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: object;
}

function Coin (){
    const params = useParams();
    const location = useLocation();
    const [info, setInfo] = useState<IInfoData>();
    const [priceinfo, setPrice] = useState<IPriceData>();
    useEffect(()=>{
        (   
            async () => {
                const infoData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${params.coinId}`)).json();
                const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${params.coinId}`)).json();
                setInfo(infoData);
                setPrice(priceData);
            }
        )();
    });

    return (
        <Container>
            <Header>
                <Title>{location.state.name}</Title>
            </Header>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{info?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>{info?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Open Source:</span>
                    <span>{info?.open_source ? "Yes" : "No"}</span>
                </OverviewItem>
            </Overview>
            <Description>
                {info?.description}
                <Overview>
                    <OverviewItem>
                        <span>Total Syply:</span>
                        <span>{priceinfo?.total_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Max Supply:</span>
                        <span>{priceinfo?.max_supply}</span>
                    </OverviewItem>
                </Overview>
                <Outlet/>
            </Description>
        </Container>
    );

}

export default Coin;