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
 * @fileoverview Generating ASEBA for colour blocks.
 * @author jacques@supcik.net (Jacques Supcik)
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.ASEBA.colour');

goog.require('Blockly.ASEBA');
goog.require('goog.color');
goog.require('goog.array');


Blockly.ASEBA['colour_picker'] = function(block) {
  // Colour picker.
  var code = block.getFieldValue('COLOUR');
  return [code, Blockly.ASEBA.ORDER_ATOMIC];
};

Blockly.ASEBA['colour_rgb'] = function(block) {
  // Compose a colour from RGB components expressed as percentages.
  var red = Blockly.ASEBA.valueToCode(block, 'RED',
      Blockly.ASEBA.ORDER_COMMA) || 0;
  var green = Blockly.ASEBA.valueToCode(block, 'GREEN',
      Blockly.ASEBA.ORDER_COMMA) || 0;
  var blue = Blockly.ASEBA.valueToCode(block, 'BLUE',
      Blockly.ASEBA.ORDER_COMMA) || 0;
  if (!Blockly.isNumber(red)   || 
      !Blockly.isNumber(green) || 
      !Blockly.isNumber(blue)) {
    throw ("RGB Color with non-constant values is not yet implemented")
  }
  return [goog.color.rgbToHex(red, green, blue), Blockly.ASEBA.ORDER_ATOMIC];
};

Blockly.ASEBA['colour_blend'] = function(block) {
  // Blend two colours together.
  var c1 = Blockly.ASEBA.valueToCode(block, 'COLOUR1',
      Blockly.ASEBA.ORDER_COMMA) || '#000000';
  var c2 = Blockly.ASEBA.valueToCode(block, 'COLOUR2',
      Blockly.ASEBA.ORDER_COMMA) || '#000000';
  var ratio = Blockly.ASEBA.valueToCode(block, 'RATIO',
      Blockly.ASEBA.ORDER_COMMA) || 0.5;
  if (!Blockly.isNumber(ratio)) {
    throw ("Blend Colors with non-constant ratio is not yet implemented")
  }
  var colour = goog.color.blend(goog.color.hexToRgb(c1), goog.color.hexToRgb(c2), ratio)
  return [goog.color.rgbToHex(colour), Blockly.ASEBA.ORDER_ATOMIC];
}
