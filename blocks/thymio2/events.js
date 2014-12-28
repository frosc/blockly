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

goog.provide('Blockly.Blocks.ThymioII_onevent');

goog.require('Blockly.Blocks');

Blockly.Blocks['thymio2_onevent'] = {
  /**
   * Block for onevent.
   * @this Blockly.Block
   */
  init: function() {
    var dropdown = new Blockly.FieldDropdown(
      [['button.backward', 'button.backward'],
       ['button.left', 'button.left'],
       ['button.center', 'button.center'],
       ['button.forward', 'button.forward'],
       ['button.right', 'button.right'],
       ['buttons', 'buttons'],
       ['prox', 'prox'],
       ['prox.comm', 'prox.comm'],
       ['tap', 'tap'],
       ['acc', 'acc'],
       ['mic', 'mic'],
       ['sound.finished', 'sound.finish'],
       ['temperature', 'temperature'],
       ['rc5', 'rc5'],
       ['motor', 'motor'],
       ['timer0', 'timer0'],
       ['timer1', 'timer1']]);
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.appendDummyInput()
        .appendField('onevent')
        .appendField(dropdown, 'EVENT');
    this.appendStatementInput("DO").appendField('do');
    this.setTooltip('onevent');
    this.setColour(210);
  }
};

// TODO: Emit
