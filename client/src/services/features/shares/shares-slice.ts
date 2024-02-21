import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {AppDispatch} from "../../store.ts";
import {socket} from "../../../socket.ts";
import {UpdateData, Share} from "../../../types/Share.ts";

const initialShareData = {
  ticker: "",
  exchange: "",
  price: "",
  change: "",
  change_percent: "",
  dividend: "",
  yield: "",
  last_trade_time: ""
};

const initialState = {
  shares: [
    {name: "Apple Inc.", color: "#858585", ...initialShareData},
    {name: "Alphabet Inc.", color: "#ea4335", ...initialShareData},
    {name: "Microsoft", color: "#00a1f1", ...initialShareData},
    {name: "Amazon Com.", color: "#ff9900", ...initialShareData},
    {name: "Meta", color: "#1877f2", ...initialShareData},
    {name: "Tesla Inc.", color: "#cc0000", ...initialShareData}
  ]
};

const shares = createSlice({
  name: 'shares',
  initialState,
  reducers: {
    setShares: (state, action: PayloadAction<Share[]>) => {
      state.shares = action.payload.map((newShareData: UpdateData, index) => {
        return { ...state.shares[index], ...newShareData }
      })
    }
  }
})

export const startTradingTC = () => (dispatch: AppDispatch) => {
  socket.emit('start');
  socket.on('ticker', (data: Share[]) => {
    dispatch(setShares(data))
  })
}

export const { setShares } = shares.actions;
export const sharesSlice = shares.reducer;
