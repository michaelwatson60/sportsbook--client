const whiteLabelFlag = process.env.REACT_APP_LABEL_FLAG;

const {
  default: features,
} = require(`../whiteLabelConfigs/${whiteLabelFlag}.config`);

export { features };
