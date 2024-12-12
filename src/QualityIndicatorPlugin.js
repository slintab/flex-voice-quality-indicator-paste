import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import { CustomizationProvider } from "@twilio-paste/core/customization";
import reducers, { namespace } from "./states";
import QualityIndicatorContainer from "./components/QualityIndicator/QualityIndicator.Container";
import { listenForVoiceClientEvents } from "./helpers/voiceClientHelper";

const PLUGIN_NAME = "QualityIndicatorPlugin";

export default class QualityIndicatorPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider,
    });

    manager.store.addReducer(namespace, reducers);
    listenForVoiceClientEvents(manager);

    flex.MainHeader.Content.add(
      <QualityIndicatorContainer key="quality-indicator" />,
      {
        sortOrder: -1,
        align: "end",
      }
    );
  }
}
