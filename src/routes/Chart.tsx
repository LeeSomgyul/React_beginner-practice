import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import {fetchCoinHistory} from "../api";
import ApexCharts from "react-apexcharts";

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

interface IToggleType{
    isDark: boolean;
}

function Chart (){
    const {isDark} = useOutletContext<IToggleType>();
    const {coinId} = useParams();
    const {isLoading, data} = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId!),
        {
        enabled: !!coinId,
        refetchInterval: 5000,
        }
    );

    return(
        <div>{isLoading ? (
            "Loading chart..." ) : (
                data && Array.isArray(data) ? (
                <ApexCharts
                    type="line"
                    series={[
                        {
                            name: "sales",
                            data: data?.map((price) => parseFloat(price.close))??[],
                        }
                    ]}
                    options={{
                        theme:{
                            mode: isDark ? "dark" : "light",
                        },
                        chart:{
                            height: 500,
                            width: 500,
                            toolbar:{
                                show: false,
                            },
                            background: "transparent",
                        },
                        stroke:{
                            curve: "smooth",
                        },
                        xaxis:{
                            labels:{show:false},
                            categories: data?.map((price) => new Date(price.time_close*1000).toISOString())??[],
                        }
                    }}
                />
            ) : (
                <p>No data available</p>
              )
            )}
        </div>
    );
}

export default Chart;