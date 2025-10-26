import ExpansionPanelSkeleton from '../ExpansionPanel/ExpansionPanel.skeleton';
import {
  SingleBets__styled,
  SingleBetsBody__styled,
  SingleBetsItem__styled,
} from './SingleBets.styled';

const loadingItems = [
  { row: 1, odds: 3 },
  { row: 1, odds: 2 },
  { row: 4, odds: 2 },
  { row: 3, odds: 3 },
  { row: 7, odds: 2 },
];

const SingleBetsSkeleton = () => {
  return (
    <SingleBets__styled>
      <SingleBetsBody__styled>
        <SingleBetsItem__styled>
          {loadingItems.map((data, i) => (
            <ExpansionPanelSkeleton key={i} data={data} />
          ))}
        </SingleBetsItem__styled>
      </SingleBetsBody__styled>
    </SingleBets__styled>
  );
};

export default SingleBetsSkeleton;
