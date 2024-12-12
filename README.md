# quality-indicator

This repository contains the code for a Twilio Flex plugin for adding a voice quality indicator to the Flex UI. The plugin leverages the Voice SDK network events to display the voice connectivity status of agents. The plugin is based on [this plugin](https://github.com/twilio-professional-services/plugin-voice-quality-indicator).


## Setup

1. Install the [Plugins CLI](https://www.twilio.com/docs/flex/developer/plugins/cli).
2. Install the dependencies by running `npm install`.
3. Rename the `.env.example` file to `.env`.
4. [Optional] Override the default thresholds in the `.env` file:
    - `FLEX_APP_PACKET_LOSS_THRESHOLD`: acceptable packet loss (out of a 50 packet sample). Above this threshold, the indicator will display *Poor connectivity*. 
    -  `FLEX_APP_JITTER_THRESHOLD`: acceptable jitter (in ms). Above this threshold, the indicator will display *Poor connectivity*. 
4. Deploy the Flex plugin using Plugins CLI with the `twilio flex:plugins:deploy --changelog "Voice Quality Indicator"` command.


## Demo

![Demo](quality-indicator.png?raw=true)