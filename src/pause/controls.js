import { ControlsTab } from '@webrcade/app-common';

export class GamepadControls extends ControlsTab {
  render() {
    return (
      <>
        {this.renderControl('start', 'Start')}
        {this.renderControl('select', 'Select')}
        {this.renderControl('dpad', 'Move')}
        {this.renderControl('lanalog', 'Left D-pad')}
        {this.renderControl('ranalog', 'Right D-pad (Analog to digital)')}
        {this.renderControl('b', 'A')}
        {this.renderControl('x', 'A')}
        {this.renderControl('a', 'B')}
        {this.renderControl('y', 'B')}
        {this.renderControl('lbump', 'Left Shoulder')}
        {this.renderControl('rbump', 'Right Shoulder')}
      </>
    );
  }
}

export class KeyboardControls extends ControlsTab {
  render() {
    return (
      <>
        {this.renderKey('Enter', 'Start')}
        {this.renderKey('ShiftRight', 'Select')}
        {this.renderKey('ArrowUp', 'Up')}
        {this.renderKey('ArrowDown', 'Down')}
        {this.renderKey('ArrowLeft', 'Left')}
        {this.renderKey('ArrowRight', 'Right')}
        {this.renderKey('KeyX', 'A')}
        {this.renderKey('KeyA', 'A')}
        {this.renderKey('KeyZ', 'B')}
        {this.renderKey('KeyS', 'B')}
        {this.renderKey('KeyQ', 'Left Shoulder')}
        {this.renderKey('KeyW', 'Right Shoulder')}
      </>
    );
  }
}

