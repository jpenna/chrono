
function Parser(strictMode) {

    this.isStrictMode = function() { return (strictMode == true) };

    this.pattern = function() { return /./i; }

    this.extract = function(text, ref, match, opt){ return null; }

    this.execute = function(text, ref, opt) {

        var results = [];
        var regex = this.pattern();

        var remainingText = text;
        var match = regex.exec(remainingText);

        while (match) {

            // Calculate match index on the full text;
            match.index += text.length - remainingText.length;

            var result = this.extract(text, ref, match, opt);

            if (result) {

                // If success, start from the end of the result
                remainingText = text.substring(result.index + result.text.length);

                if (!this.isStrictMode() || result.hasPossibleDates()) {
                    results.push(result);
                }

            } else {
                // If fail, move on by 1
                remainingText = text.substring(match.index + 1);
            }

            match = regex.exec(remainingText);
        }

        if (this.refiners) {
            this.refiners.forEach(function () {
                results = refiner.refine(results, text, options);
            });
        }

        return results;
    }
}

exports.Parser = Parser;

// EN
exports.ENISOFormatParser = require('./EN/ENISOFormatParser').Parser;
exports.ENDeadlineFormatParser = require('./EN/ENDeadlineFormatParser').Parser;
exports.ENRelativeDateFormatParser = require('./EN/ENRelativeDateFormatParser').Parser;
exports.ENMonthNameLittleEndianParser = require('./EN/ENMonthNameLittleEndianParser').Parser;
exports.ENMonthNameMiddleEndianParser = require('./EN/ENMonthNameMiddleEndianParser').Parser;
exports.ENMonthNameParser = require('./EN/ENMonthNameParser').Parser;
exports.ENSlashDateFormatParser = require('./EN/ENSlashDateFormatParser').Parser;
exports.ENSlashDateFormatStartWithYearParser = require('./EN/ENSlashDateFormatStartWithYearParser').Parser;
exports.ENSlashMonthFormatParser = require('./EN/ENSlashMonthFormatParser').Parser;
exports.ENTimeAgoFormatParser = require('./EN/ENTimeAgoFormatParser').Parser;
exports.ENTimeExpressionParser = require('./EN/ENTimeExpressionParser').Parser;
exports.ENWeekdayParser = require('./EN/ENWeekdayParser').Parser;
exports.ENCasualDateParser = require('./EN/ENCasualDateParser').Parser;
exports.ENCasualTimeParser = require('./EN/ENCasualTimeParser').Parser;

// JP
exports.JPStandardParser = require('./JP/JPStandardParser').Parser;
exports.JPCasualDateParser = require('./JP/JPCasualDateParser').Parser;

// ES
exports.ESCasualDateParser = require('./ES/ESCasualDateParser').Parser;
exports.ESDeadlineFormatParser = require('./ES/ESDeadlineFormatParser').Parser;
exports.ESTimeAgoFormatParser = require('./ES/ESTimeAgoFormatParser').Parser;
exports.ESTimeExpressionParser = require('./ES/ESTimeExpressionParser').Parser;
exports.ESWeekdayParser = require('./ES/ESWeekdayParser').Parser;
exports.ESMonthNameLittleEndianParser = require('./ES/ESMonthNameLittleEndianParser').Parser;
exports.ESSlashDateFormatParser = require('./ES/ESSlashDateFormatParser').Parser;

// FR
exports.FRCasualDateParser = require('./FR/FRCasualDateParser').Parser;
exports.FRDeadlineFormatParser = require('./FR/FRDeadlineFormatParser').Parser;
exports.FRMonthNameLittleEndianParser = require('./FR/FRMonthNameLittleEndianParser').Parser;
exports.FRSlashDateFormatParser = require('./FR/FRSlashDateFormatParser').Parser;
exports.FRTimeAgoFormatParser = require('./FR/FRTimeAgoFormatParser').Parser;
exports.FRTimeExpressionParser = require('./FR/FRTimeExpressionParser').Parser;
exports.FRWeekdayParser = require('./FR/FRWeekdayParser').Parser;

// ZH-Hant
exports.ZHHantDateParser = require('./ZH-Hant/ZHHantDateParser').Parser;
exports.ZHHantWeekdayParser = require('./ZH-Hant/ZHHantWeekdayParser').Parser;
exports.ZHHantTimeExpressionParser = require('./ZH-Hant/ZHHantTimeExpressionParser').Parser;
exports.ZHHantCasualDateParser = require('./ZH-Hant/ZHHantCasualDateParser').Parser;
exports.ZHHantDeadlineFormatParser = require('./ZH-Hant/ZHHantDeadlineFormatParser').Parser;

// PT-BR
exports.PTBRCasualDateParser = require('./PT-BR/PTBRCasualDateParser').Parser;
exports.PTBRCasualTimeParser = require('./PT-BR/PTBRCasualTimeParser').Parser;
exports.PTBRWeekdayParser = require('./PT-BR/PTBRWeekdayParser').Parser;
exports.PTBRDeadlineFormatParser = require('./PT-BR/PTBRDeadlineFormatParser').Parser;
exports.PTBRMonthNameLittleEndianParser = require('./PT-BR/PTBRMonthNameLittleEndianParser').Parser;
exports.PTBRMonthNameParser = require('./PT-BR/PTBRMonthNameParser').Parser;
exports.PTBRRelativeDateFormatParser = require('./PT-BR/PTBRRelativeDateFormatParser').Parser;
exports.PTBRSlashDateFormatParser = require('./PT-BR/PTBRSlashDateFormatParser').Parser;
exports.PTBRTimeAgoFormatParser = require('./PT-BR/PTBRTimeAgoFormatParser').Parser;
exports.PTBRTimeExpressionParser = require('./PT-BR/PTBRTimeExpressionParser').Parser;
exports.PTBRSlashMonthFormatParser = require('./PT-BR/PTBRSlashMonthFormatParser').Parser;
exports.DEDeadlineFormatParser = require('./DE/DEDeadlineFormatParser').Parser;
exports.DEMonthNameLittleEndianParser = require('./DE/DEMonthNameLittleEndianParser').Parser;
exports.DEMonthNameParser = require('./DE/DEMonthNameParser').Parser;
exports.DESlashDateFormatParser = require('./DE/DESlashDateFormatParser').Parser;
exports.DETimeAgoFormatParser = require('./DE/DETimeAgoFormatParser').Parser;
exports.DETimeExpressionParser = require('./DE/DETimeExpressionParser').Parser;
exports.DEWeekdayParser = require('./DE/DEWeekdayParser').Parser;
exports.DECasualDateParser = require('./DE/DECasualDateParser').Parser;
