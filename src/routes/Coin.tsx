import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";

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

const Loader = styled.span`
    text-align: center;
    display: block;
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

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{isActive: boolean}>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0,0,0,0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};
    a{
        display:block;
    }
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
    const {coinId} = useParams<{ coinId?: string }>();
    const location = useLocation();
    const chartMatch = useMatch("/:coinId/chart");
    const priceMatch = useMatch("/:coinId/price");
    const {isLoading: infoLoading, data: infoData} = useQuery<IInfoData>(
        ["coinInfo", coinId],
        () => fetchCoinInfo(coinId!),
        {
          enabled: !!coinId,
        }
      );
    const {isLoading: priceLoading, data: priceData} = useQuery<IPriceData>(
        ["coinPrice", coinId],
        () => fetchCoinPrice(coinId!),
        {
          enabled: !!coinId,
        }
      );

    const loading = infoLoading || priceLoading;
      
    return (
        <Container>
            <Header>
                <Title>{location.state?.name ? location.state.name : loading ? "Loading..." : infoData?.name}</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) :(
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Open Source:</span>
                            <span>{infoData?.open_source ? "Yes" : "No"}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>
                        {infoData?.description}
                    </Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Syply:</span>
                            <span>{priceData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>
                    <Outlet/>
                </>
            )}
        </Container>
    );
}

export default Coin;