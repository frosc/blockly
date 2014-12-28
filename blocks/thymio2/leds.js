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

goog.provide('Blockly.Blocks.ThymioII_leds');

goog.require('Blockly.Blocks');

Blockly.Blocks['thymio2_leds'] = {
  // call leds.top(red, green, blue)
  // call leds.bottom.left(red, green, blue)
  // call leds.bottom.right(red, green, blue)
  init: function() {
    var dropdown = new Blockly.FieldDropdown(
      [['top', 'top'],
       ['bottom.left', 'bottom.left'],
       ['bottom.right', 'bottom.right']]);
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendField('leds')
        .appendField(dropdown, 'WHICH');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Set case colour");
  }
};

Blockly.Blocks['thymio2_leds_circle'] = {
  // call leds.circle(l0, l1, l2, l3, l4, l5, l6, l7)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('L0').appendField('leds circle').appendField('l0').setCheck('Number');
    for (var i = 1; i < 8; i++) {
      this.appendValueInput('L' + i).setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT).appendField('l' + i);
    }
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_leds_buttons'] = {
  // call leds.buttons(l0, l1, l2, l3)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('L0').appendField('leds buttons').appendField('l0').setCheck('Number');
    for (var i = 1; i < 4; i++) {
      this.appendValueInput('L' + i).setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT).appendField('l' + i);
    }
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_leds_prox_h'] = {
  // call leds.prox.h(l0, l1, l2, l3, l4, l5, l6, l7)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('L0').appendField('leds prox h').appendField('l0').setCheck('Number');
    for (var i = 1; i < 8; i++) {
      this.appendValueInput('L' + i).setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT).appendField('l' + i);
    }
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_leds_prox_v'] = {
  // call leds.prox.v(l0, l1)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('L0').appendField('leds prox v').appendField('l0').setCheck('Number');
    for (var i = 1; i < 3; i++) {
      this.appendValueInput('L' + i).setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT).appendField('l' + i);
    }
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_leds_rc'] = {
  // call leds.rc(led)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('L0').appendField('leds rc').setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_leds_sound'] = {
  // call leds.sound(led)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('L0').appendField('leds sound').setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_leds_temperature'] = {
  // call leds.temperature(red, blue)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('L0').appendField('leds temperature').appendField('l0').setCheck('Number');
    for (var i = 1; i < 2; i++) {
      this.appendValueInput('L' + i).setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT).appendField('l' + i);
    }
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};