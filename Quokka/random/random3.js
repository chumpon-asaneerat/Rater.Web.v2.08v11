//#region Timespan

/** 
 * The TimeSpan class. 
 */
const TimeSpan = class {
    //#region constructor

    /**
     * Create new instace of Timespoan class.
     */
    constructor() {
        let len = arguments.length;
        let plens = TimeSpan.constructors.map((item) => item.length);
        let idx = plens.indexOf(len);
        if (idx === -1) {
            throw ("No constructor of TimeSpan supports " + len + " arguments");
        }
        // local variables
        this.ticks = 0; // total milliseconds elapsed from January 1, 1970
        // init variable by arguments.
        TimeSpan.constructors[idx].init(this, ...arguments);
    }

    //#endregion

    //#region public methods

    /**
     * Checks is TimeSpan is equals.
     * @param {TimeSpan} timespan The TimeSpan object to compare.
     */
    equals(timespan) { return this.ticks === timespan.ticks; }
    /**
     * Gets duration in milliseconds.
     */
    duration() { return new TimeSpan(Math.abs(this.ticks)); }
    /**
     * Gets string of current TimeSpan object.
     */
    toString() {
        let sign = (this.ticks < 0 ? "-" : "");
        let dy = (Math.abs(this.days) ? Math.abs(this.days) + "." : "0.");
        let hr = TimeSpan.pad(Math.abs(this.hours));
        let min = TimeSpan.pad(Math.abs(this.minutes));
        let sec = TimeSpan.pad(Math.abs(this.seconds));
        let ms = TimeSpan.pad(Math.abs(this.milliseconds), 3);
        return sign + dy + hr + ":" + min + ":" + sec + "." + ms;
    }
    /**
     * Add timespan.
     * @param {TimeSpan} timespan The TimeSpan object to add.
     */
    add(timespan) { return new TimeSpan(this.ticks + timespan.ticks); }
    /**
     * Subtract timespan.
     * @param {TimeSpan} timespan The TimeSpan object to subtract.
     */
    subtract(timespan) { return new TimeSpan(this.ticks - timespan.ticks); }

    //#endregion

    //#region public properties

    /**
     * Gets days part.
     */
    get days() { return Math.floor(this.ticks / (24 * 3600 * 1000)); }
    /**
     * Gets hours part.
     */
    get hours() { return Math.floor((this.ticks % (24 * 3600 * 1000)) / (3600 * 1000)); }
    /**
     * Gets minutes part.
     */
    get minutes() { return Math.floor((this.ticks % (3600 * 1000)) / (60 * 1000)); }
    /**
     * Gets seconds part.
     */
    get seconds() { return Math.floor((this.ticks % 60000) / 1000); }
    /**
     * Gets milliseconds part.
     */
    get milliseconds() { return Math.floor(this.ticks % 1000); }
    /**
     * Gets total days.
     */
    get totalDays() { return this.ticks / (24 * 3600 * 1000); }
    /**
     * Gets total hours.
     */
    get totalHours() { return this.ticks / (3600 * 1000); }
    /**
     * Gets total minutes.
     */
    get totalMinutes() { return this.ticks / (60 * 1000); }
    /**
     * Gets total seconds.
     */
    get totalSeconds() { return this.ticks / 1000; }
    /**
     * Gets total milliseconds.
     */
    get totalMilliseconds() { return this.ticks; }

    //#endregion

    //#region static methods and properties

    /**
     * Create new TimeSpan from specificed days.
     * @param {Number} days The days value.
     */
    static fromDays(days) { return new TimeSpan(days, 0); }
    /**
     * Create new TimeSpan from specificed hours.
     * @param {Number} hours The hours value.
     */
    static fromHours(hours) { return new TimeSpan(0, hours); }
    /**
     * Create new TimeSpan from specificed minutes.
     * @param {Number} hours The minutes value.
     */
    static fromMinutes(minutes) { return new TimeSpan(0, minutes, 0); }
    /**
     * Create new TimeSpan from specificed seconds.
     * @param {Number} hours The seconds value.
     */
    static fromSeconds(seconds) { return new TimeSpan(0, 0, seconds); }

    /**
     * Gets class version.
     */
    static get version() { return "2.0.0"; }

    //#endregion
}

