import React from 'react';
import { Component } from 'react';

import { GamepadControls, KeyboardControls } from './controls';
import { NesSettingsEditor } from './settings';

import {
  AchievementsScreen,
  CustomPauseScreen,
  EditorScreen,
  EmojiEventsWhiteImage,
  GamepadWhiteImage,
  KeyboardWhiteImage,
  PauseScreenButton,
  Resources,
  SaveStatesEditor,
  SaveWhiteImage,
  SettingsAppWhiteImage,
  VbBackground,
  TEXT_IDS,
  achievements,
} from '@webrcade/app-common';

export class EmulatorPauseScreen extends Component {
  constructor() {
    super();
    this.state = {
      mode: this.ModeEnum.PAUSE,
      cloudEnabled: false,
      loaded: false
    };
  }

  ModeEnum = {
    PAUSE: 'pause',
    CONTROLS: 'controls',
    SETTINGS: 'nes-settings',
    STATE: 'state',
    ACHIEVEMENTS: 'achievements',
  };

  ADDITIONAL_BUTTON_REFS = [React.createRef(), React.createRef(), React.createRef()];
  SECONDARY_BUTTON_REFS = [React.createRef()];

  componentDidMount() {
    const { loaded } = this.state;
    const { emulator } = this.props;

    if (!loaded) {
      let cloudEnabled = false;
      emulator.getSaveManager().isCloudEnabled()
        .then(c => { cloudEnabled = c; })
        .finally(() => {
          this.setState({
            loaded: true,
            cloudEnabled: cloudEnabled
          });
        })
    }
  }

  render() {
    const { ADDITIONAL_BUTTON_REFS, SECONDARY_BUTTON_REFS, ModeEnum } = this;
    const { appProps, closeCallback, emulator, exitCallback, isEditor, isStandalone } = this.props;
    const { cloudEnabled, loaded, mode } = this.state;

    if (!loaded) {
      return null;
    }

    const additionalButtons = [
      <PauseScreenButton
        key="controls"
        imgSrc={GamepadWhiteImage}
        buttonRef={ADDITIONAL_BUTTON_REFS[0]}
        label={Resources.getText(TEXT_IDS.VIEW_CONTROLS)}
        onHandlePad={(focusGrid, e) =>
          focusGrid.moveFocus(e.type, ADDITIONAL_BUTTON_REFS[0])
        }
        onClick={() => {
          this.setState({ mode: ModeEnum.CONTROLS });
        }}
      />,
      <PauseScreenButton
        key="settings"
        imgSrc={SettingsAppWhiteImage}
        buttonRef={ADDITIONAL_BUTTON_REFS[1]}
        label={"Virtual Boy Settings"}
        onHandlePad={(focusGrid, e) =>
          focusGrid.moveFocus(e.type, ADDITIONAL_BUTTON_REFS[1])
        }
        onClick={() => {
          this.setState({ mode: ModeEnum.SETTINGS });
        }}
      />,
    ];

    if (cloudEnabled) {
      additionalButtons.push(
        <PauseScreenButton
          key="state"
          imgSrc={SaveWhiteImage}
          buttonRef={ADDITIONAL_BUTTON_REFS[2]}
          label={Resources.getText(TEXT_IDS.SAVE_STATES)}
          onHandlePad={(focusGrid, e) =>
            focusGrid.moveFocus(e.type, ADDITIONAL_BUTTON_REFS[2])
          }
          onClick={() => {
            this.setState({ mode: ModeEnum.STATE });
          }}
        />
      );
    }

    const secondaryButtons = [];

    if (achievements.isLoggedIn() && achievements.hasAchievements()) {
      secondaryButtons.push(
        <PauseScreenButton
          key="achievements"
          imgSrc={EmojiEventsWhiteImage}
          buttonRef={SECONDARY_BUTTON_REFS[0]}
          label="Achievements"
          onHandlePad={(focusGrid, e) =>
            focusGrid.moveFocus(e.type, SECONDARY_BUTTON_REFS[0])
          }
          onClick={() => {
            this.setState({ mode: ModeEnum.ACHIEVEMENTS });
          }}
        />
      );
    }

    const usedSecondaryRefs = secondaryButtons.length > 0 ? SECONDARY_BUTTON_REFS.slice(0, 1) : [];

    return (
      <>
        {mode === ModeEnum.PAUSE ? (
          <CustomPauseScreen
            appProps={appProps}
            closeCallback={closeCallback}
            exitCallback={exitCallback}
            isEditor={isEditor}
            isStandalone={isStandalone}
            additionalButtonRefs={ADDITIONAL_BUTTON_REFS}
            additionalButtons={additionalButtons}
            secondaryButtonRefs={usedSecondaryRefs}
            secondaryButtons={secondaryButtons}
          />
        ) : null}
        {mode === ModeEnum.CONTROLS ? (
          <EditorScreen
            onClose={closeCallback}
            tabs={[
              {
                image: GamepadWhiteImage,
                label: Resources.getText(TEXT_IDS.GAMEPAD_CONTROLS),
                content: <GamepadControls />,
              },
              {
                image: KeyboardWhiteImage,
                label: Resources.getText(TEXT_IDS.KEYBOARD_CONTROLS),
                content: <KeyboardControls />,
              },
            ]}
          />
        ) : null}
        {mode === ModeEnum.SETTINGS ? (
          <NesSettingsEditor
            emulator={emulator}
            onClose={closeCallback}
          />
        ) : null}
        {mode === ModeEnum.STATE ? (
          <SaveStatesEditor
            emptyImageSrc={VbBackground}
            emulator={emulator}
            onClose={closeCallback}
            showStatusCallback={emulator.saveMessageCallback}
          />
        ) : null}
        {mode === ModeEnum.ACHIEVEMENTS ? (
          <AchievementsScreen
            onClose={closeCallback}
          />
        ) : null}
      </>
    );
  }
}
