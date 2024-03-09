import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

const ChartSection = ({
  Id,
  MarketCap,
  priceChange24,
  TotVol,
  Circulating,
  twitterF,
}) => {
  const [chartData, setChartData] = useState({
    Price: {
      options: {
        chart: {
          id: "area-datetime",
        },
        grid: {
          show: false,
        },
        title: {
          text: "Market Price (USD)",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#fcdf03",
          },
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          show: false,
        },
        colors: ["#fcdf03"],
        tooltip: {
          y: {
            formatter: (value) => {
              return value.toFixed(2);
            },
          },
          theme: "dark",
        },
        selection: 365,
      },
      series: [
        {
          name: "Market Price",
          data: [[1645837250522, 39804.53519937617]],
        },
      ],
    },
    Market_Cap: {
      options: {
        grid: {
          show: false,
        },
        title: {
          text: "Market Cap (USD)",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#ff69f5",
          },
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          show: false,
        },
        colors: ["#ff69f5"],
        tooltip: {
          y: {
            formatter: (value) => {
              return value.toFixed(2);
            },
          },
          theme: "dark",
        },
      },
      series: [
        {
          name: "Market Cap (USD)",
          data: [[1645837250522, 39804.53519937617]],
        },
      ],
    },
    Tot_Vol: {
      options: {
        grid: {
          show: false,
        },
        title: {
          text: "Market Volume",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#00ffea",
          },
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          show: false,
        },
        colors: ["#00ffea"],
        tooltip: {
          y: {
            formatter: (value) => {
              return value.toFixed(2);
            },
          },
          theme: "dark",
        },
      },
      series: [
        {
          name: "Market Volume",
          data: [[1645837250522, 39804.53519937617]],
        },
      ],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${Id}/market_chart?vs_currency=usd&days=${chartData.Price.options.selection}`
        );
        const jsonChartData = await response.json();

        setChartData({
          ...chartData,
          Price: {
            ...chartData.Price,
            series: [{ name: "Market Price", data: jsonChartData.prices }],
          },
          Market_Cap: {
            ...chartData.Market_Cap,
            series: [
              { name: "Market Cap (USD)", data: jsonChartData.market_caps },
            ],
          },
          Tot_Vol: {
            ...chartData.Tot_Vol,
            series: [
              { name: "Market Volume", data: jsonChartData.total_volumes },
            ],
          },
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(interval);
  }, [Id, chartData.Price.options.selection]);

  const handleChartSelection = (days) => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      Price: {
        ...prevChartData.Price,
        options: {
          ...prevChartData.Price.options,
          selection: days,
        },
      },
    }));
  };

  return (
    <Container>
      <ChartContainer>
        <Toolbar>
          <button onClick={() => handleChartSelection(1)}>1D</button>
          <button onClick={() => handleChartSelection(7)}>1W</button>
          <button onClick={() => handleChartSelection(30)}>1M</button>
          <button onClick={() => handleChartSelection(182)}>6M</button>
          <button onClick={() => handleChartSelection(365)}>1Y</button>
        </Toolbar>
        <ChartWrapper>
          <Chart
            options={chartData.Price.options}
            series={chartData.Price.series}
            type="area"
            height="320"
            width="100%"
          />
          <Chart
            options={chartData.Market_Cap.options}
            series={chartData.Market_Cap.series}
            type="area"
            height="320"
            width="100%"
          />
          <Chart
            options={chartData.Tot_Vol.options}
            series={chartData.Tot_Vol.series}
            type="area"
            height="320"
            width="100%"
          />
        </ChartWrapper>
      </ChartContainer>
      <InfoCardsContainer>
        <InfoCard>
          <CardTitle>Market Cap</CardTitle>
          <CardValue>$ {MarketCap}</CardValue>
        </InfoCard>
        <InfoCard>
          <CardTitle>Price Change 24hrs</CardTitle>
          <CardValue>$ {priceChange24}</CardValue>
        </InfoCard>
        <InfoCard>
          <CardTitle>Total Volume</CardTitle>
          <CardValue>$ {TotVol}</CardValue>
        </InfoCard>
        <InfoCard>
          <CardTitle>Circulating Supply</CardTitle>
          <CardValue>{Circulating}</CardValue>
        </InfoCard>
        <InfoCard>
          <CardTitle>Twitter Followers</CardTitle>
          <CardValue>{twitterF}</CardValue>
        </InfoCard>
      </InfoCardsContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ChartContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  button {
    margin: 0 5px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #fcdf03;
    color: #333;
    outline: none;

    &:hover {
      background-color: #ffd700;
    }
  }
`;

const ChartWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const InfoCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const InfoCard = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  background-color: #333;
  padding: 10px;
  border-radius: 5px;
`;

const CardTitle = styled.h6`
  color: #fcdf03;
  margin-bottom: 5px;
`;

const CardValue = styled.p`
  color: #fff;
  font-weight: bold;
`;

export default ChartSection;
