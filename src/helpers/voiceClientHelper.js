import { Actions as QualityIndicatorAction } from "../states/QualityIndicatorState";

const packetLossThreshold = Number(process.env.FLEX_APP_PACKET_LOSS_THRESHOLD);
const jitterThreshold = Number(process.env.FLEX_APP_JITTER_THRESHOLD);

const warningEvents = [
  "high-rtt",
  "low-mos",
  "high-jitter",
  "high-packet-loss",
  "low-bytes-received",
  "low-bytes-sent",
];
const errorEvents = ["ice-connectivity-lost"];

export const ErrorLevels = {
  ERROR: "DISCONNECTED",
  WARNING: "OKAY",
  ABOVE_ERROR_THRESHOLD: "GREAT",
  NORMAL: "EXCELLENT",
};

export const listenForVoiceClientEvents = (manager) => {
  manager.voiceClient.on("incoming", (connection) => {
    connection.on("sample", (rtcSample) =>
      handleNetworkStatusSample(manager, rtcSample)
    );

    connection.on("warning", (warningName, warningData) =>
      handleWarningEvent(manager, true, warningName, warningData)
    );

    connection.on("warning-cleared", (warningName, warningData) =>
      handleWarningEvent(manager, false, warningName, warningData)
    );
  });

  manager.voiceClient.on("incoming", () => {
    manager.store.dispatch(QualityIndicatorAction.clearData());
  });
};

const handleWarningEvent = (manager, raised, warningName, warningData) => {
  if (warningEvents.includes(warningName)) {
    manager.store.dispatch(
      QualityIndicatorAction.updateWarning(raised, warningName)
    );
  }

  if (errorEvents.includes(warningName)) {
    manager.store.dispatch(
      QualityIndicatorAction.updateError(raised, warningName)
    );
  }
};

const processErrorThresholdUpdate = (manager, jitter, packetsLost) => {
  const currentlySet =
    manager.store.getState()["agent-voice-quality-indicator"].qualityIndicator
      .aboveErrorThreshold;

  const aboveErrorThreshold =
    jitter > jitterThreshold || packetsLost > packetLossThreshold;

  if (currentlySet != aboveErrorThreshold) {
    manager.store.dispatch(
      QualityIndicatorAction.updateAboveThresholdError(aboveErrorThreshold)
    );
  }
};

const handleNetworkStatusSample = (manager, rtcSample) => {
  processErrorThresholdUpdate(manager, rtcSample.jitter, rtcSample.packetsLost);
};
