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

goog.provide('Blockly.ASEBA.loops');

goog.require('Blockly.ASEBA');


Blockly.ASEBA['controls_repeat'] = function(block) {
  // Repeat n times (internal number).
  var repeats = Number(block.getFieldValue('TIMES'));
  var branch = Blockly.ASEBA.statementToCode(block, 'DO');
  branch = Blockly.ASEBA.addLoopTrap(branch, block.id);
  var loopVar = Blockly.ASEBA.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  Blockly.ASEBA.internalVariables_.add(loopVar);
  var code = 'for ' + loopVar + ' in 1:' + repeats + ' do\n' +
      branch +
      'end\n';
  return code;
};

Blockly.ASEBA['controls_repeat_ext'] = function(block) {
  // Repeat n times (external number).
  var repeats = Blockly.ASEBA.valueToCode(block, 'TIMES',
      Blockly.ASEBA.ORDER_ASSIGNMENT) || '0';
  var branch = Blockly.ASEBA.statementToCode(block, 'DO');
  branch = Blockly.ASEBA.addLoopTrap(branch, block.id);
  var code = '';
  var loopVar = Blockly.ASEBA.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var endVar = repeats;
  Blockly.ASEBA.internalVariables_.add(loopVar);
  
  if (Blockly.isNumber(repeats)) {
    code += 'for ' + loopVar + ' in 1:' + endVar + ' do\n' +
        branch +
        'end\n';
  } else {
    if (!repeats.match(/^\w+$/)) {
      var endVar = Blockly.ASEBA.variableDB_.getDistinctName(
          'repeat_end', Blockly.Variables.NAME_TYPE);
      Blockly.ASEBA.internalVariables_.add(endVar);
      code += endVar + ' = ' + repeats + '\n';
    }
    code += loopVar + ' = 0\n' +
      'while ' + loopVar + ' < ' + endVar + '\n' +
      branch +
      '  ' + loopVar + ' += 1\n' +
      'end\n';
  }
  return code;
};

Blockly.ASEBA['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.ASEBA.valueToCode(block, 'BOOL',
      until ? Blockly.ASEBA.ORDER_LOGICAL_NOT :
      Blockly.ASEBA.ORDER_NONE) || 'false';
  var branch = Blockly.ASEBA.statementToCode(block, 'DO');
  branch = Blockly.ASEBA.addLoopTrap(branch, block.id);
  if (until) {
    argument0 = 'not ' + argument0;
  }
  return 'while ' + argument0 + '\n' + branch + 'end\n';
};

Blockly.ASEBA['controls_for'] = function(block) {
  // For loop.
  var variable0 = Blockly.ASEBA.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.ASEBA.valueToCode(block, 'FROM',
      Blockly.ASEBA.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.ASEBA.valueToCode(block, 'TO',
      Blockly.ASEBA.ORDER_ASSIGNMENT) || '0';
  var increment = Blockly.ASEBA.valueToCode(block, 'BY',
      Blockly.ASEBA.ORDER_ASSIGNMENT) || '1';
  var branch = Blockly.ASEBA.statementToCode(block, 'DO');
  branch = Blockly.ASEBA.addLoopTrap(branch, block.id);
  var code;
  if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
      Blockly.isNumber(increment)) {
    // All arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0;
    var step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
      var startVar = Blockly.ASEBA.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'var ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
      var endVar = Blockly.ASEBA.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + argument1 + ';\n';
    }
    // Determine loop direction at start, in case one of the bounds
    // changes during loop execution.
    var incVar = Blockly.ASEBA.variableDB_.getDistinctName(
        variable0 + '_inc', Blockly.Variables.NAME_TYPE);
    code += 'var ' + incVar + ' = ';
    if (Blockly.isNumber(increment)) {
      code += Math.abs(increment) + ';\n';
    } else {
      code += 'Math.abs(' + increment + ');\n';
    }
    code += 'if (' + startVar + ' > ' + endVar + ') {\n';
    code += Blockly.ASEBA.INDENT + incVar + ' = -' + incVar + ';\n';
    code += '}\n';
    code += 'for (' + variable0 + ' = ' + startVar + ';\n' +
        '     ' + incVar + ' >= 0 ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + ';\n' +
        '     ' + variable0 + ' += ' + incVar + ') {\n' +
        branch + '}\n';
  }
  return code;
};

Blockly.ASEBA['controls_forEach'] = function(block) {
  // For each loop.
  var variable0 = Blockly.ASEBA.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.ASEBA.valueToCode(block, 'LIST',
      Blockly.ASEBA.ORDER_ASSIGNMENT) || '[]';
  var branch = Blockly.ASEBA.statementToCode(block, 'DO');
  branch = Blockly.ASEBA.addLoopTrap(branch, block.id);
  var indexVar = Blockly.ASEBA.variableDB_.getDistinctName(
      variable0 + '_index', Blockly.Variables.NAME_TYPE);
  branch = Blockly.ASEBA.INDENT + variable0 + ' = ' +
      argument0 + '[' + indexVar + '];\n' + branch;
  var code = 'for (var ' + indexVar + ' in ' + argument0 + ') {\n' +
      branch + '}\n';
  return code;
};

Blockly.ASEBA['controls_flow_statements'] = function(block) {
  // Flow statements: continue, break.
  throw 'ASEBA does not support flow statement.';
};
