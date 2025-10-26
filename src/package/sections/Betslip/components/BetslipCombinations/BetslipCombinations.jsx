import { BetslipCombinations__styled } from '../../Betslip.styled';
import { BETSLIP_TYPES } from '../../constants/betslip.constants';
import { getSystemOrderName } from '../../helpers/betslip.helpers';
import BetslipCombinationItem from '../BetslipCombinationItem/BetslipCombinationItem';

const BetslipCombinations = ({
  activeType,
  multyAmount,
  systemRows,
  onMultyAmountChange,
  systemAmounts,
  onSystemAmountChange,
  bonusPercent,
}) => {
  const isSystem = activeType === BETSLIP_TYPES.SYSTEM;

  return (
    <BetslipCombinations__styled>
      {isSystem ? (
        systemRows.map((item, i) => (
          <BetslipCombinationItem
            key={item.current}
            name={
              i === systemRows.length - 1 && i
                ? 'Combo'
                : getSystemOrderName(item.current)
            }
            value={systemAmounts[item.current]}
            onChange={e => onSystemAmountChange(item.current, e.target.value)}
            rate={item.combinationCount}
          />
        ))
      ) : (
        <BetslipCombinationItem
          name="Combo"
          giftPercent={bonusPercent}
          value={multyAmount}
          onChange={onMultyAmountChange}
        />
      )}
    </BetslipCombinations__styled>
  );
};

export default BetslipCombinations;
