import {
  BasketballField,
  CricketField,
  FootballField,
  FutsalField,
  HandballField,
  IceHockeyField,
  TableTennisField,
  TennisField,
  VolleyballField,
} from '../package/assets/images/fields';

export const MATCH_TRACKER_SETTINGS = {
  50: { sportId: 50, fieldIcon: <FootballField /> },
  107: { sportId: 107, fieldIcon: <FootballField /> },
  52: { sportId: 52, fieldIcon: <TennisField /> },
  53: { sportId: 53, fieldIcon: <BasketballField /> },
  55: { sportId: 55, fieldIcon: <HandballField /> },
  108: { sportId: 108, fieldIcon: <BasketballField /> },
  51: { sportId: 51, fieldIcon: <IceHockeyField /> },
  110: { sportId: 110, fieldIcon: <IceHockeyField /> },
  54: { sportId: 54, fieldIcon: <VolleyballField /> },
  70: { sportId: 70, fieldIcon: <TableTennisField /> },
  75: { sportId: 75, fieldIcon: <CricketField /> },
  65: { sportId: 75, fieldIcon: <FutsalField /> },
};
