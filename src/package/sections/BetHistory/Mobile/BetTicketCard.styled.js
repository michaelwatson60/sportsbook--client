import styled from 'styled-components';

const COLORS = {
  surface: '#262626',
  surface2: '#1f1f1f',
  card: '#0b0b0b',
  border: '#3b3b3b',
  text: '#ffffff',
  muted: '#a6a6a6',
  label: '#7f8b96', // bluish-gray like screenshot
  danger: '#ff2d2d',
};

export const Card = styled.div`
  width: 100%;
  background: ${COLORS.surface};
  color: ${COLORS.text};
  border-radius: 4px;
  margin-bottom: 0.5rem;
  overflow: hidden;
`;

export const Header = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
`;

export const ToggleBtn = styled.button`
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  color: ${COLORS.text};
  display: grid;
  place-items: center;
  cursor: pointer;
  opacity: 0.95;

  &:active {
    transform: scale(0.98);
  }
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.2px;
`;

export const StatusPill = styled.div`
  margin-left: auto;
  padding: 3px 8px;
  border-radius: 3px;
  font-weight: 800;
  font-size: 11px;
  background: ${({ $color }) => $color || COLORS.danger};
  color: #fff;
`;

export const Divider = styled.div`
  height: 1px;
  background: ${COLORS.border};
`;

export const Collapse = styled.div`
  overflow: hidden;
  max-height: ${p => (p.$open ? '1200px' : '0px')};
  opacity: ${p => (p.$open ? 1 : 0)};
  transition: max-height 250ms ease, opacity 180ms ease;
`;

export const Selections = styled.div`
  padding: 12px 12px 2px;
  display: grid;
  gap: 12px;
`;

export const SelectionCard = styled.div`
  background: ${COLORS.card};
  border-radius: 10px;
  padding: 12px 12px 10px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
`;

export const SelectionTop = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

export const Pick = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: ${({ $color }) => $color || COLORS.danger};
`;

export const Odd = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: ${COLORS.text};
`;

export const Question = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: ${COLORS.muted};
  line-height: 1.25;
`;

export const Market = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: ${COLORS.muted};
`;

export const SelectionBottom = styled.div`
  margin-top: 8px;
  margin-bottom: 2px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
`;

export const EventName = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: ${COLORS.text};
`;

export const EventTime = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${COLORS.muted};
  white-space: nowrap;
`;

export const Summary = styled.div`
  padding: 10px 14px 10px;
  display: grid;
  gap: 8px;
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

export const SummaryLabel = styled.div`
  font-size: 13px;
  color: ${COLORS.label};
`;

export const SummaryValue = styled.div`
  font-size: 16px;
  font-weight: 900;
  color: ${COLORS.text};
`;

export const Footer = styled.div`
  height: 42px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${COLORS.surface2};
`;

export const FooterLeft = styled.div`
  font-size: 12px;
  color: ${COLORS.label};
`;

export const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconBtn = styled.button`
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  color: ${COLORS.label};
  display: grid;
  place-items: center;
  cursor: pointer;

  &:hover {
    color: ${COLORS.text};
  }
`;
