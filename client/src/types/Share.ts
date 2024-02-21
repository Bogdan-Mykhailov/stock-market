export interface UpdateData {
  name: string;
  color: string;
}

export interface Share extends UpdateData{
  ticker: string;
  exchange: string
  price: string;
  change: string;
  change_percent: string;
  dividend: string;
  yield: string;
  last_trade_time: string;
}
