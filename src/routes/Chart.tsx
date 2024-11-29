import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

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
interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const candleData = data?.map((price) => ({
    x: new Date(price.time_close * 1000),
    y: [
      parseFloat(price.open),
      parseFloat(price.high),
      parseFloat(price.low),
      parseFloat(price.close),
    ],
  }));

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: 'Price',
              data: candleData || [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: {
              show: true,
              borderColor: isDark ? '#303030' : '#e0e0e0',
              strokeDashArray: 2,
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#0be881',
                  downward: '#ff5f5f',
                },
                wick: {
                  useFillColor: true,
                },
              },
            },
            xaxis: {
              type: 'datetime',
              axisBorder: { show: false },
              axisTicks: { show: true },
              labels: { show: true },
            },
            yaxis: {
              show: true,
              tooltip: {
                enabled: true,
              },
              labels: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            tooltip: {
              enabled: true,
              theme: isDark ? 'dark' : 'light',
              x: {
                format: 'MMM dd HH:mm',
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;