import logo from '../../assets/buy.png';
import './Header.scss'
import {ActiveSessions} from "../ActiveSessions";

export const Header = () => {
  return (
    <div className='header'>
      <img className='header__logo' src={logo} alt="Main logo"/>
      <ActiveSessions />
    </div>
  );
};