//#region TimeSpan Internal consts and methods

/** This constant array is for internal used. @ignore */
TimeSpan.constructors = [
    {
        length: 0,
        init: (ts) => {
            ts.ticks = 0;
        }
    },
    {
        length: 1,
        init: (ts, milliseconds) => {
            ts.ticks = milliseconds;
        }
    },
    {
        length: 2,
        init: (ts, days, hours) => {
            ts.ticks = (days * 86400 + hours * 3600) * 1000;
            console.log(ts.ticks)
        }
    },
    {
        length: 3,
        init: (ts, hours, minutes, seconds) => {
            ts.ticks = (hours * 3600 + minutes * 60 + seconds) * 1000;
        }
    },
    {
        length: 4,
        init: (ts, days, hours, minutes, seconds) => {
            ts.ticks = (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000;
        }
    },
    {
        length: 5,
        init: (ts, days, hours, minutes, seconds, milliseconds) => {
            ts.ticks = (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;
        }
    }
];
/** This function is for internal used. @ignore */
TimeSpan.pad = (number, len = 2) => String(number).padStart(len, "0")

//#endregion

//#endregion

//#region DateTime

/** 
 * The DateTime class. Provide various methods and property to work with Date and Time.
 * 
 * @example
 * // nlib load module.
 * const nlib = require("./src/server/js/nlib/nlib");
 * // create new DateTime instance.
 * let dt = new nlib.DateTime();
 * // show current DateTime.
 * console.log(dt.toString());
 */
const DateTime = class  {
    //#region constructor

    /**
     * Create new instace of DateTime class.
     */
    constructor() {
        let len = arguments.length;
        let plens = DateTime.constructors.map((item) => item.length);
        let idx = plens.indexOf(len);

        if (idx === -1) {
            throw ("No constructor of DateTime supports " + len + " arguments");
        }

        // local variables.
        this.span = new TimeSpan();
        // init variable by arguments.
        DateTime.constructors[idx].init(this, ...arguments);
        // keep Date object value.
        this.value = new Date(this.span.ticks);
    }

    //#endregion

    //#region public methods

    /**
     * Add timespan to current DateTime object.
     * @param {TimeSpan} timespan The TimeSpan object.
     * @return {DateTime} Returns new DateTime object that add the specificed parameter.
     */
    add(timespan) {
        return new DateTime(this.span.ticks + timespan.ticks);
    }
    /**
     * Add year(s) to current DateTime object.
     * @param {Number} years The number of years (can be both positive and negative value).
     * @return {DateTime} Returns new DateTime object that add the specificed parameter.
     */
    addYears(years) {
        return new DateTime(this.year + years, this.month, this.day,
            this.hour, this.minute, this.second, this.millisecond);
    }
    /**
     * Add month(s) to current DateTime object.
     * @param {Number} months The number of months (can be both positive and negative value).
     * @param {Boolean} autoCalcDays. True to calculate exact math day in each month to add or substract.
     * @return {DateTime} Returns new DateTime object that add the specificed parameter.
     */
    addMonths(months, autoCalcDays) {
        let y = this.year;
        let m = this.month;
        let r = DateTime.calcAddMonthDays(y, m, months);
        let ret;
        if (autoCalcDays) {
            ret = this.addDays(r.days);
        }
        else {
            let endOfMonth = DateTime.daysInMonth(r.year, r.month);
            let newday = (this.isEndOfMonth) ? endOfMonth : this.day;

            ret = new DateTime(
                r.year, r.month, newday,
                this.hour, this.minute, this.second,
                this.millisecond);
        }
        return ret;
    }
    /**
     * Add day(s) to current DateTime object.
     * @param {Number} days The number of days (can be both positive and negative value).
     * @return {DateTime} Returns new DateTime object that add the specificed parameter.
     */
    addDays(days) {
        return new DateTime(this.span.ticks + ((days * 86400) * 1000));
    }
    /**
     * Add hour(s) to current DateTime object.
     * @param {Number} hours The number of hours (can be both positive and negative value).
     * @return {DateTime} Returns new DateTime object that add the specificed parameter.
     */
    addHours(hours) {
        return new DateTime(this.span.ticks + ((hours * 3600) * 1000));
    }
    /**
     * Add second(s) to current DateTime object.
     * @param {Number} minutes The number of minutes (can be both positive and negative value).
     * @return {DateTime} Returns new DateTime object that add the specificed parameter.
     */
    addMinutes(minutes) {
        return new DateTime(this.span.ticks + ((minutes * 60) * 1000));
    }
    /**
     * Add second(s) to current DateTime object.
     * @param {Number} seconds The number of seconds (can be both positive and negative value).
     * @return {DateTime} Returns new DateTime object that add the specificed parameter.
     */
    addSeconds(seconds) {
        return new DateTime(this.span.ticks + (seconds * 1000));
    }
    /**
     * Add millisecond(s) to current DateTime object.
     * @param {Number} milliseconds The number of milliseconds (can be both positive and negative value).
     * @return {DateTime} Returns new DateTime object that add the specificed parameter.
     */
    addMilliseconds(milliseconds) {
        return new DateTime(this.span.ticks + milliseconds);
    }

    /**
     * Format Current DateTime object with specificed format's mask.
     */
    format(mask, locale = DateTime.LocaleSettings) {
        const token = /d{1,4}|M{1,4}|y{1,4}|([Hhms])\1?|tt|[Ll]|"[^"]*"|'[^']*'/g
        const d = this.day;
        const D = this.dayOfWeek;
        const M = this.month;
        const y = this.year;
        const H = this.hour;
        const m = this.minute;
        const s = this.second;
        const L = this.millisecond;
        const flags = {
            d,
            dd: DateTime.pad(d),
            ddd: locale.abbreviatedDayNames[D],
            dddd: locale.dayNames[D],
            M,
            MM: DateTime.pad(M),
            MMM: locale.abbreviatedMonthNames[M - 1],
            MMMM: locale.monthNames[M - 1],
            y: Number(String(y).slice(2)),
            yy: String(y).slice(2),
            yyy: DateTime.pad(y, 3),
            yyyy: DateTime.pad(y, 4),
            h: H % 12 || 12,
            hh: DateTime.pad(H % 12 || 12),
            H,
            HH: DateTime.pad(H),
            m,
            mm: DateTime.pad(m),
            s,
            ss: DateTime.pad(s),
            l: DateTime.pad(L, 3),
            L: DateTime.pad(L > 99 ? Math.round(L / 10) : L),
            tt: H < 12 ? "AM" : "PM",
        };
        return mask.replace(token, ($0) => {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1)
        });
    }
    /**
     * Gets valueOf current object.
     */
    valueOf() {
        return this.span.ticks;
    }
    /**
     * Gets string that represents current DateTime Object.
     * @param {String} format The format string.
     */
    toString(format = "yyyy-MM-dd HH:mm:ss.l") {
        let fmt = (format) ? format : "yyyy-MM-dd HH:mm:ss.l";
        return this.format(fmt);
    }

    //#endregion

    //#region public properties

    /**
     * Gets the year part.
     */
    get year() { return this.value.getFullYear(); }
    /**
     * Gets the month part.
     */
    get month() { return this.value.getMonth() + 1; }
    /**
     * Gets the day part.
     */
    get day() { return this.value.getDate(); }
    /**
     * Gets the day of week value (0-sunday, 1-monday, ...).
     */
    get dayOfWeek() { return this.value.getDay(); }
    /**
     * Gets the hour part.
     */
    get hour() { return this.value.getHours(); }
    /**
     * Gets the minute part.
     */
    get minute() { return this.value.getMinutes(); }
    /**
     * Gets the second part.
     */
    get second() { return this.value.getSeconds(); }
    /**
     * Gets the millisecond part.
     */
    get millisecond() { return this.value.getMilliseconds(); }
    /**
     * Checks current day is end of month.
     */
    get isEndOfMonth() {
        let ret = (DateTime.daysInMonth(this.year, this.month) === this.day);
        return ret;
    }
    /**
     * Gets Current DateTime.
     * @return {DateTime} Returns the DateTime object of current time.
     */
    get now() { return DateTime.now; }
    /**
     * Gets Elapsed TimeSpan.
     * @return {TimeSpan} Returns the TimeSpan object from Now - Current DateTime (self).
     */
    get elapsed() {
        return new TimeSpan(DateTime.now.span.ticks - this.span.ticks);
    }

    //#endregion

    //#region static methods and properties

    /**
     * Gets Current DateTime.
     * @return {DateTime} Returns the DateTime object of current time.
     */
    static get now() { return new DateTime(Date.now()) }
    /**
     * Checks is leap year.
     * 
     * @param {Number} year The year value.
     */
    static isLeapYear(year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
    }
    /**
     * Checks is month is betweeen 1 to 12.
     * 
     * @param {Number} month The month value.
     */
    static isValidMonth(month) { return (month > 0 && month <= 12); }
    /**
     * Checks is specificed parameters is valid day in month/year.
     * 
     * @param {Number} year The year value.
     * @param {Number} month The month value.
     * @param {Number} day The day value.
     */
    static isValidDayInMonth(year, month, day) {
        let ret = true;
        let maxDay = DateTime.daysInMonth(year, month);
        if (day <= 0 || day > maxDay) ret = false;
        return ret;
    }
    /**
     * Gets number of days in specificed year/month.
     */
    static daysInMonth(year, month) {
        let leap = DateTime.isLeapYear(year);
        let ret = DateTime.monthDays[month - 1];
        if (month === 2 && leap) ret = 29; // leap year Feb has 29 days.
        return ret;
    }
    /**
     * Gets class version.
     */
    static get version() { return "2.0.0"; }

    //#endregion
}

