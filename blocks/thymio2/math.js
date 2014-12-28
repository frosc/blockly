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

goog.provide('Blockly.Blocks.ThymioII_math');

goog.require('Blockly.Blocks');

Blockly.Blocks['thymio2_math_copy'] = {
  // call math.copy(dest, src)
  init: function() {
    var variable = new Blockly.FieldVariable('dest');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendValueInput('SRC').appendField('math copy').appendField('dest').
      appendField(variable, 'DEST').appendField('src').setCheck('Array');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_math_fill'] = {
  // call math.fill(dest, value)
  init: function() {
    var variable = new Blockly.FieldVariable('dest');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendValueInput('VALUE').appendField('math fill').appendField('dest').
      appendField(variable, 'DEST').appendField('value').setCheck('Number');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_math_addscalar'] = {
  // call math.addscalar(dest, src, scalar)
  init: function() {
    var variable = new Blockly.FieldVariable('dest');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendValueInput('SRC').appendField('math addscalar').appendField('dest').
      appendField(variable, 'DEST').appendField('src').setCheck('Array');
    this.appendValueInput('SCALAR').appendField('scalar').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_math_op'] = {
  // call math.add(dest, src1, src2)
  // call math.sub(dest, src1, src2)
  // call math.mul(dest, src1, src2)
  // call math.div(dest, src1, src2)
  // call math.min(dest, src1, src2)
  // call math.max(dest, src1, src2)
  init: function() {
    var dropdown = new Blockly.FieldDropdown(
      [['add', 'add'],
       ['sub', 'sub'],
       ['mul', 'mul'],
       ['div', 'div'],
       ['min', 'min'],
       ['max', 'max']]);
    var variable = new Blockly.FieldVariable('dest');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendValueInput('SRC1').appendField('math').appendField(dropdown, 'OP').
      appendField('dest').appendField(variable, 'DEST').appendField('src1');
    this.appendValueInput('SRC2').appendField('src2').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_math_clamp'] = {
  // call math.clamp(dest, src, low, high)
  init: function() {
    var variable = new Blockly.FieldVariable('dest');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendValueInput('SRC').appendField('math clamp').appendField('dest').
      appendField(variable, 'DEST').appendField('src').setCheck('Array');
    this.appendValueInput('LOW').appendField('low').setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('HIGH').appendField('high').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_math_dot'] = {
  // call math.dot(dest, src1, src2, shift)
  init: function() {
    var variable = new Blockly.FieldVariable('dest');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendValueInput('SRC1').appendField('math dot').appendField('dest').
      appendField(variable, 'DEST').appendField('src1').setCheck('Array');
    this.appendValueInput('SRC2').appendField('src2').setCheck('Array').setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('SHIFT').appendField('shift').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_math_stat'] = {
  // call math.stat(src, min, max, mean)
  init: function() {
    var vmin = new Blockly.FieldVariable('min');
    var vmax = new Blockly.FieldVariable('max');
    var vmean = new Blockly.FieldVariable('mean');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendValueInput().appendField('math stat').appendField('src');
    this.appendDummyInput().appendField('min').appendField(vmin, 'MIN').setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput().appendField('max').appendField(vmax, 'MAX').setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput().appendField('mean').appendField(vmean, 'MEAN').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_math_argbounds'] = {
  // call math.argbounds(src, argmin, argmax)
  init: function() {
    var vmin = new Blockly.FieldVariable('min');
    var vmax = new Blockly.FieldVariable('max');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendValueInput().appendField('math argbounds').appendField('src');
    this.appendDummyInput().appendField('argmin').appendField(vmin, 'ARGMIN').setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput().appendField('argmax').appendField(vmax, 'ARGMAX').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_math_sort'] = {
  // call math.sort(array)
  init: function() {
    var variable = new Blockly.FieldVariable('array');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendDummyInput().appendField('math sort').appendField('array').appendField(variable, 'ARRAY');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_math_muldiv'] = {
  // call math.muldiv(dest, a, b, c)
  init: function() {
    var variable = new Blockly.FieldVariable('dest');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendValueInput('A').appendField('math muldiv').appendField('dest').
      appendField(variable, 'DEST').appendField('a').setCheck('Array');
    this.appendValueInput('B').appendField('b').setCheck('Array').setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('C').appendField('c').setCheck('Array').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_math_atan2'] = {
  // call math.atan2(dest, y, x)
  init: function() {
    var variable = new Blockly.FieldVariable('dest');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendValueInput('Y').appendField('math atan2').appendField('dest').
      appendField(variable, 'DEST').appendField('y');
    this.appendValueInput('X').appendField('x').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_math_trig'] = {
  // call math.sin(dest, x)
  // call math.cos(dest, x)
  init: function() {
    var dropdown = new Blockly.FieldDropdown(
      [['sin', 'sin'],
       ['cos', 'cos']]);
    var variable = new Blockly.FieldVariable('dest');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendValueInput('X').appendField('math').appendField(dropdown, 'OP').appendField('dest').
      appendField(variable, 'DEST').appendField('x');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_math_rot2'] = {
  // call math.rot2(dest, v, a)
  init: function() {
    var variable = new Blockly.FieldVariable('dest');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendValueInput('V').appendField('math rot2').appendField('dest').
      appendField(variable, 'DEST').appendField('v').setCheck('Array');
    this.appendValueInput('A').appendField('a').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['thymio2_math_sqrt'] = {
  // call math.sqrt(dest, x)
  init: function() {
    var variable = new Blockly.FieldVariable('dest');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendValueInput('X').appendField('math sqrt').appendField('dest').
      appendField(variable, 'DEST').appendField('x');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks['thymio2_math_rand'] = {
  // call math.rand(dest)
  init: function() {
    var variable = new Blockly.FieldVariable('dest');
    this.setHelpUrl('https://aseba.wikidot.com/en:thymioprogram');
    this.setColour(230);
    this.appendDummyInput().appendField('math rand').appendField('dest').appendField(variable, 'DEST');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

