import React from 'react';
import {
  Notification__styled,
  NotificationIcon__styled,
  NotificationText__styled,
} from './Notification.styled';

const Notification = ({
  icon = 'notification',
  text = 'No events at the moment',
}) => {
  return (
    <Notification__styled>
      <NotificationIcon__styled>
        <svg>
          <use xlinkHref={`#${icon}`} />
        </svg>
      </NotificationIcon__styled>
      <NotificationText__styled>{text}</NotificationText__styled>
    </Notification__styled>
  );
};

export default Notification;