//#region DateTime Internal consts and methods

/** This constant array is for internal used. @ignore */
DateTime.constructors = [
    {
        length: 0,
        init: (dt) => { 
            dt.span = new TimeSpan(Date.now());
        }
    },
    {
        length: 1,
        init: (dt, millisecond) => { dt.span = new TimeSpan(millisecond); }
    },
    {
        length: 3,
        init: (dt, year, month, day) => {
            if (!DateTime.isValidMonth(month) ||
                !DateTime.isValidDayInMonth(year, month, day)) {
                throw (`Invalid Date in ctor(3): (year: ${year}, month: ${month}, day: ${day})`);
            }
            let d = new Date(year, month - 1, day);
            dt.span = new TimeSpan(d.getTime());
        }
    },
    {
        length: 6,
        init: (dt, year, month, day, hour, minute, second) => {
            if (!DateTime.isValidMonth(month) ||
                !DateTime.isValidDayInMonth(year, month, day)) {
                throw (`Invalid Date in ctor(6): (year: ${year}, month: ${month}, day: ${day})`);
            }
            let d = new Date(year, month - 1, day, hour, minute, second);
            dt.span = new TimeSpan(d.getTime());
        }
    },
    {
        length: 7,
        init: (dt, year, month, day, hour, minute, second, millisecond) => {
            if (!DateTime.isValidMonth(month) ||
                !DateTime.isValidDayInMonth(year, month, day)) {
                throw (`Invalid Date in ctor(7): (year: ${year}, month: ${month}, day: ${day})`);
            }
            let d = new Date(year, month - 1, day, hour, minute, second, millisecond);
            dt.span = new TimeSpan(d.getTime());
        }
    }
]

