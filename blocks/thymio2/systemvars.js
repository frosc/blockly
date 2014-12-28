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
 * @fileoverview Colour blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.thymio2_sysvar');

goog.require('Blockly.Blocks');

Blockly.Blocks['thymio2_var_event_source'] = {
  // event.source
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(330);
    this.appendDummyInput().appendField('event.source')
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['thymio2_var_event_args'] = {
  // event.args[0-31]
  init: function() {
    var index = new Blockly.FieldTextInput('0');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(330);
    this.appendDummyInput().appendField('event.args').appendField(index, 'INDEX');
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['thymio2_var_button'] = {
  // button.backward
  // button.left
  // button.center 
  // button.forward 
  // button.right 
  init: function() {
    var dropdown = new Blockly.FieldDropdown([
      ['backward', 'backward'],
      ['left', 'left'],
      ['center', 'center'],
      ['forward', 'forward'],
      ['right', 'right']]);
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(330);
    this.appendDummyInput().appendField('button').appendField(dropdown, 'INDEX');
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['thymio2_var_prox_horizontal'] = {
  // prox.horizontal[0-6] 
  init: function() {
    var index_list = [];
    for (var i = 0; i < 7; i++) {
      index_list.push([i.toString(),i.toString()]);
    }
    var dropdown = new Blockly.FieldDropdown(index_list);
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(330);
    this.appendDummyInput().appendField('prox.horizontal').appendField(dropdown, 'INDEX');
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['thymio2_var_prox_comm'] = {
  // prox.comm.rx 
  // prox.comm.tx
  init: function() {
    var dropdown = new Blockly.FieldDropdown([
      ['rx', 'rx'],
      ['tx', 'tx']]);
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(330);
    this.appendDummyInput().appendField('prox.comm').appendField(dropdown, 'INDEX');
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['thymio2_var_prox_comm_tx_set'] = {
  // prox.comm.tx *
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(10);
    this.appendValueInput('VAL').appendField('set prox.comm.tx to').setCheck('Number');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_var_prox_ground'] = {
  // prox.ground.ambiant[0-1] 
  // prox.ground.reflected[0-1] 
  // prox.ground.delta[0-1] 
  init: function() {
    var dropdown0 = new Blockly.FieldDropdown([
      ['ambiant', 'ambiant'],
      ['reflected', 'reflected'],
      ['delta', 'delta']]);
    var index_list = [];
    for (var i = 0; i < 2; i++) {
      index_list.push([i.toString(),i.toString()]);
    }
    var dropdown1 = new Blockly.FieldDropdown(index_list);
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(330);
    this.appendDummyInput().appendField('prox.ground').
      appendField(dropdown0, 'TYPE').appendField(dropdown1, 'INDEX');
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['thymio2_var_motor'] = {
  // motor.left.target
  // motor.right.target
  // motor.left.speed 
  // motor.right.speed 
  // motor.left.pwm 
  // motor.right.pwm 
  init: function() {
    var dropdown0 = new Blockly.FieldDropdown([
      ['left', 'left'],
      ['right', 'right']]);
    var dropdown1 = new Blockly.FieldDropdown([
      ['target', 'target'],
      ['speed', 'speed'],
      ['pwm', 'pwm']]);
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(330);
    this.appendDummyInput().appendField('motor').
      appendField(dropdown0, 'INDEX').appendField(dropdown1, 'TYPE');
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['thymio2_var_motor_target_set'] = {
  // motor.left.target *
  // motor.right.target *
  init: function() {
    var dropdown = new Blockly.FieldDropdown([
      ['left', 'left'],
      ['right', 'right']]);
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(10);
    this.appendValueInput('VAL').appendField('set motor').
      appendField(dropdown, 'INDEX').appendField('target to').setCheck('Number');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_var_acc'] = {
  // acc[0-2] 
  init: function() {
    var index_list = [];
    for (var i = 0; i < 3; i++) {
      index_list.push([i.toString(),i.toString()]);
    }
    var dropdown = new Blockly.FieldDropdown(index_list);
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(330);
    this.appendDummyInput().appendField('acc').appendField(dropdown, 'INDEX');
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['thymio2_var_temperature'] = {
  // temperature
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(330);
    this.appendDummyInput().appendField('temperature')
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['thymio2_var_rc5'] = {
  // rc5.address
  // rc5.command 
  init: function() {
    var dropdown = new Blockly.FieldDropdown([
      ['command', 'command']]);
      ['address', 'address'],
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(330);
    this.appendDummyInput().appendField('rc5').appendField(dropdown, 'TYPE');
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['thymio2_var_mic'] = {
  // mic.intensity
  // mic.threshold
  init: function() {
    var dropdown = new Blockly.FieldDropdown([
      ['intensity', 'intensity']]);
      ['threshold', 'threshold'],
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(330);
    this.appendDummyInput().appendField('mic').appendField(dropdown, 'TYPE');
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['thymio2_var_mic_threshold_set'] = {
  // mic.threshold *
  init: function() {
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(10);
    this.appendValueInput('VAL').appendField('set mic.threshold to').setCheck('Number');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_var_timer_period'] = {
  // timer.period[0-1] *
  init: function() {
    var index_list = [];
    for (var i = 0; i < 2; i++) {
      index_list.push([i.toString(),i.toString()]);
    }
    var dropdown = new Blockly.FieldDropdown(index_list);
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(330);
    this.appendDummyInput().appendField('timer.period').appendField(dropdown, 'INDEX');
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['thymio2_var_timer_period_set'] = {
  // timer.period[0-1] *
  init: function() {
    var index_list = [];
    for (var i = 0; i < 2; i++) {
      index_list.push([i.toString(),i.toString()]);
    }
    var dropdown = new Blockly.FieldDropdown(index_list);
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(10);
    this.appendValueInput('VAL').appendField('set timer.period').
      appendField(dropdown, 'INDEX').appendField('to').setCheck('Number');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
