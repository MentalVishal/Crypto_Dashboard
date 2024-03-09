import React from "react";
import styled from "styled-components";

const Header = ({ handle_Submit }) => {
  return (
    <Navbar>
      <ContainerFluid>
        <Brand href="/">Crypto Dashboard</Brand>
        <Select
          className="form-select form-select-lg"
          aria-label=".form-select-lg example"
          name="selectCoin"
          onChange={handle_Submit}
        >
          <option value="bitcoin">Select Coin</option>
          <option value="avalanche-2">Avalanche (AVAX)</option>
          <option value="binancecoin">Binance (BNB)</option>
          <option value="bitcoin">Bitcoin (BTC) </option>
          <option value="cardano">Cardano (ADA)</option>
          <option value="decentraland">Decentraland (MANA)</option>
          <option value="dogecoin">Dogecoin (DOGE)</option>
          <option value="ethereum">Ethereum (ETH)</option>
          <option value="ripple">Ripple (XRP)</option>
          <option value="dai">Dai (DAI)</option>
          <option value="solana">Solana (SOL)</option>
          <option value="tether">Tether (USDT)</option>
          <option value="litecoin">Litecoin (LTC)</option>
        </Select>
      </ContainerFluid>
    </Navbar>
  );
};

const Navbar = styled.nav`
  background-color: #1e1e1e;
  padding: 15px 0;
`;

const ContainerFluid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Brand = styled.a`
  font-family: "NHaasGroteskDSPro-65Md";
  font-size: 24px;
  font-weight: bold;
  color: #fcdf03;
  text-decoration: none;

  &:hover {
    color: #ffc107;
  }
`;

const Select = styled.select`
  width: auto;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(252, 223, 3, 0.3);
  }
`;

export default Header;
