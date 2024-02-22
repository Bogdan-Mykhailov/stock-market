import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store.ts";
import { socket } from "../../../socket.ts";
import { UpdateData, Share } from "../../../types/Share.ts";

interface State {
  shares: Share[];
}

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

const initialState: State = {
  shares: [
    { name: "Apple Inc.", color: "#858585", active: true, ...initialShareData },
    { name: "Alphabet Inc.", color: "#ea4335", active: true, ...initialShareData },
    { name: "Microsoft", color: "#00a1f1", active: true, ...initialShareData },
    { name: "Amazon Com.", color: "#ff9900", active: true, ...initialShareData },
    { name: "Meta", color: "#1877f2", active: true, ...initialShareData },
    { name: "Tesla Inc.", color: "#cc0000", active: true, ...initialShareData }
  ],
};

const shares = createSlice({
  name: 'shares',
  initialState,
  reducers: {
    setShares: (state, action: PayloadAction<Share[]>) => {
      state.shares = action.payload.map((newShareData: UpdateData, index) => {
        return { ...state.shares[index], ...newShareData }
      })
    },
    deleteShare: (state, action: PayloadAction<string>) => {
      const tickerToDelete = action.payload;

      const shareToDelete = state.shares.find(share => share.ticker === tickerToDelete);
      if (shareToDelete) {
        shareToDelete.active = false;
      }
    },
    restoreDeletedShares: (state) => {
      state.shares.forEach(share => {
        if (!share.active) {
          share.active = true;
        }
      });
    },
  }
});

export const startTradingTC = () => (dispatch: AppDispatch) => {
  socket.emit('start');
  socket.on('ticker', (data: Share[]) => {
    dispatch(setShares(data))
  });
};

export const {
  setShares,
  deleteShare,
  restoreDeletedShares,
} = shares.actions;

export const sharesSlice = shares.reducer;
