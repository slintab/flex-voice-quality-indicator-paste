import React, { Component } from "react";
import { Box } from "@twilio-paste/core/box";
import { Badge } from "@twilio-paste/core/badge";
import { ErrorLevels } from "../../helpers/voiceClientHelper";

class QualityIndicator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { networkStatus } = this.props;

    const errorLevelToStatus = (errorLevel) => {
      switch (errorLevel) {
        case ErrorLevels.ERROR:
          return { label: "Bad connectivity", badge: "error" };
        case ErrorLevels.WARNING:
          return { label: "Poor connectivity", badge: "warning" };
        case ErrorLevels.ABOVE_ERROR_THRESHOLD:
          return { label: "Good connectivity", badge: "info" };
        case ErrorLevels.NORMAL:
          return { label: "Strong connectivity", badge: "success" };
      }
    };

    const { label, badge } = errorLevelToStatus(networkStatus.errorLevel);

    return (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        marginRight="space20"
        paddingY="space10"
        paddingX="space20"
      >
        <Badge as="span" variant={badge}>
          {label}
        </Badge>
      </Box>
    );
  }
}

export default QualityIndicator;
