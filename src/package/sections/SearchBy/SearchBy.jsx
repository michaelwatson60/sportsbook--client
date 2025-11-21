import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectIsBookGetLoading } from '../../../redux/reducers/betslip/betslip.slice';
import { getBetslipBookThunk } from '../../../redux/reducers/betslip/betslip.thunk';
import Search from '../../components/Search/Search';
import {
  SearchBy__styled,
  SearchByBody__styled,
  SearchByHead__styled,
  SearchByInner__styled,
  SearchBySearch__styled,
  SearchBySelect__styled,
} from './SearchBy.styled';
import { useTranslation } from 'react-i18next';
import Select from '../../components/UI/Select/Select';

const options = ['Bet Code', 'Book Code'];

const SearchBy = ({ title = 'search' }) => {
  const dispatch = useDispatch();
  const isBookLoading = useSelector(selectIsBookGetLoading);
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const onSearch = value => {
    if (!value) {
      return;
    }
    dispatch(getBetslipBookThunk(value));
  };

  return (
    <SearchBy__styled>
      <SearchByHead__styled>{t(title)}</SearchByHead__styled>
      <SearchByBody__styled>
        <SearchByInner__styled>
          <SearchBySelect__styled>
            <Select
              defaultOption={options[0]}
              color={'var(--color-white)'}
              forOdds
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
            />
          </SearchBySelect__styled>

          <SearchBySearch__styled>
            <Search
              placeholder={t('betSlip:loadBookingId')}
              onSearch={onSearch}
              isLoading={isBookLoading}
            />
          </SearchBySearch__styled>
        </SearchByInner__styled>
      </SearchByBody__styled>
    </SearchBy__styled>
  );
};

SearchBy.propTypes = {
  title: PropTypes.string,
};

export default SearchBy;
