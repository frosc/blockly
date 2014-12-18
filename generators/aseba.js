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
 * @fileoverview Helper functions for generating JavaScript for blocks.
 * @author jacques@supcik.net (Jacques Supcik)
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.ASEBA');

goog.require('Blockly.Generator');


/**
 * ASEBA code generator.
 * @type !Blockly.Generator
 */
Blockly.ASEBA = new Blockly.Generator('ASEBA');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.ASEBA.addReservedWords(
    'abs, call, callsub, do, else, elseif, end, for, if, in, onevent, '+
    'return, step, sub, then, var, when, while');

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
 */
Blockly.ASEBA.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.ASEBA.ORDER_MEMBER = 1;         // . []
Blockly.ASEBA.ORDER_NEW = 1;            // new
Blockly.ASEBA.ORDER_FUNCTION_CALL = 2;  // ()
Blockly.ASEBA.ORDER_INCREMENT = 3;      // ++
Blockly.ASEBA.ORDER_DECREMENT = 3;      // --
Blockly.ASEBA.ORDER_LOGICAL_NOT = 4;    // !
Blockly.ASEBA.ORDER_BITWISE_NOT = 4;    // ~
Blockly.ASEBA.ORDER_UNARY_PLUS = 4;     // +
Blockly.ASEBA.ORDER_UNARY_NEGATION = 4; // -
Blockly.ASEBA.ORDER_TYPEOF = 4;         // typeof
Blockly.ASEBA.ORDER_VOID = 4;           // void
Blockly.ASEBA.ORDER_DELETE = 4;         // delete
Blockly.ASEBA.ORDER_MULTIPLICATION = 5; // *
Blockly.ASEBA.ORDER_DIVISION = 5;       // /
Blockly.ASEBA.ORDER_MODULUS = 5;        // %
Blockly.ASEBA.ORDER_ADDITION = 6;       // +
Blockly.ASEBA.ORDER_SUBTRACTION = 6;    // -
Blockly.ASEBA.ORDER_BITWISE_SHIFT = 7;  // << >> >>>
Blockly.ASEBA.ORDER_RELATIONAL = 8;     // < <= > >=
Blockly.ASEBA.ORDER_IN = 8;             // in
Blockly.ASEBA.ORDER_INSTANCEOF = 8;     // instanceof
Blockly.ASEBA.ORDER_EQUALITY = 9;       // == != === !==
Blockly.ASEBA.ORDER_BITWISE_AND = 10;   // &
Blockly.ASEBA.ORDER_BITWISE_XOR = 11;   // ^
Blockly.ASEBA.ORDER_BITWISE_OR = 12;    // |
Blockly.ASEBA.ORDER_LOGICAL_AND = 13;   // &&
Blockly.ASEBA.ORDER_LOGICAL_OR = 14;    // ||
Blockly.ASEBA.ORDER_CONDITIONAL = 15;   // ?:
Blockly.ASEBA.ORDER_ASSIGNMENT = 16;    // = += -= *= /= %= <<= >>= ...
Blockly.ASEBA.ORDER_COMMA = 17;         // ,
Blockly.ASEBA.ORDER_NONE = 99;          // (...)

/**
 * Initialise the database of variable names.
 */
Blockly.ASEBA.init = function() {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.ASEBA.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.ASEBA.functionNames_ = Object.create(null);

  Blockly.ASEBA.internalVariables_ = {};

  if (!Blockly.ASEBA.variableDB_) {
    Blockly.ASEBA.variableDB_ =
        new Blockly.Names(Blockly.ASEBA.RESERVED_WORDS_);
  } else {
    Blockly.ASEBA.variableDB_.reset();
  }

  var defvars = [];
  var variables = Blockly.Variables.allVariables();
  for (var x = 0; x < variables.length; x++) {
    defvars[x] = 'var ' +
        Blockly.ASEBA.variableDB_.getName(variables[x],
        Blockly.Variables.NAME_TYPE);
  }
  Blockly.ASEBA.definitions_['variables'] = defvars.join('\n');
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.ASEBA.finish = function(code) {
  var intvars = [];
  for (var key in Blockly.ASEBA.internalVariables_) {
    intvars.push('var ' + key);
  }
  Blockly.ASEBA.definitions_['aseba_int_variables'] = intvars.join('\n');

  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.ASEBA.definitions_) {
    definitions.push(Blockly.ASEBA.definitions_[name]);
  }
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.ASEBA.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped JavaScript string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} JavaScript string.
 * @private
 */
Blockly.ASEBA.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating JavaScript from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The JavaScript code created for this block.
 * @return {string} JavaScript code with comments and subsequent blocks added.
 * @private
 */
Blockly.ASEBA.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.ASEBA.prefixLines(comment, '# ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.ASEBA.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.ASEBA.prefixLines(comment, '# ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.ASEBA.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};
