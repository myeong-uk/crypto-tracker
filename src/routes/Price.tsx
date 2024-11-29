import styled from "styled-components";
import { PriceData } from "./Coin";

interface PriceProps {
  tickersData: PriceData;
}

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  color: ${(props) => props.theme.textColor};
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.accentColor};
`;

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

const Value = styled.span`
  font-size: 14px;
`;

const Change = styled.span<{ isPositive: boolean }>`
  color: ${(props) => (props.isPositive ? "limegreen" : "tomato")};
`;

function Price({ tickersData }: PriceProps) {
  const priceData = tickersData.quotes.USD;

  return (
    <PriceContainer>
      <Title>Price Information</Title>
      <PriceItem>
        <Label>Current Price:</Label>
        <Value>${priceData.price?.toFixed(3)}</Value>
      </PriceItem>
      <PriceItem>
        <Label>24h Change:</Label>
        <Change isPositive={priceData.percent_change_24h > 0}>
          {priceData.percent_change_24h?.toFixed(2)}%
        </Change>
      </PriceItem>
      <PriceItem>
        <Label>Market Cap:</Label>
        <Value>${priceData.market_cap?.toLocaleString()}</Value>
      </PriceItem>
      <PriceItem>
        <Label>Volume (24h):</Label>
        <Value>${priceData.volume_24h?.toLocaleString()}</Value>
      </PriceItem>
    </PriceContainer>
  );
}

export default Price;