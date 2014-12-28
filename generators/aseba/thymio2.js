/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Generating ASEBA for loop blocks.
 * @author jacques@supcik.net (Jacques Supcik)
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.ASEBA.thymio2');

goog.require('Blockly.ASEBA');
goog.require('goog.color');
goog.require('goog.array');

//
// Generate code for LEDs
//

Blockly.ASEBA['thymio2_leds'] = function(block) {
  var which = block.getFieldValue('WHICH');
  var colour = Blockly.ASEBA.valueToCode(block, 'COLOUR', Blockly.ASEBA.ORDER_NONE) || '#000000'

  var values = goog.array.map(goog.color.hexToRgb(colour), function(c) {return Math.round(c * 32 / 255)});
  var code = 'call leds.' + which + ' (' + values.join(', ') + ')';
  return code + '\n';
};

Blockly.ASEBA['thymio2_leds_circle'] = function(block) {
  var values = []
  for (var i = 0; i < 8; i++) {
    values.push(Blockly.ASEBA.valueToCode(block, 'L' + i, Blockly.ASEBA.ORDER_NONE) || '0')
  }
  var code = 'call leds.circle (' + values.join(', ') + ')';
  return code + '\n';
};

Blockly.ASEBA['thymio2_leds_buttons'] = function(block) {
  var values = []
  for (var i = 0; i < 4; i++) {
    values.push(Blockly.ASEBA.valueToCode(block, 'L' + i, Blockly.ASEBA.ORDER_NONE) || '0')
  }
  var code = 'call leds.circle (' + values.join(', ') + ')';
  return code + '\n';
};

Blockly.ASEBA['thymio2_leds_prox_h'] = function(block) {
  var values = []
  for (var i = 0; i < 8; i++) {
    values.push(Blockly.ASEBA.valueToCode(block, 'L' + i, Blockly.ASEBA.ORDER_NONE) || '0')
  }
  var code = 'call leds.prox.h (' + values.join(', ') + ')';
  return code + '\n';
};

Blockly.ASEBA['thymio2_leds_prox_v'] = function(block) {
  var values = []
  for (var i = 0; i < 2; i++) {
    values.push(Blockly.ASEBA.valueToCode(block, 'L' + i, Blockly.ASEBA.ORDER_NONE) || '0')
  }
  code = 'call leds.prox.v (' + values.join(', ') + ')';
  return code + '\n';
};

Blockly.ASEBA['thymio2_leds_rc'] = function(block) {
  var value = Blockly.ASEBA.valueToCode(block, 'L0', Blockly.ASEBA.ORDER_NONE) || '0';
  var code = 'call leds.rc (' + value + ')';
  return code + '\n';
};

Blockly.ASEBA['thymio2_leds_sound'] = function(block) {
  var value = Blockly.ASEBA.valueToCode(block, 'L0', Blockly.ASEBA.ORDER_NONE) || '0';
  var code = 'call leds.sound (' + value + ')';
  return code + '\n';
};

Blockly.ASEBA['thymio2_leds_temperature'] = function(block) {
  var values = []
  for (var i = 0; i < 2; i++) {
    values.push(Blockly.ASEBA.valueToCode(block, 'L' + i, Blockly.ASEBA.ORDER_NONE) || '0')
  }
  var code = 'call leds.temperature (' + values.join(', ') + ')';
  return code + '\n';
};

//
// Sytstem variables
//

Blockly.ASEBA['thymio2_var_event_source'] = function(block) {
  var code = 'event.source';
  return code;
};

Blockly.ASEBA['thymio2_var_event_args'] = function(block) {
  var i = block.getFieldValue('INDEX');
  var code = 'event.args[' + i + ']';
  return code;
};

Blockly.ASEBA['thymio2_var_button'] = function(block) {
  var i = block.getFieldValue('INDEX');
  var code = 'button.' + i ;
  return code;
};

Blockly.ASEBA['thymio2_var_prox_horizontal'] = function(block) {
  var i = block.getFieldValue('INDEX');
  var code = 'prox.horizontal[' + i + ']';
  return code;
};

Blockly.ASEBA['thymio2_var_prox_comm'] = function(block) {
  var i = block.getFieldValue('INDEX');
  var code = 'prox.comm.' + i ;
  return code;
};

Blockly.ASEBA['thymio2_var_prox_comm_tx_set'] = function(block) {
  var val = Blockly.ASEBA.valueToCode(block, 'VAL',
      Blockly.ASEBA.ORDER_ASSIGNMENT) || '0';
  var code = 'prox.comm.tx = ' + val;
  return code + '\n';
};

Blockly.ASEBA['thymio2_var_prox_ground'] = function(block) {
  var type = block.getFieldValue('TYPE');
  var i = block.getFieldValue('INDEX');
  var code = 'prox.comm.' + type + '[' + i + ']';
  return code;
};

Blockly.ASEBA['thymio2_var_motor'] = function(block) {
  var i = block.getFieldValue('INDEX');
  var type = block.getFieldValue('TYPE');
  var code = 'motor.' + i + '.' + type;
  return code;
};

Blockly.ASEBA['thymio2_var_motor_target_set'] = function(block) {
  var val = Blockly.ASEBA.valueToCode(block, 'VAL',
    Blockly.ASEBA.ORDER_ASSIGNMENT) || '0';
  var i = block.getFieldValue('INDEX');
  var code = 'motor.' + i + '.target = ' + val;
  return code + '\n';
};

Blockly.ASEBA['thymio2_var_acc'] = function(block) {
  var i = block.getFieldValue('INDEX');
  var code = 'acc[' + i + ']';
  return code;
};

Blockly.ASEBA['thymio2_var_event_source'] = function(block) {
  var code = 'temperature';
  return code;
};

Blockly.ASEBA['thymio2_var_rc5'] = function(block) {
  var type = block.getFieldValue('TYPE');
  var code = 'rc5.' + type;
  return code;
};

Blockly.ASEBA['thymio2_mic'] = function(block) {
  var type = block.getFieldValue('TYPE');
  var code = 'mic.' + type;
  return code;
};

Blockly.ASEBA['thymio2_var_mic_threshold_set'] = function(block) {
  var val = Blockly.ASEBA.valueToCode(block, 'VAL',
    Blockly.ASEBA.ORDER_ASSIGNMENT) || '0';
  var code = 'mic.threshold = ' + val;
  return code + '\n';
};

Blockly.ASEBA['thymio2_var_timer_period'] = function(block) {
  var i = block.getFieldValue('INDEX');
  var code = 'timer.period[' + i + ']';
  return code;
};

Blockly.ASEBA['thymio2_var_timer_period_set'] = function(block) {
  var val = Blockly.ASEBA.valueToCode(block, 'VAL',
    Blockly.ASEBA.ORDER_ASSIGNMENT) || '0';
  var i = block.getFieldValue('INDEX');
  var code = 'timer.period[' + i + '] = ' + val;
  return code + '\n';
};
