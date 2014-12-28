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

goog.provide('Blockly.Blocks.ThymioII_prox');

goog.require('Blockly.Blocks');

Blockly.Blocks['thymio2_prox_comm'] = {
  // call prox.comm.enable(state)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('STATE').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField('prox comm state');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('set to 1 to enable, 0 to disable');
  }
};

Blockly.Blocks['thymio2_prox_comm_enable'] = {
  // call prox.comm.enable(state)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendDummyInput().appendField('prox comm enable');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_prox_comm_disable'] = {
  // call prox.comm.enable(state)
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendDummyInput().appendField('prox comm disable');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