/** This constant array is for internal used. @ignore */
DateTime.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** This function is for internal used. @ignore */
DateTime.getAddedDays = (currYear, currMonth, addMonths) => {
    let yr = currYear;
    let mn = currMonth;
    let months = addMonths;
    let days = 0;
    for (let i = 0; i < months; i++) {
        if (mn + 1 > 12) {
            mn = 1;
            yr++;
        }
        days += DateTime.daysInMonth(yr, mn);
        mn++;
    }
    let r = { year: yr, month: mn, days: days };
    return r;
}
/** This function is for internal used. @ignore */
DateTime.getRemovedDays = (currYear, currMonth, removeMonths) => {
    let yr = currYear;
    let mn = currMonth;
    let months = -1 * removeMonths;
    let days = 0;
    for (let i = 0; i < months; i++) {
        if (mn - 1 <= 0) {
            mn = 12;
            yr--;
        }
        days += DateTime.daysInMonth(yr, mn);
        mn--;
    }
    let r = { year: yr, month: mn, days: -1 * days };
    return r;
}
/** This function is for internal used. @ignore */
DateTime.calcAddMonthDays = (currYear, currMonth, months) => {
    let add = DateTime.getAddedDays;
    let rem = DateTime.getRemovedDays;
    let y = currYear;
    let m = currMonth;
    let r = (months >= 0) ? add(y, m, months) : rem(y, m, months);
    return r;
}
/** This function is for internal used. @ignore */
DateTime.pad = (number, len = 2) => String(number).padStart(len, "0")

