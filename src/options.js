var parser = require('./parsers/parser');
var refiner = require('./refiners/refiner');

function baseOption(strictMode) {

    return {
        parsers: [

            // EN
            new parser.ENISOFormatParser(strictMode),
            new parser.ENDeadlineFormatParser(strictMode),
            new parser.ENMonthNameLittleEndianParser(strictMode),
            new parser.ENMonthNameMiddleEndianParser(strictMode),
            new parser.ENMonthNameParser(strictMode),
            new parser.ENSlashDateFormatParser(strictMode),
            new parser.ENSlashDateFormatStartWithYearParser(strictMode),
            new parser.ENSlashMonthFormatParser(strictMode),
            new parser.ENTimeAgoFormatParser(strictMode),
            new parser.ENTimeExpressionParser(strictMode),

            // JP
            new parser.JPStandardParser(strictMode),

            // ES
            new parser.ESTimeAgoFormatParser(strictMode),
            new parser.ESDeadlineFormatParser(strictMode),
            new parser.ESTimeExpressionParser(strictMode),
            new parser.ESMonthNameLittleEndianParser(strictMode),
            new parser.ESSlashDateFormatParser(strictMode),

            // FR
            new parser.FRDeadlineFormatParser(strictMode),
            new parser.FRMonthNameLittleEndianParser(strictMode),
            new parser.FRSlashDateFormatParser(strictMode),
            new parser.FRTimeAgoFormatParser(strictMode),
            new parser.FRTimeExpressionParser(strictMode),

            // ZH-Hant
            new parser.ZHHantDateParser(strictMode),
            new parser.ZHHantWeekdayParser(strictMode),
            new parser.ZHHantTimeExpressionParser(strictMode),
            new parser.ZHHantCasualDateParser(strictMode),
            new parser.ZHHantDeadlineFormatParser(strictMode),

            // PT-BR
            new parser.PTBRDeadlineFormatParser(strictMode),
            new parser.PTBRMonthNameLittleEndianParser(strictMode),
            new parser.PTBRMonthNameParser(strictMode),
        ],

        refiners: [
            // Removing overlaping first
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),

            // ETC
            new refiner.PTBRMergeDateTimeRefiner(), // TODO set "location", so order won't matter
            new refiner.ENMergeDateTimeRefiner(),
            new refiner.ENMergeDateRangeRefiner(),
            new refiner.ENPrioritizeSpecificDateRefiner(),
            new refiner.FRMergeDateRangeRefiner(),
            new refiner.FRMergeDateTimeRefiner(),
            new refiner.JPMergeDateRangeRefiner(),

            // Extract additional info later
            new refiner.ExtractTimezoneOffsetRefiner(),
            new refiner.ExtractTimezoneAbbrRefiner(),

            new refiner.UnlikelyFormatFilter()
        ]
    }
}



exports.strictOption = function () {
    return baseOption(true);
};


exports.casualOption = function () {

    var options = baseOption(false);

    // EN
    options.parsers.unshift(new parser.ENCasualDateParser());
    options.parsers.unshift(new parser.ENCasualTimeParser());
    options.parsers.unshift(new parser.ENWeekdayParser());
    options.parsers.unshift(new parser.ENRelativeDateFormatParser());

    // JP
    options.parsers.unshift(new parser.JPCasualDateParser());

    // ES
    options.parsers.unshift(new parser.ESCasualDateParser());
    options.parsers.unshift(new parser.ESWeekdayParser());

    // FR
    options.parsers.unshift(new parser.FRCasualDateParser());
    options.parsers.unshift(new parser.FRWeekdayParser());

    // PT-BR
    options.parsers.unshift(new parser.PTBRCasualDateParser());
    options.parsers.unshift(new parser.PTBRCasualTimeParser());
    options.parsers.unshift(new parser.PTBRWeekdayParser());
    options.parsers.unshift(new parser.PTBRDeadlineFormatParser());
    options.parsers.unshift(new parser.PTBRRelativeDateFormatParser());

    return options;
};
