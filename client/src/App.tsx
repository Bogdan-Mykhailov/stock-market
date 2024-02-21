import './App.scss'
import {SharesList} from "./components/SharesList";
import {useEffect} from "react";
import {useAppDispatch} from "./services/hooks";
import {startTradingTC} from "./services/features";

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(startTradingTC())
  }, []);



  return (
    <div className='app'>
      <SharesList/>
    </div>
  )
};