//#endregion

//#region DateTime.LocaleSettings

/**
 * The default Locale Setting (EN).
 */
DateTime.LocaleSettings = {
    dateCompsOrder: "mdy",
    minSupportedDate: "0000-01-01T00:00:00.000Z",
    maxSupportedDate: "9999-12-31T23:59:59.999Z",
    abbreviatedDayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    ],
    monthNames: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ],
    abbreviatedMonthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    dayNames: [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ],
    shortDateTimePattern: "M/d/yyyy h:mm tt",
    abbreviatedDatePattern: "d MMM yyyy",
    abbreviatedShortDatePattern: "d MMM yyyy",
    shortDatePattern: "M/d/yyyy",
    shortestDatePattern: "M/d/yy",
    abbreviatedMonthDayPattern: "d MMM",
    shortMonthDayPattern: "M/d",
    shortTimePattern: "h:mm tt",
    twoDigitYearMax: 2029,

    humanizeFormats: {
        full: {
            dateDaysAgo: "{0} days|ago",
            dateInDays: "in {0}|days",
            dateInWeek: "in a|week",
            dateTimeAndZone: "{0} ({1})",
            dateTimeCombined: "{0}, {1}",
            dateToday: "today",
            dateTomorrow: "tomorrow",
            dateWeekAgo: "a week|ago",
            dateYesterday: "yesterday",
            dimeInSeconds: "in {0}|seconds",
            timeHourAgo: "an hour|ago",
            timeHoursAgo: "{0} hours|ago",
            timeInHour: "in an|hour",
            timeInHours: "in {0}|hours",
            timeInMinute: "in a|minute",
            timeInMinutes: "in {0}|minutes",
            timeInSecond: "in a|second",
            timeInSeconds: "in {0}|seconds",
            timeMinuteAgo: "a minute|ago",
            timeMinutesAgo: "{0} minutes|ago",
            timeSecondAgo: "a second|ago",
            timeSecondsAgo: "{0} seconds|ago",
        },

        short: {
            dateDaysAgo: "{0}d|ago",
            dateInDays: "in|{0}d",
            dateInWeek: "in a|week",
            dateTimeAndZone: "{0} ({1})",
            dateTimeCombined: "{0}, {1}",
            dateToday: "today",
            dateTomorrow: "tomorrow",
            dateWeekAgo: "a week|ago",
            dateYesterday: "yesterday",
            timeHourAgo: "1h|ago",
            timeHoursAgo: "{0}h|ago",
            timeInHour: "in|1h",
            timeInHours: "in|{0}h",
            timeInMinute: "in|1m",
            timeInMinutes: "in|{0}m",
            timeInSecond: "in|1s",
            timeInSeconds: "in|{0}s",
            timeMinuteAgo: "1m|ago",
            timeMinutesAgo: "{0}m|ago",
            timeSecondAgo: "1s|ago",
            timeSecondsAgo: "{0}s|ago",
        },
    },

    rangeFormats: {
        dateTimeFromFormat: "from {0} {1}",
        dateTimeToFormat: "to {0} {1}",
        dateTimeRangeFormat: "from {0} to {1} {2}",
        timeFromFormat: "from {0} {1}",
        timeToFormat: "to {0} {1}",
        timeRangeFormat: "from {0} to {1} {2}",
    },
}

