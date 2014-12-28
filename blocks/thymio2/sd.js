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

goog.provide('Blockly.Blocks.ThymioII_sd');

goog.require('Blockly.Blocks');

Blockly.Blocks['thymio2_sd_open'] = {
  // call sd.open(number, status)
  init: function() {
    var variable = new Blockly.FieldVariable('state');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('NUMBER').appendField('sd open').appendField('number').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT)
    this.appendDummyInput().appendField('state').appendField(variable, 'STATE').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_sd_write'] = {
  // call sd.write(data, written)
  init: function() {
    var variable = new Blockly.FieldVariable('written');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('DATA').appendField('sd write').appendField('data').setCheck('Array').setAlign(Blockly.ALIGN_RIGHT)
    this.appendDummyInput().appendField('written').appendField(variable, 'WRITTEN').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_sd_read'] = {
  // call sd.read(data, read)
  init: function() {
    var variable = new Blockly.FieldVariable('read');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('DATA').appendField('sd read').appendField('data').setCheck('Array').setAlign(Blockly.ALIGN_RIGHT)
    this.appendDummyInput().appendField('read').appendField(variable, 'READ').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_sd_seek'] = {
  // call sd.seek(position, status)
  init: function() {
    var variable = new Blockly.FieldVariable('status');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(180);
    this.appendValueInput('POSITION').appendField('sd seek').appendField('position').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT)
    this.appendDummyInput().appendField('status').appendField(variable, 'STATUS').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
