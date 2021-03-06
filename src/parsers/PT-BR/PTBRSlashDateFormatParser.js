/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Tuesday 11/3/2015
    - 11/3/2015
    - 11/3
    - Terça 11 do 3
    - 11 do 3
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util = require('../../utils/PT-BR');

var PATTERN = new RegExp('(\\W|^)' +
    '(?:' +
        '(?:n[oa]\\s*?)?' +
        '\\b((?:dom(?:ingo)?|seg(?:unda)?|ter(?:er[cç]a)?|qua(?:rta)?|qui(?:nta?)?|sex(?:ta)?|s[áa]b(?:ado)?)(?:-feira)?)\\b' +
        '\\s*\\,?\\s*' +
    ')?' +
    '([0-3]{0,1}[0-9]{1})(?:[\\/\\.\\-]|\\s*do\\s*)([0-3]{0,1}[0-9]{1})' +
    '(?:' +
        '[\\/\\.\\-]|\\s*de\\s*' +
        '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' +
    ')?' +
    '(\\W|$)', 'i');

var DAYS_OFFSET = util.WEEKDAY_OFFSET;

var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;

var WEEKDAY_GROUP = 2;
var DAY_GROUP = 3;
var MONTH_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function PTBRSlashDateFormatParser(argument) {
    Parser.apply(this, arguments);

    this.pattern = function () { return PATTERN; };
    this.extract = function(text, ref, match, opt){

        if(match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
            // Long skip, if there is some overlapping like:
            // XX[/YY/ZZ]
            // [XX/YY/]ZZ
            match.index += match[0].length
            return;
        }

        var index = match.index + match[OPENNING_GROUP].length;
        var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);

        var result = new ParsedResult({
            text: text,
            index: index,
            ref: ref,
        });

        if(text.match(/^\d\.\d$/)) return;
        if(text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return;

        // dd/MM -> OK
        // dd-MM -> OK
        // dd do MM -> OK
        // dd.MM -> NG
        if(!match[YEAR_GROUP] && match[0].indexOf('.') > 0) return;

        var date = null;
        var year = match[YEAR_GROUP] || moment(ref).year() + '';
        var month = match[MONTH_GROUP];
        var day   = match[DAY_GROUP];

        month = parseInt(month);
        day  = parseInt(day);
        year = parseInt(year);

        if(month < 1 || month > 12) {
            if(month > 12) {
                // dd/mm/yyyy date format if day looks like a month, and month
                // looks like a day.
                if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
                    // unambiguous
                    var tday = month;
                    month = day;
                    day = tday;
                }
                else {
                    // both month and day are <= 12
                    return null;
                }
            }
        }
        if(day < 1 || day > 31) return null;

        if(year < 100){
            if (year > 50) {
                year = year + 1900;
            } else {
                year = year + 2000;
            }
        }

        result.start.assign('day', day);
        result.start.assign('month', month);
        result.start.assign('year', year);

        //Day of week
        if(match[WEEKDAY_GROUP]) {
            result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
        }

        result.tags['PTBRSlashDateFormatParser'] = true;
        return result;
    };
};
