import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from '@/redux/reducers/auth/auth.thunk';
import { closePopup } from '@/redux/reducers/popups/popups.slice';
import Button from '../../UI/Button/Button';
import Popup from '../../UI/Popup/Popup';
import { POPUPS_IDS } from '../configs/popup.configs';
import { LoginButton__styled, LoginPopup__styled } from './LoginPopup.styled';

const LoginPopup = ({ cb }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onClose = () => {
    dispatch(closePopup(POPUPS_IDS.LOGIN));
  };

  const onLogin = () => {
    dispatch(loginThunk({ username, password }))
      .unwrap()
      .then(() => {
        cb();
        onClose();
      });
  };

  return (
    <Popup onClose={onClose}>
      <LoginPopup__styled>
        <label className="ticket__bet-label">
          <input
            className="ticket__bet-input"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label className="ticket__bet-label">
          <input
            className="ticket__bet-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <LoginButton__styled>
          <Button
            text="Login"
            disabled={!username || !password}
            onClick={onLogin}
          />
        </LoginButton__styled>
      </LoginPopup__styled>
    </Popup>
  );
};

export default LoginPopup;
