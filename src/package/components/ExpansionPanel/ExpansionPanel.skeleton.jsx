import {
  ExpansionPanel__styled,
  ExpansionPanelBody__styled,
  ExpansionPanelHead__styled,
  ExpansionPanelInfo__styled,
  ExpansionPanelMark__styled,
  ExpansionPanelOpen__styled,
  ExpansionPanelTitle__styled,
} from './ExpansionPanel.styled';
import Skeleton from '../UI/Skeleton/Skeleton';
import OddSkeleton from '../UI/Odd/Odd.skeleton';

const ExpansionPanelSkeleton = ({ data }) => {
  return (
    <ExpansionPanel__styled>
      <ExpansionPanelHead__styled>
        <ExpansionPanelInfo__styled>
          <ExpansionPanelMark__styled>
            <Skeleton />
          </ExpansionPanelMark__styled>
          <ExpansionPanelTitle__styled skeleton>
            <Skeleton />
          </ExpansionPanelTitle__styled>
        </ExpansionPanelInfo__styled>
        <ExpansionPanelOpen__styled open={true}>
          <Skeleton />
        </ExpansionPanelOpen__styled>
      </ExpansionPanelHead__styled>
      {Array(data.row)
        .fill(null)
        .map((_, rowI) => (
          <ExpansionPanelBody__styled key={rowI}>
            {Array(data.odds)
              .fill(null)
              .map((_, oddI) => (
                <OddSkeleton key={oddI} count={data.odds} />
              ))}
          </ExpansionPanelBody__styled>
        ))}
    </ExpansionPanel__styled>
  );
};

export default ExpansionPanelSkeleton;
