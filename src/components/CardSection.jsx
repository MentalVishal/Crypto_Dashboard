import React from "react";
import styled from "styled-components";

const CardSection = (props) => {
  return (
    <Wrapper>
      <Title>{props.coinName}</Title>
      <CardContainer>
        <CardBody>
          <CardTitle>Market Cap 24Hrs</CardTitle>
          <CardText color="#fcdf03">{props.mCap24} %</CardText>
        </CardBody>
        <CardBody>
          <CardTitle>All Time High</CardTitle>
          <CardText color="#fcdf03">${props.ath}</CardText>
        </CardBody>
        <CardBody>
          <CardTitle>All Time Low</CardTitle>
          <CardText color="#fcdf03">${props.atl}</CardText>
        </CardBody>
        <CardBody>
          <CardTitle>Positive Sentiments</CardTitle>
          <CardText color="#fcdf03">{props.sentiment} %</CardText>
        </CardBody>
        <CardBody>
          <CardTitle>High 24Hrs</CardTitle>
          <CardText color="rgb(51, 255, 0)">${props.high24}</CardText>
        </CardBody>
        <CardBody>
          <CardTitle>Low 24Hrs</CardTitle>
          <CardText color="rgb(255, 32, 32)">${props.low24}</CardText>
        </CardBody>
      </CardContainer>
      <CurrentPrice>${props.currentPrice}</CurrentPrice>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: "NHaasGroteskDSPro-65Md";
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 3px 20px;
  text-transform: capitalize;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`;

const CardBody = styled.div`
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  width: 11rem;
  background-color: rgb(43, 43, 43);
  margin: 0 10px;
  padding: 10px;
`;

const CardTitle = styled.h6`
  color: #fcdf03;
`;

const CardText = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
  color: ${(props) => props.color};
`;

const CurrentPrice = styled.div`
  font-size: 90px;
  font-weight: 700;
  color: #fcdf03;
  text-align: center;
`;

export default CardSection;
