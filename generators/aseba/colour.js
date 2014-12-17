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
 * @fileoverview Generating JavaScript for colour blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.ASEBA.colour');

goog.require('Blockly.ASEBA');


Blockly.ASEBA['colour_picker'] = function(block) {
  // Colour picker.
  var code = '\'' + block.getFieldValue('COLOUR') + '\'';
  return [code, Blockly.ASEBA.ORDER_ATOMIC];
};

Blockly.ASEBA['colour_random'] = function(block) {
  // Generate a random colour.
  var functionName = Blockly.ASEBA.provideFunction_(
      'colour_random',
      [ 'function ' + Blockly.ASEBA.FUNCTION_NAME_PLACEHOLDER_ + '() {',
        '  var num = Math.floor(Math.random() * Math.pow(2, 24));',
        '  return \'#\' + (\'00000\' + num.toString(16)).substr(-6);',
        '}']);
  var code = functionName + '()';
  return [code, Blockly.ASEBA.ORDER_FUNCTION_CALL];
};

Blockly.ASEBA['colour_rgb'] = function(block) {
  // Compose a colour from RGB components expressed as percentages.
  var red = Blockly.ASEBA.valueToCode(block, 'RED',
      Blockly.ASEBA.ORDER_COMMA) || 0;
  var green = Blockly.ASEBA.valueToCode(block, 'GREEN',
      Blockly.ASEBA.ORDER_COMMA) || 0;
  var blue = Blockly.ASEBA.valueToCode(block, 'BLUE',
      Blockly.ASEBA.ORDER_COMMA) || 0;
  var functionName = Blockly.ASEBA.provideFunction_(
      'colour_rgb',
      [ 'function ' + Blockly.ASEBA.FUNCTION_NAME_PLACEHOLDER_ +
          '(r, g, b) {',
        '  r = Math.max(Math.min(Number(r), 100), 0) * 2.55;',
        '  g = Math.max(Math.min(Number(g), 100), 0) * 2.55;',
        '  b = Math.max(Math.min(Number(b), 100), 0) * 2.55;',
        '  r = (\'0\' + (Math.round(r) || 0).toString(16)).slice(-2);',
        '  g = (\'0\' + (Math.round(g) || 0).toString(16)).slice(-2);',
        '  b = (\'0\' + (Math.round(b) || 0).toString(16)).slice(-2);',
        '  return \'#\' + r + g + b;',
        '}']);
  var code = functionName + '(' + red + ', ' + green + ', ' + blue + ')';
  return [code, Blockly.ASEBA.ORDER_FUNCTION_CALL];
};

Blockly.ASEBA['colour_blend'] = function(block) {
  // Blend two colours together.
  var c1 = Blockly.ASEBA.valueToCode(block, 'COLOUR1',
      Blockly.ASEBA.ORDER_COMMA) || '\'#000000\'';
  var c2 = Blockly.ASEBA.valueToCode(block, 'COLOUR2',
      Blockly.ASEBA.ORDER_COMMA) || '\'#000000\'';
  var ratio = Blockly.ASEBA.valueToCode(block, 'RATIO',
      Blockly.ASEBA.ORDER_COMMA) || 0.5;
  var functionName = Blockly.ASEBA.provideFunction_(
      'colour_blend',
      [ 'function ' + Blockly.ASEBA.FUNCTION_NAME_PLACEHOLDER_ +
          '(c1, c2, ratio) {',
        '  ratio = Math.max(Math.min(Number(ratio), 1), 0);',
        '  var r1 = parseInt(c1.substring(1, 3), 16);',
        '  var g1 = parseInt(c1.substring(3, 5), 16);',
        '  var b1 = parseInt(c1.substring(5, 7), 16);',
        '  var r2 = parseInt(c2.substring(1, 3), 16);',
        '  var g2 = parseInt(c2.substring(3, 5), 16);',
        '  var b2 = parseInt(c2.substring(5, 7), 16);',
        '  var r = Math.round(r1 * (1 - ratio) + r2 * ratio);',
        '  var g = Math.round(g1 * (1 - ratio) + g2 * ratio);',
        '  var b = Math.round(b1 * (1 - ratio) + b2 * ratio);',
        '  r = (\'0\' + (r || 0).toString(16)).slice(-2);',
        '  g = (\'0\' + (g || 0).toString(16)).slice(-2);',
        '  b = (\'0\' + (b || 0).toString(16)).slice(-2);',
        '  return \'#\' + r + g + b;',
        '}']);
  var code = functionName + '(' + c1 + ', ' + c2 + ', ' + ratio + ')';
  return [code, Blockly.ASEBA.ORDER_FUNCTION_CALL];
};