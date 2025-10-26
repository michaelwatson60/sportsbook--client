import Skeleton from '../../../../components/UI/Skeleton/Skeleton';
import { MenuCenter__styled, MenuOpenIcon__styled } from '../../Menu.styled';
import {
  MenuSportButton__styled,
  MenuSportCount__styled,
  MenuSportIcon__styled,
  MenuSportInfo__styled,
  MenuSportItem__styled,
  MenuSportName__styled,
} from './MenuSport.styled';

const MenuSportSkeleton = ({ isSingleEvent }) => {
  return (
    <MenuSportItem__styled>
      <MenuSportInfo__styled>
        <MenuSportButton__styled isSingleEvent={isSingleEvent}>
          <MenuCenter__styled>
            <MenuSportIcon__styled skeleton>
              <Skeleton />
            </MenuSportIcon__styled>
            <MenuSportName__styled skeleton>
              <Skeleton />
            </MenuSportName__styled>
          </MenuCenter__styled>
          <MenuCenter__styled>
            {!isSingleEvent && (
              <>
                <MenuSportCount__styled skeleton>
                  <Skeleton />
                </MenuSportCount__styled>
              </>
            )}
            <MenuOpenIcon__styled>
              <Skeleton />
            </MenuOpenIcon__styled>
          </MenuCenter__styled>
        </MenuSportButton__styled>
      </MenuSportInfo__styled>
    </MenuSportItem__styled>
  );
};

export default MenuSportSkeleton;
