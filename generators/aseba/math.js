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
 * @fileoverview Generating ASEBA for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.ASEBA.math');

goog.require('Blockly.ASEBA');


Blockly.ASEBA['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  return [code, Blockly.ASEBA.ORDER_ATOMIC];
};

Blockly.ASEBA['math_arithmetic'] = function(block) {
  throw("Not implemented. use aseba_math_arithmetic instead")
};

Blockly.ASEBA['aseba_math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.ASEBA.ORDER_ADDITION],
    'MINUS': [' - ', Blockly.ASEBA.ORDER_SUBTRACTION],
    'MULTIPLY': [' * ', Blockly.ASEBA.ORDER_MULTIPLICATION],
    'DIVIDE': [' / ', Blockly.ASEBA.ORDER_DIVISION],
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.ASEBA.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.ASEBA.valueToCode(block, 'B', order) || '0';
  var code;
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.ASEBA['math_math_single'] = function(block) {
  throw("Not implemented. use aseba_math_single instead")
};

Blockly.ASEBA['aseba_math_single'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    arg = Blockly.ASEBA.valueToCode(block, 'NUM',
        Blockly.ASEBA.ORDER_UNARY_NEGATION) || '0';
    if (arg[0] == '-') {
      // --3 is not legal in ASEBA.
      arg = ' ' + arg;
    }
    code = '-' + arg;
    return [code, Blockly.ASEBA.ORDER_UNARY_NEGATION];
  } else if (operator == 'NOT') {
    arg = Blockly.ASEBA.valueToCode(block, 'NUM',
        Blockly.ASEBA.ORDER_UNARY_NEGATION) || '0';
    if (arg[0] == '~') {
      // ~~3 is not legal in ASEBA.
      arg = ' ' + arg;
    }
    code = '~' + arg;
    return [code, Blockly.ASEBA.ORDER_UNARY_NEGATION];    
  } else if (operator == 'ABS') {
    arg = Blockly.ASEBA.valueToCode(block, 'NUM',
        Blockly.ASEBA.ORDER_NONE) || '0';
    code = 'abs(' + arg + ')';
    return [code, Blockly.ASEBA.ORDER_FUNCTION_CALL];
  } else {
    throw 'Unknown math operator: ' + operator;
  }
};

Blockly.ASEBA['math_constant'] = function(block) {
  throw('not implemented');
};

Blockly.ASEBA['math_number_property'] = function(block) {
  throw('not implemented');
};

Blockly.ASEBA['math_change'] = function(block) {
  throw('not implemented');
};

// Rounding functions have a single operand.
Blockly.ASEBA['math_round'] = Blockly.ASEBA['math_single'];
// Trigonometry functions have a single operand.
Blockly.ASEBA['math_trig'] = Blockly.ASEBA['math_single'];

Blockly.ASEBA['math_on_list'] = function(block) {
  throw('not implemented');
};

Blockly.ASEBA['math_modulo'] = function(block) {
  // Remainder computation.
  var argument0 = Blockly.ASEBA.valueToCode(block, 'DIVIDEND',
      Blockly.ASEBA.ORDER_MODULUS) || '0';
  var argument1 = Blockly.ASEBA.valueToCode(block, 'DIVISOR',
      Blockly.ASEBA.ORDER_MODULUS) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.ASEBA.ORDER_MODULUS];
};

Blockly.ASEBA['math_constrain'] = function(block) {
  throw('not implemented');
};

Blockly.ASEBA['math_random_int'] = function(block) {
    throw('not implemented');
};

Blockly.ASEBA['math_random_float'] = function(block) {
  throw('not implemented');
};
