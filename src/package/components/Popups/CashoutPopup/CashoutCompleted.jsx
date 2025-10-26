import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCurrency } from '../../../../redux/reducers/auth/auth.slice';
import { Button } from './CashoutPopup.styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1rem 1rem;

  @media screen and (max-width: 800px) {
    justify-content: center;
    flex-grow: 1;

    ${Button} {
      position: absolute;
      bottom: 20px;
      width: 94%;
      height: 3rem;
    }
  }
`;

const IconWrapper = styled.div`
  border: 3px solid #07bc0c;
  border-radius: 50%;
  margin-bottom: 1rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 4rem;
    height: 4rem;
  }
`;

const Text = styled.div`
  font-size: 0.75rem;
  color: var(--be-text-color-base);
  font-weight: 700;
`;

const CashoutCompleted = ({ onOk, amount }) => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);

  return (
    <Wrapper>
      <IconWrapper>
        <svg fill="#07bc0c">
          <use xlinkHref={'#checked'} />
        </svg>
      </IconWrapper>

      <Text>
        ({Number(amount).toTruncFixed()} {currency})
      </Text>
      <Text>{t('cashoutCompleted')}</Text>

      <Button style={{ marginTop: '0.5rem' }} onClick={onOk}>
        {t('ok')}
      </Button>
    </Wrapper>
  );
};

export default CashoutCompleted;
