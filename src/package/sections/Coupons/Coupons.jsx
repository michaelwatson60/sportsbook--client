import PropTypes from 'prop-types';
import {
  Coupons__styled,
  CouponsBody__styled,
  // CouponsCount__styled,
  CouponsHead__styled,
  CouponsIcon__styled,
  CouponsItem__styled,
  CouponsLink__styled,
  CouponsList__styled,
  CouponsTitle__styled,
} from './Coupons.styled';
import { useTranslation } from 'react-i18next';

const Coupons = ({ coupons = [] }) => {
  const { t } = useTranslation();

  return (
    <Coupons__styled>
      <CouponsHead__styled>{t('coupons')}</CouponsHead__styled>
      <CouponsBody__styled>
        <CouponsList__styled>
          {coupons.map(coupon => (
            <CouponsItem__styled key={coupon.name} onClick={() => coupon?.cb()}>
              <CouponsLink__styled>
                <CouponsIcon__styled>
                  <svg>
                    <use xlinkHref={'#' + coupon.icon} />
                  </svg>
                </CouponsIcon__styled>
                <CouponsTitle__styled className={'ellipsis'}>
                  {coupon.name}
                </CouponsTitle__styled>
                {/* <CouponsCount__styled>(88)</CouponsCount__styled> */}
              </CouponsLink__styled>
            </CouponsItem__styled>
          ))}
        </CouponsList__styled>
      </CouponsBody__styled>
    </Coupons__styled>
  );
};

Coupons.propTypes = {
  coupons: PropTypes.array,
};

export default Coupons;