//#endregion

//#endregion

//#region int (random)

let int = (max, min, include) => {
    let imax = max || 0
    let imin = min || 0;
    let ret;
    //return 
    if (include) {
        if (include.min && include.max) {
            // [min, max] - OK.
            ret = imin + Math.floor(Math.random() * (imax - imin + 1));
        }
        else if (!include.min && include.max) {
            // (min, max] - OK.
            ret = imin + Math.ceil(Math.random() * (imax - imin));
        }
        else if (include.min && !include.max) {
            // [min, max) - OK.
            ret = imin + Math.floor(Math.random() * (imax - imin));
        }
        else {
            // (min, max) - OK.
            ret = imin + Math.ceil(Math.random() * (imax - imin - 1));
        }
    }
    else {
        // default [min, max]
        ret = imin + Math.floor(Math.random() * (imax - imin + 1));
    }
    return ret
}

//#endregion

let getDateArray = (beginDate, endDate, maxLoop) => {
    let ret = [];
    let imax = (maxLoop) ? maxLoop : 1;
    //let dt1 = new DateTime(beginDate)
    //let dt2 = new DateTime(endDate)
    let dt1 = new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate())
    let dt2 = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999)
    let v1 = dt1.getTime() - (dt1.getTimezoneOffset() * 60 * 1000)
    let v2 = dt2.getTime() - (dt2.getTimezoneOffset() * 60 * 1000)
    //console.log(v1, v2)
    let v3;
    let yr, mt, dayInMonth, dy, hr, mn, sc, ms;
    let dt;
    for (let i = 0; i < imax; i++) {
        /*
        // get random year
        yr = int(dt2.year, dt1.year, { min: true, max: true })
        // get random month
        mt = int(12, 1, { min: true, max: true })
        // get random day (in year-month)
        dayInMonth = DateTime.daysInMonth(yr, mt)
        dy = int(dayInMonth, 1, { min: true, max: true })
        // get random time.
        hr = int(23, 0, { min: true, max: true })
        mn = int(59, 0, { min: true, max: true })
        sc = int(59, 0, { min: true, max: true })
        ms = int(999, 0, { min: true, max: true })
        dt = new Date(yr, mt - 1, dy, hr, mn, sc, ms)
        */
        v3 = int(v2, v1, { min: true, max: true })
        //console.log(v3)
        dt = new Date(v3)
        //console.log('random year:', yr)
        //console.log('random month:', mt)
        //console.log('random day:', dy)
        //console.log('random hour:', hr)
        //console.log('random minute:', mn)
        //console.log('random second:', sc)
        //console.log('random milisecond:', ms)
        //console.log('Generate date:', dt.toJSON())
        ret.push(dt)
    }
    // sort array
    ret.sort((a, b) => a - b)
    //console.log(ret)
    return ret;
}

let beginDate = new Date('2020-01-01')
//console.log(beginDate)
let endDate = new Date('2020-01-01')
//console.log(endDate)
let ret = getDateArray(beginDate, endDate, 3)
console.log(JSON.stringify(ret))
