import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardSection from "./components/CardSection";
import ChartSection from "./components/ChartSection";
import Header from "./components/Header";

const App = () => {
  const [state, setState] = useState({
    Id: "bitcoin",
    Data: {},
  });

  const fetchData = async () => {
    try {
      let data = await fetch(
        "https://api.coingecko.com/api/v3/coins/" + state.Id
      );
      let JsonData = await data.json();
      setState({ ...state, Data: JsonData });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = async (event) => {
    await setState({ ...state, Id: event.target.value });
    fetchData();
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => clearInterval(interval);
  }, [state.Id]);

  return (
    <Container>
      <Header handle_Submit={handleSubmit} />
      <CardSection
        coinName={state.Data.name}
        currentPrice={
          state.Data.market_data
            ? state.Data.market_data.current_price["usd"]
            : ""
        }
        mCap24={
          state.Data.market_data
            ? state.Data.market_data.market_cap_change_percentage_24h
            : ""
        }
        ath={state.Data.market_data ? state.Data.market_data.ath.usd : ""}
        atl={state.Data.market_data ? state.Data.market_data.ath.usd : ""}
        sentiment={state.Data.sentiment_votes_up_percentage}
        high24={
          state.Data.market_data ? state.Data.market_data.high_24h["usd"] : ""
        }
        low24={
          state.Data.market_data ? state.Data.market_data.low_24h["usd"] : ""
        }
      />
      <ChartSection
        Id={state.Id}
        priceChange24={
          state.Data.market_data
            ? state.Data.market_data.price_change_24h_in_currency.usd
            : ""
        }
        MarketCap={
          state.Data.market_data ? state.Data.market_data.market_cap.usd : ""
        }
        TotVol={
          state.Data.market_data ? state.Data.market_data.total_volume.usd : ""
        }
        Circulating={
          state.Data.market_data
            ? state.Data.market_data["circulating_supply"]
            : ""
        }
        twitterF={
          state.Data.community_data
            ? state.Data.community_data.twitter_followers
            : ""
        }
        marketCapChart={
          state.Data.market_data ? state.Data.market_data.market_cap_chart : []
        }
        marketVolumeChart={
          state.Data.market_data
            ? state.Data.market_data.total_volume_chart
            : []
        }
      />
    </Container>
  );
};

const Container = styled.div`
  font-family: Arial, sans-serif;
`;

export default App;
