/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Logic blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.ThymioII_sound');

goog.require('Blockly.Blocks');

Blockly.Blocks['thymio2_sound'] = {
  // call sound.record(N)
  // call sound.replay(N)
  init: function() {
    var dropdown = new Blockly.FieldDropdown(
      [['record', 'record'],
       ['replay', 'replay']]);
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('N')
        .setCheck('Number')
        .appendField('sound')
        .appendField(dropdown, 'WHICH');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks['thymio2_sound_play'] = {
  // // call sound.play(N)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput().appendField('sound play').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_sound_system'] = {
  // call sound.system(N)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput().appendField('sound system').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_sound_freq'] = {
  // call sound.freq(Hz, ds)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('HZ').appendField('sound freq')
      .appendField('Hz').setCheck('Number');
    this.appendValueInput('DS').setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT).appendField('ds');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_sound_wave'] = {
  // call sound.wave(wave)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput().appendField('sound wave').setCheck('Array').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
