window.global_chFunctionsHelp = {
    "functions": {
        "corr": {
            "bracket": "(x, y)",
            "desc": {
                "en": "Calculates the Pearson correlation coefficient: <span class=\"inline-example\">Σ((x - x̅)(y - y̅)) \/ sqrt(Σ((x - x̅)<sup>2<\/sup>) * Σ((y - y̅)<sup>2<\/sup>))<\/span>."
            }
        },
        "stddevPop": {
            "bracket": "(x)",
            "desc": {
                "en": "The result is equal to the square root of &#39;varPop(x)&#39;."
            }
        },
        "varPop": {
            "bracket": "(x, y)",
            "desc": {
                "en": "Calculates the value of %%Σ((x - x̅)(y - y̅)) \/ n%%."
            }
        },
        "argMin": {
            "bracket": "(arg, val)",
            "desc": {
                "en": "Calculates the &#39;arg&#39; value for a minimal &#39;val&#39; value. If there are several different values of &#39;arg&#39; for minimal values of &#39;val&#39;, the first of these values encountered is output."
            }
        },
        "quantileExactWeighted": {
            "bracket": "(level)(x, weight)",
            "desc": {
                "en": "Вычисляет квантиль уровня level точно."
            }
        },
        "min": {
            "bracket": "(v)",
            "desc": {
                "en": "Minimal execution speed in rows per second. Checked on every data block when &#39;timeout_before_checking_execution_speed&#39; expires. If the execution speed is lower, an exception is thrown."
            }
        },
        "varSamp": {
            "bracket": "(x, y)",
            "desc": {
                "en": "Calculates the value of %%Σ((x - x̅)(y - y̅)) \/ (n - 1)%%. <br>  <br> Returns Float64. If n &lt;= 1, it returns +∞."
            }
        },
        "anyLast": {
            "bracket": "(x)",
            "desc": {
                "en": "Selects the last value encountered. <br> The result is just as indeterminate as for the &#39;any&#39; function."
            }
        },
        "argMax": {
            "bracket": "(arg, val)",
            "desc": {
                "en": "Calculates the &#39;arg&#39; value for a maximum &#39;val&#39; value. If there are several different values of &#39;arg&#39; for maximum values of &#39;val&#39;, the first of these values encountered is output."
            }
        },
        "count": {
            "bracket": "()",
            "desc": {
                "en": "Counts the number of rows. "
            }
        },
        "any": {
            "bracket": "(x)",
            "desc": {
                "en": "Selects the last value encountered. <br> The result is just as indeterminate as for the &#39;any&#39; function."
            }
        },
        "avg": {
            "bracket": "(x)",
            "desc": {
                "en": "Calculates the average. <br> Only works for numbers. <br> The result is always Float64."
            }
        },
        "sequenceMatch": {
            "bracket": "(pattern)(time, cond1, cond2, ...)",
            "desc": {
                "en": "Pattern matching for event chains. <br>  <br> &#39;pattern&#39; is a string containing a pattern to match."
            }
        },
        "stddevSamp": {
            "bracket": "(x)",
            "desc": {
                "en": "The result is equal to the square root of &#39;varSamp(x)&#39;."
            }
        },
        "medianDeterministic": {
            "bracket": "(x, determinator)",
            "desc": {
                "en": "This function works similarly to the &#39;median&#39; function - it approximates the median."
            }
        },
        "quantilesTimingWeighted": {
            "bracket": "(level1, level2, ...)(x, weight)",
            "desc": {
                "en": "Calculates the quantiles of all specified levels using the same algorithm as the &#39;medianTimingWeighted&#39; function."
            }
        },
        "uniq": {
            "bracket": "(N)(x)",
            "desc": {
                "en": "Calculates the number of different argument values, if it is less than or equal to N. <br> If the number of different argument values is greater than N, it returns N + 1."
            }
        },
        "covarSamp": {
            "bracket": "(x, y)",
            "desc": {
                "en": "Calculates the value of %%Σ((x - x̅)(y - y̅)) \/ (n - 1)%%. <br>  <br> Returns Float64. If n &lt;= 1, it returns +∞."
            }
        },
        "max": {
            "bracket": "(v)",
            "desc": {
                "en": "Maximum number of bytes (uncompressed data) that can be passed to a remote server or saved in a temporary table when using GLOBAL IN."
            }
        },
        "quantileTDigest": {
            "bracket": "(level)(x)",
            "desc": {
                "en": "t-digest"
            }
        },
        "quantilesTiming": {
            "bracket": "(level1, level2, ...)(x, weight)",
            "desc": {
                "en": "Calculates the quantiles of all specified levels using the same algorithm as the &#39;medianTimingWeighted&#39; function."
            }
        },
        "quantiles": {
            "bracket": "(level1, level2, ...)(x, determinator)",
            "desc": {
                "en": "Calculates the quantiles of all specified levels using the same algorithm as the &#39;medianDeterministic&#39; function."
            }
        },
        "quantile": {
            "bracket": "(level1, level2, ...)(x, determinator)",
            "desc": {
                "en": "Calculates the quantiles of all specified levels using the same algorithm as the &#39;medianDeterministic&#39; function."
            }
        },
        "groupArray": {
            "bracket": "(x)",
            "desc": {
                "en": "Creates an array of argument values. <br> Values can be added to the array in any (indeterminate) order. <br>  <br> In some cases, you can rely on the order of execution. This applies to cases when SELECT comes from a subquery that uses ORDER BY."
            }
        },
        "sum": {
            "bracket": "(x)",
            "desc": {
                "en": "Calculates the sum. <br> Only works for numbers."
            }
        },
        "median": {
            "bracket": "(x, weight)",
            "desc": {
                "en": "Differs from the &#39;medianTiming&#39; function in that it has a second argument - &quot;weights&quot;. Weight is a non-negative integer. <br> The result is calculated as if the &#39;x&#39; value were passed &#39;weight&#39; number of times to the &#39;medianTiming&#39; function."
            }
        },
        "quantileTiming": {
            "bracket": "(level)(x, weight)",
            "desc": {
                "en": "Calculates the quantile of &#39;level&#39; using the same algorithm as the &#39;medianTimingWeighted&#39; function."
            }
        },
        "quantileTimingWeighted": {
            "bracket": "(level)(x, weight)",
            "desc": {
                "en": "Calculates the quantile of &#39;level&#39; using the same algorithm as the &#39;medianTimingWeighted&#39; function."
            }
        },
        "groupUniqArray": {
            "bracket": "(x)",
            "desc": {
                "en": "Creates an array from different argument values. Memory consumption is the same as for the &#39;uniqExact&#39; function."
            }
        },
        "uniqHLL12": {
            "bracket": "(x)",
            "desc": {
                "en": "Uses the HyperLogLog algorithm to approximate the number of different values of the argument. "
            }
        },
        "covarPop": {
            "bracket": "(x, y)",
            "desc": {
                "en": "Calculates the value of %%Σ((x - x̅)(y - y̅)) \/ n%%."
            }
        },
        "sequenceCount": {
            "bracket": "(pattern)(time, cond1, cond2, ...)",
            "desc": {
                "en": "sequenceMatch"
            }
        },
        "quantileDeterministic": {
            "bracket": "(level)(x, determinator)",
            "desc": {
                "en": "Calculates the quantile of &#39;level&#39; using the same algorithm as the &#39;medianDeterministic&#39; function."
            }
        },
        "quantileExact": {
            "bracket": "(level)(x, weight)",
            "desc": {
                "en": ""
            }
        },
        "quantilesDeterministic": {
            "bracket": "(level1, level2, ...)(x, determinator)",
            "desc": {
                "en": "Calculates the quantiles of all specified levels using the same algorithm as the &#39;medianDeterministic&#39; function."
            }
        },
        "medianTiming": {
            "bracket": "(x, weight)",
            "desc": {
                "en": "Differs from the &#39;medianTiming&#39; function in that it has a second argument - &quot;weights&quot;."
            }
        },
        "medianTimingWeighted": {
            "bracket": "(x, weight)",
            "desc": {
                "ru": "",
                "en": "Differs from the &#39;medianTiming&#39; function in that it has a second argument - &quot;weights&quot;."
            }
        },
        "uniqExact": {
            "bracket": "(x)",
            "desc": {
                "en": "Calculates the number of different values of the argument, exactly. <br> There is no reason to fear approximations, so it&#39;s better to use the &#39;uniq&#39; function. <br> You should use the &#39;uniqExact&#39; function if you definitely need an exact result. "
            }
        },
        "uniqCombined": {
            "bracket": "(x)",
            "desc": {
                "en": ""
            }
        },
        "uniqUpTo": {
            "bracket": "(N)(x)",
            "desc": {
                "en": "Calculates the number of different argument values, if it is less than or equal to N. <br> If the number of different argument values is greater than N, it returns N + 1."
            }
        },
        "substring": {
            "bracket": "(s, offset, length)",
            "desc": {
                "en": "The same as &#39;substring&#39;, but for Unicode code points. Works under the assumption that the string contains a set of bytes representing a UTF-8 encoded text. If this assumption is not met, it returns some result (it doesn&#39;t throw an exception)."
            }
        },
        "notLike": {
            "bracket": "(haystack, pattern), haystack NOT LIKE pattern operator",
            "desc": {
                "en": "The same thing as &#39;like&#39;, but negative."
            }
        },
        "hostName": {
            "bracket": "()",
            "desc": {
                "en": "Returns a string with the name of the host that this function was performed on. For distributed processing, this is the name of the remote server host, if the function is performed on a remote server."
            }
        },
        "globalNotIn": {
            "bracket": "(v)",
            "desc": {
                "en": "See the section &quot;IN operators&quot;."
            }
        },
        "or": {
            "bracket": "(v)",
            "desc": {
                "en": "The same thing as &#39;max_temporary_columns&#39;, but without counting constant columns. <br> Note that constant columns are formed fairly often when running a query, but they require approximately zero computing resources."
            }
        },
        "extractAll": {
            "bracket": "(haystack, pattern)",
            "desc": {
                "en": "Extracts all the fragments of a string using a regular expression. If &#39;haystack&#39; doesn&#39;t match the &#39;pattern&#39; regex, an empty string is returned. Returns an array of strings consisting of all matches to the regex."
            }
        },
        "arrayFirst": {
            "bracket": "(func, arr1, ...)",
            "desc": {
                "en": "Returns the index of the first element in the &#39;arr1&#39; array for which &#39;func&#39; returns something other than 0."
            }
        },
        "notEquals": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "arrayExists": {
            "bracket": "([func,] arr1, ...)",
            "desc": {
                "en": "Returns 1 if there is at least one element in &#39;arr&#39; for which &#39;func&#39; returns something other than 0. Otherwise, it returns 0."
            }
        },
        "arrayCount": {
            "bracket": "([func,] arr1, ...)",
            "desc": {
                "en": "Returns the number of elements in &#39;arr&#39; for which &#39;func&#39; returns something other than 0. If &#39;func&#39; is not specified, it returns the number of non-zero items in the array."
            }
        },
        "arrayMap": {
            "bracket": "(func, arr1, ...)",
            "desc": {
                "en": "Returns an array obtained from the original application of the &#39;func&#39; function to each element in the &#39;arr&#39; array."
            }
        },
        "now": {
            "bracket": "(v)",
            "desc": {
                "en": "If the parameter is true, INSERT operation will skip columns with unknown names from input. <br> Otherwise, an exception will be generated, it is default behavior. <br> The parameter works only for JSONEachRow and TSKV input formats."
            }
        },
        "intDiv": {
            "bracket": "(a, b)",
            "desc": {
                "en": "Differs from &#39;intDiv&#39; in that it returns zero when dividing by zero or when dividing a minimal negative number by minus one."
            }
        },
        "topLevelDomain": {
            "bracket": "(v)",
            "desc": {
                "en": "- Selects the top-level domain. Example: .ru."
            }
        },
        "intHash32": {
            "bracket": "(v)",
            "desc": {
                "en": "Calculates a 32-bit hash code from any type of integer. <br> This is a relatively fast non-cryptographic hash function of average quality for numbers."
            }
        },
        "replaceOne": {
            "bracket": "(haystack, pattern, replacement)",
            "desc": {
                "en": "Replaces the first occurrence, if it exists, of the &#39;pattern&#39; substring in &#39;haystack&#39; with the &#39;replacement&#39; substring. <br> Hereafter, &#39;pattern&#39; and &#39;replacement&#39; must be constants."
            }
        },
        "cityHash64": {
            "bracket": "(v)",
            "desc": {
                "en": "Calculates CityHash64 from a string or a similar hash function for any number of any type of arguments. <br> For String-type arguments, CityHash is used. This is a fast non-cryptographic hash function for strings with decent quality"
            }
        },
        "OSToRoot": {
            "bracket": "(v)",
            "desc": {
                "en": "Accepts a UInt8 number - the ID of the operating system from the Yandex.Metrica dictionary. If any OS matches the passed number, it returns a UInt8 number - the ID of the corresponding root OS (for example, it converts Windows Vista to Windows). Otherwise, returns 0."
            }
        },
        "sipHash128": {
            "bracket": "(v)",
            "desc": {
                "en": "Calculates SipHash from a string. <br> Accepts a String-type argument. Returns FixedString(16). <br> Differs from sipHash64 in that the final xor-folding state is only done up to 128 bits."
            }
        },
        "SHA1": {
            "bracket": "(v)",
            "desc": {
                "en": "Calculates SHA-1, SHA-224, or SHA-256 from a string and returns the resulting set of bytes as FixedString(20), FixedString(28), or FixedString(32)."
            }
        },
        "asin": {
            "bracket": "(x)",
            "desc": {
                "en": "The arc sine."
            }
        },
        "SHA256": {
            "bracket": "(v)",
            "desc": {
                "en": "Calculates SHA-1, SHA-224, or SHA-256 from a string and returns the resulting set of bytes as FixedString(20), FixedString(28), or FixedString(32)."
            }
        },
        "MD5": {
            "bracket": "(v)",
            "desc": {
                "en": "Calculates the MD5 from a string and returns the resulting set of bytes as FixedString(16)."
            }
        },
        "bitmaskToList": {
            "bracket": "(num)",
            "desc": {
                "en": "Accepts an integer. Returns a string containing the list of powers of two that total the source number when summed. They are comma-separated without spaces in text format, in ascending order."
            }
        },
        "array": {
            "bracket": "(v)",
            "desc": {
                "en": "The -%%Array%% suffix can be appended to any aggregate function. In this case, the aggregate function takes arguments of the &#39;Array(T)&#39; type (arrays) instead of &#39;T&#39; type arguments. If the aggregate function accepts multiple arguments, this must be arrays of equal lengths. "
            }
        },
        "dictGetStringOrDefault": {
            "bracket": "(v)",
            "desc": {
                "ru": "%%dictGet<i>T<\/i>('dict_name', 'attr_name', id, default)%% <br> Аналогично функциям dictGet<i>T<\/i>, но значение по умолчанию берётся из последнего аргумента функции.",
                "en": ""
            }
        },
        "greaterOrEquals": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "e": {
            "bracket": "(v)",
            "desc": {
                "en": "What to do when the amount of data exceeds one of the limits: &#39;throw&#39; or &#39;break&#39;. By default, throw."
            }
        },
        "runningDifference": {
            "bracket": "(x)",
            "desc": {
                "en": "Calculates the difference between consecutive values in the data block. <br> Result of the function depends on the order of the data in the blocks. <br>  <br> It works only inside of the each processed block of data. Data splitting in the blocks is not explicitly controlled by the user. "
            }
        },
        "not": {
            "bracket": "(v)",
            "desc": {
                "ru": "Смотрите раздел \"Операторы IN\".",
                "en": "See the section &quot;IN operators&quot;."
            }
        },
        "intHash64": {
            "bracket": "(v)",
            "desc": {
                "en": "Calculates a 64-bit hash code from any type of integer. <br> It works faster than intHash32. Average quality."
            }
        },
        "acos": {
            "bracket": "(x)",
            "desc": {
                "ru": "Арккосинус.",
                "en": "The arc cosine."
            }
        },
        "dictGetString": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "and": {
            "bracket": "(x, determinator)",
            "desc": {
                "en": "This function works similarly to the &#39;median&#39; function - it approximates the median. However, in contrast to &#39;median&#39;, the result is deterministic and does not depend on the order of query execution. <br>  <br> To achieve this, the function takes a second argument - the &quot;determinator&quot;. "
            }
        },
        "dictGetDate": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "dictGetFloat32": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "dictGetInt8": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "dictGetUInt32": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "OSIn": {
            "bracket": "(lhs, rhs)",
            "desc": {
                "en": "Checks whether the &#39;lhs&#39; operating system belongs to the &#39;rhs&#39; operating system."
            }
        },
        "arrayFirstIndex": {
            "bracket": "(func, arr1, ...)",
            "desc": {
                "en": "Returns the index of the first element in the &#39;arr1&#39; array for which &#39;func&#39; returns something other than 0."
            }
        },
        "ceil": {
            "bracket": "(x[, N])",
            "desc": {
                "en": "Returns the smallest round number that is greater than or equal to &#39;x&#39;. In every other way, it is the same as the &#39;floor&#39; function (see above)."
            }
        },
        "fragment": {
            "bracket": "(v)",
            "desc": {
                "en": "Removes the query-string and fragment identifier. The question mark and number sign are also removed."
            }
        },
        "dictGetUInt8": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "dictHas": {
            "bracket": "(v)",
            "desc": {
                "ru": "%%dictHas('dict_name', id)%% <br> - проверить наличие ключа в словаре. Возвращает значение типа UInt8, равное 0, если ключа нет и 1, если ключ есть.",
                "en": ""
            }
        },
        "arraySum": {
            "bracket": "([func,] arr1, ...)",
            "desc": {
                "en": "Returns the sum of the &#39;func&#39; values. If the function is omitted, it just returns the sum of the array elements."
            }
        },
        "emptyArrayDateTime": {
            "bracket": "(v)",
            "desc": {
                "en": "Accepts zero arguments and returns an empty array of the appropriate type."
            }
        },
        "intDivOrZero": {
            "bracket": "(a, b)",
            "desc": {
                "en": "Differs from &#39;intDiv&#39; in that it returns zero when dividing by zero or when dividing a minimal negative number by minus one."
            }
        },
        "SEHierarchy": {
            "bracket": "(v)",
            "desc": {
                "en": "Accepts a UInt8 number - the ID of the search engine from the Yandex.Metrica dictionary. Returns an array with a hierarchy of search engines. Similar to the &#39;regionHierarchy&#39; function."
            }
        },
        "regionToContinent": {
            "bracket": "(id[, geobase])",
            "desc": {
                "en": "Converts a region to a continent. In every other way, this function is the same as &#39;regionToCity&#39;. <br> Example: %%regionToContinent(toUInt32(213)) = 10001%% converts Moscow (213) to Eurasia (10001)."
            }
        },
        "dictGetInt32": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "toInt8": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "materialize": {
            "bracket": "(x)",
            "desc": {
                "en": "Turns a constant into a full column containing just one value. <br> In ClickHouse, full columns and constants are represented differently in memory. Functions work differently for constant arguments and normal arguments (different code is executed), although the result is almost always the same. This function is for debugging this behavior."
            }
        },
        "regionToCountry": {
            "bracket": "(id[, geobase])",
            "desc": {
                "en": "Converts a region to a country. In every other way, this function is the same as &#39;regionToCity&#39;. <br> Example: %%regionToCountry(toUInt32(213)) = 225%% converts Moscow (213) to Russia (225)."
            }
        },
        "dictGetDateTime": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "xor": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "regionToCity": {
            "bracket": "(id[, geobase])",
            "desc": {
                "en": "Accepts a UInt32 number - the region ID from the Yandex geobase. If this region is a city or part of a city, it returns the region ID for the appropriate city. Otherwise, returns 0."
            }
        },
        "dictGetFloat64": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "timeSlot": {
            "bracket": "(StartTime, Duration)",
            "desc": {
                "en": "For a time interval starting at &#39;StartTime&#39; and continuing for &#39;Duration&#39; seconds, it returns an array of moments in time, consisting of points from this interval rounded down to the half hour."
            }
        },
        "toTime": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a date with time to the date of the start of the Unix Epoch, while preserving the time."
            }
        },
        "log2": {
            "bracket": "(x)",
            "desc": {
                "en": "Accepts a numeric argument and returns a Float64 number close to the binary logarithm of the argument."
            }
        },
        "toRelativeHourNum": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a date with time or date to the number of the hour, starting from a certain fixed point in the past."
            }
        },
        "toRelativeDayNum": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a date with time or date to the number of the day, starting from a certain fixed point in the past."
            }
        },
        "toRelativeWeekNum": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a date with time or date to the number of the week, starting from a certain fixed point in the past."
            }
        },
        "splitByString": {
            "bracket": "(separator, s)",
            "desc": {
                "en": "The same as above, but it uses a string of multiple characters as the separator. The string must be non-empty."
            }
        },
        "currentDatabase": {
            "bracket": "()",
            "desc": {
                "en": "Returns the name of the current database. <br> You can use this function in table engine parameters in a CREATE TABLE query where you need to specify the database."
            }
        },
        "toRelativeMonthNum": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a date with time or date to the number of the month, starting from a certain fixed point in the past."
            }
        },
        "visibleWidth": {
            "bracket": "(x)",
            "desc": {
                "en": "Calculates the approximate width when outputting values to the console in text format (tab-separated). This function is used by the system for implementing Pretty formats."
            }
        },
        "bitShiftRight": {
            "bracket": "(a, b)",
            "desc": {
                "en": ""
            }
        },
        "toRelativeYearNum": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a date with time or date to the number of the year, starting from a certain fixed point in the past."
            }
        },
        "toStartOfHour": {
            "bracket": "(v)",
            "desc": {
                "en": "Rounds down a date with time to the start of the hour."
            }
        },
        "halfMD5": {
            "bracket": "(v)",
            "desc": {
                "en": "Calculates the MD5 from a string. Then it takes the first 8 bytes of the hash and interprets them as UInt64 in big endian."
            }
        },
        "toStartOfFiveMinute": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "toUInt16OrZero": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument."
            }
        },
        "toMonday": {
            "bracket": "(v)",
            "desc": {
                "en": "Rounds down a date or date with time to the nearest Monday. <br> Returns the date."
            }
        },
        "IPv6NumToString": {
            "bracket": "(x)",
            "desc": {
                "en": "Accepts a FixedString(16) value containing the IPv6 address in binary format. Returns a string containing this address in text format. "
            }
        },
        "indexOf": {
            "bracket": "(arr, x)",
            "desc": {
                "ru": "Возвращает индекс элемента x (начиная с 1), если он есть в массиве, или 0, если его нет.",
                "en": "Returns the index of the &#39;x&#39; element (starting from 1) if it is in the array, or 0 if it is not."
            }
        },
        "today": {
            "bracket": "(v)",
            "desc": {
                "ru": "Принимает ноль аргументов и возвращает текущую дату на один из моментов выполнения запроса. <br> То же самое, что toDate(now())",
                "en": "Accepts zero arguments and returns the current date at one of the moments of request execution. <br> The same as &#39;toDate(now())&#39;."
            }
        },
        "emptyArrayToSingle": {
            "bracket": "(v)",
            "desc": {
                "ru": "Принимает пустой массив и возвращает массив из одного элемента, равного значению по умолчанию.",
                "en": "Accepts an empty array as argument and returns an array of one element equal to the default value."
            }
        },
        "sleep": {
            "bracket": "(seconds)",
            "desc": {
                "ru": "Спит seconds секунд на каждый блок данных. Можно указать как целое число, так и число с плавающей запятой.",
                "en": "Sleeps &#39;seconds&#39; seconds on each data block. You can specify an integer or a floating-point number."
            }
        },
        "extract": {
            "bracket": "(params, name)",
            "desc": {
                "en": "Parses the string in double quotes. The value is unescaped. If unescaping failed, it returns an empty string. Examples: "
            }
        },
        "emptyArrayInt8": {
            "bracket": "(v)",
            "desc": {
                "ru": "Принимает ноль аргументов и возвращает пустой массив соответствующего типа.",
                "en": "Accepts zero arguments and returns an empty array of the appropriate type."
            }
        },
        "regionToName": {
            "bracket": "(id[, lang])",
            "desc": {
                "en": "Accepts a UInt32 number - the region ID from the Yandex geobase. A string with the name of the language can be passed as a second argument. Supported languages are: ru, en, ua, uk, by, kz, tr. If the second argument is omitted, the language &#39;ru&#39; is used. "
            }
        },
        "concat": {
            "bracket": "(arr[, separator])",
            "desc": {
                "ru": "Склеивает строки, перечисленные в массиве, с разделителем separator. <br> separator - необязательный параметр, константная строка, по умолчанию равен пустой строке. <br> Возвращается строка.",
                "en": "Concatenates strings from the array elements, using &#39;separator&#39; as the separator. <br> &#39;separator&#39; is a string constant, an optional parameter. By default it is an empty string. <br> Returns a string."
            }
        },
        "convertCharset": {
            "bracket": "(s, from, to)",
            "desc": {
                "ru": "Возвращает сконвертированную из кодировки from в кодировку to строку s.",
                "en": "Returns a string with the data %%s%% (encoded as %%from%% charset) that was converted to the %%to%% charset."
            }
        },
        "toMonth": {
            "bracket": "(v)",
            "desc": {
                "ru": "Переводит дату или дату-с-временем в число типа UInt8, содержащее номер месяца (1-12).",
                "en": "Converts a date or date with time to a UInt8 number containing the month number (1-12)."
            }
        },
        "IPv6StringToNum": {
            "bracket": "(s)",
            "desc": {
                "ru": "Функция, обратная к IPv6NumToString. Если IPv6 адрес в неправильном формате, то возвращает строку из нулевых байт. <br> HEX может быть в любом регистре.",
                "en": "The reverse function of IPv6NumToString. If the IPv6 address has an invalid format, it returns a string of null bytes. <br> HEX can be uppercase or lowercase."
            }
        },
        "emptyArrayString": {
            "bracket": "(v)",
            "desc": {
                "ru": "Принимает ноль аргументов и возвращает пустой массив соответствующего типа.",
                "en": "Accepts zero arguments and returns an empty array of the appropriate type."
            }
        },
        "uptime": {
            "bracket": "()",
            "desc": {
                "ru": "Возвращает аптайм сервера в секундах.",
                "en": "Returns server's uptime in seconds."
            }
        },
        "blockSize": {
            "bracket": "()",
            "desc": {
                "en": "Gets the size of the block. <br> In ClickHouse, queries are always run on blocks (sets of column parts). This function allows getting the size of the block that you called it for."
            }
        },
        "toInt64OrZero": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "pathFull": {
            "bracket": "(v)",
            "desc": {
                "ru": "То же самое, но включая query string и fragment. Пример: \/top\/news.html?page=2#comments",
                "en": "- The same as above, but including query-string and fragment. Example: \/top\/news.html?page=2#comments"
            }
        },
        "emptyArrayDate": {
            "bracket": "(v)",
            "desc": {
                "ru": "Принимает ноль аргументов и возвращает пустой массив соответствующего типа.",
                "en": "Accepts zero arguments and returns an empty array of the appropriate type."
            }
        },
        "emptyArrayInt64": {
            "bracket": "(v)",
            "desc": {
                "ru": "Принимает ноль аргументов и возвращает пустой массив соответствующего типа.",
                "en": "Accepts zero arguments and returns an empty array of the appropriate type."
            }
        },
        "toInt32OrZero": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "greater": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "emptyArrayInt32": {
            "bracket": "(v)",
            "desc": {
                "ru": "Принимает ноль аргументов и возвращает пустой массив соответствующего типа.",
                "en": "Accepts zero arguments and returns an empty array of the appropriate type."
            }
        },
        "toString": {
            "bracket": "(str)",
            "desc": {
                "ru": "Принимает значение типа FixedString(16). Возвращает строку из 36 символов в текстовом виде.",
                "en": "Accepts a FixedString(16) value containing the UUID in the binary format. Returns a readable string containing the UUID in the text format."
            }
        },
        "greatest": {
            "bracket": "(a, b)",
            "desc": {
                "ru": "Возвращает наибольшее значение из a и b.",
                "en": "Returns the greatest element of a and b."
            }
        },
        "emptyArrayUInt64": {
            "bracket": "(v)",
            "desc": {
                "ru": "Принимает ноль аргументов и возвращает пустой массив соответствующего типа.",
                "en": "Accepts zero arguments and returns an empty array of the appropriate type."
            }
        },
        "emptyArrayUInt32": {
            "bracket": "(v)",
            "desc": {
                "ru": "Принимает ноль аргументов и возвращает пустой массив соответствующего типа.",
                "en": "Accepts zero arguments and returns an empty array of the appropriate type."
            }
        },
        "formatReadableSize": {
            "bracket": "(x)",
            "desc": {
                "en": "Gets a size (number of bytes). Returns a string that contains rounded size with the suffix (KiB, MiB etc.). <br>  <br> Example: <br>  <br> %% "
            }
        },
        "toInt16OrZero": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "emptyArrayUInt8": {
            "bracket": "(v)",
            "desc": {
                "ru": "Принимает ноль аргументов и возвращает пустой массив соответствующего типа.",
                "en": "Accepts zero arguments and returns an empty array of the appropriate type."
            }
        },
        "protocol": {
            "bracket": "(v)",
            "desc": {
                "ru": "Возвращает протокол. Примеры: http, ftp, mailto, magnet...",
                "en": "- Selects the protocol. Examples: http, ftp, mailto, magnet..."
            }
        },
        "regionToPopulation": {
            "bracket": "(id[, geobase])",
            "desc": {
                "en": "Gets the population for a region. <br> The population can be recorded in files with the geobase. See the section &quot;External dictionaries&quot;. <br> If the population is not recorded for the region, it returns 0. <br> In the Yandex geobase, the population might be recorded for child regions, but not for parent regions."
            }
        },
        "notIn": {
            "bracket": "(v)",
            "desc": {
                "ru": "Смотрите раздел \"Операторы IN\".",
                "en": "See the section &quot;IN operators&quot;."
            }
        },
        "position": {
            "bracket": "(haystack, needle)",
            "desc": {
                "en": "The same as &#39;position&#39;, but the position is returned in Unicode code points. Works under the assumption that the string contains a set of bytes representing a UTF-8 encoded text. If this assumption is not met, it returns some result (it doesn&#39;t throw an exception). <br> There's also positionCaseInsensitiveUTF8 function."
            }
        },
        "arrayElement": {
            "bracket": "(arr, n), arr[n] operator",
            "desc": {
                "en": "Get the element with the index &#39;n&#39; from the array &#39;arr&#39;. <br> &#39;n&#39; should be any integer type. <br> Indexes in an array begin from one. <br> Negative indexes are supported - in this case, it selects the corresponding element numbered from the end. "
            }
        },
        "toStringCutToZero": {
            "bracket": "(s)",
            "desc": {
                "en": "Accepts a String or FixedString argument. Returns a String that is cut to a first null byte occurrence."
            }
        },
        "log": {
            "bracket": "(x)",
            "desc": {
                "ru": "Принимает числовой аргумент, возвращает число типа Float64, близкое к десятичному логарифму от аргумента.",
                "en": "Accepts a numeric argument and returns a Float64 number close to the decimal logarithm of the argument."
            }
        },
        "SEIn": {
            "bracket": "(lhs, rhs)",
            "desc": {
                "ru": "Проверяет принадлежность поисковой системы lhs поисковой системе rhs.",
                "en": "Checks whether the &#39;lhs&#39; search engine belongs to the &#39;rhs&#39; search engine."
            }
        },
        "replicate": {
            "bracket": "(v)",
            "desc": {
                "en": "Create a MergeTree table with a different name. Move all the data from the directory with the ReplicatedMergeTree table data to the new table&#39;s data directory."
            }
        },
        "sipHash64": {
            "bracket": "(v)",
            "desc": {
                "en": "Calculates SipHash from a string. <br> Accepts a String-type argument. Returns UInt64. <br> SipHash is a cryptographic hash function. It works at least three times faster than MD5. For more information, see <a href=\"https:\/\/131002.net\/siphash\/\">https:\/\/131002.net\/siphash\/<\/a>"
            }
        },
        "emptyArrayUInt16": {
            "bracket": "(v)",
            "desc": {
                "en": "Accepts zero arguments and returns an empty array of the appropriate type."
            }
        },
        "hex": {
            "bracket": "(str)",
            "desc": {
                "en": "Accepts a string containing any number of hexadecimal digits, and returns a string containing the corresponding bytes. Supports both uppercase and lowercase letters A-F. The number of hexadecimal digits doesn&#39;t have to be even."
            }
        },
        "regionToDistrict": {
            "bracket": "(id[, geobase])",
            "desc": {
                "en": "Converts a region to a federal district (type 4 in the geobase). In every other way, this function is the same as &#39;regionToCity&#39;. "
            }
        },
        "arrayFilter": {
            "bracket": "(func, arr1, ...)",
            "desc": {
                "en": "Returns an array containing only the elements in &#39;arr1&#39; for which &#39;func&#39; returns something other than 0. <br>  <br> Examples: <br>  <br> %% <br> SELECT arrayFilter(x -> x LIKE &#39;%World%&#39;, [&#39;Hello&#39;, &#39;abc World&#39;]) AS res "
            }
        },
        "toStartOfQuarter": {
            "bracket": "(v)",
            "desc": {
                "en": "Rounds down a date or date with time to the first day of the quarter. <br> The first day of the quarter is either 1 January, 1 April, 1 July, or 1 October. Returns the date."
            }
        },
        "divide": {
            "bracket": "(a, b), a \/ b operator",
            "desc": {
                "en": "Calculates the quotient of the numbers. The result type is always a floating-point type. <br> It is not integer division. For integer division, use the &#39;intDiv&#39; function. <br> When dividing by zero you get &#39;inf&#39;, &#39;-inf&#39;, or &#39;nan&#39;."
            }
        },
        "reverseUTF8": {
            "bracket": "(v)",
            "desc": {
                "en": "Reverses a sequence of Unicode code points, assuming that the string contains a set of bytes representing a UTF-8 text. Otherwise, it does something else (it doesn&#39;t throw an exception)."
            }
        },
        "toDate": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "emptyArrayFloat64": {
            "bracket": "(v)",
            "desc": {
                "en": "Accepts zero arguments and returns an empty array of the appropriate type."
            }
        },
        "abs": {
            "bracket": "(s, c)",
            "desc": {
                "en": "If the %%s%% string is non-empty and does not contain the %%c%% character at the end, it appends the %%c%% character to the end."
            }
        },
        "yesterday": {
            "bracket": "(v)",
            "desc": {
                "en": "Accepts zero arguments and returns yesterday&#39;s date at one of the moments of request execution. <br> The same as &#39;today() - 1&#39;."
            }
        },
        "toMinute": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a date with time to a UInt8 number containing the number of the minute of the hour (0-59)."
            }
        },
        "bitXor": {
            "bracket": "(a, b)",
            "desc": {
                "en": ""
            }
        },
        "minus": {
            "bracket": "(a, b), a - b operator",
            "desc": {
                "en": "Calculates the difference. The result is always signed. <br>  <br> You can also calculate whole numbers from a date or date with time. The idea is the same - see above for &#39;plus&#39;."
            }
        },
        "toDateTime": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "modulo": {
            "bracket": "(a, b), a % b operator",
            "desc": {
                "en": "Calculates the remainder after division. <br> If arguments are floating-point numbers, they are pre-converted to integers by dropping the decimal portion. The remainder is taken in the same sense as in C++. Truncated division is used for negative numbers. <br> An exception is thrown when dividing by zero or when dividing a minimal negative number by minus one."
            }
        },
        "bitmaskToArray": {
            "bracket": "(num)",
            "desc": {
                "en": "Accepts an integer. Returns an array of UInt64 numbers containing the list of powers of two that total the source number when summed. Numbers in the array are in ascending order."
            }
        },
        "negate": {
            "bracket": "(a), -a operator",
            "desc": {
                "en": "Calculates a number with the reverse sign. The result is always signed."
            }
        },
        "emptyArrayFloat32": {
            "bracket": "(v)",
            "desc": {
                "en": "Accepts zero arguments and returns an empty array of the appropriate type."
            }
        },
        "range": {
            "bracket": "(N)",
            "desc": {
                "en": "Returns an array of numbers from 0 to N-1. <br> Just in case, an exception is thrown if arrays with a total length of more than 100,000,000 elements are created in a data block."
            }
        },
        "arrayAll": {
            "bracket": "([func,] arr1, ...)",
            "desc": {
                "en": "Returns 1 if &#39;func&#39; returns something other than 0 for all the elements in &#39;arr&#39;. Otherwise, it returns 0."
            }
        },
        "toInt32": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "unhex": {
            "bracket": "(str)",
            "desc": {
                "en": "Accepts a string containing any number of hexadecimal digits, and returns a string containing the corresponding bytes. Supports both uppercase and lowercase letters A-F. The number of hexadecimal digits doesn&#39;t have to be even. If it is odd, the last digit is interpreted as the younger half of the 00-0F byte. If the argument string contains anything other than hexadecimal digits, some implementation-defined result is returned (an exception isn&#39;t thrown). <br> If you want to convert the result to a number, you can use the functions &#39;reverse&#39; and &#39;reinterpretAs<i>Type<\/i>&#39;."
            }
        },
        "toFloat64": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "bitAnd": {
            "bracket": "(a, b)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "toStartOfYear": {
            "bracket": "(v)",
            "desc": {
                "en": "Rounds down a date or date with time to the first day of the year. <br> Returns the date."
            }
        },
        "bitOr": {
            "bracket": "(a, b)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "SEToRoot": {
            "bracket": "(v)",
            "desc": {
                "en": "Accepts a UInt8 number - the ID of the search engine from the Yandex.Metrica dictionary. If any search engine matches the passed number, it returns a UInt8 number - the ID of the corresponding root search engine (for example, it converts Yandex.Images to Yandex). Otherwise, returns 0."
            }
        },
        "toRelativeMinuteNum": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a date with time or date to the number of the minute, starting from a certain fixed point in the past."
            }
        },
        "visitParamExtractInt": {
            "bracket": "(params, name)",
            "desc": {
                "ru": "Аналогично для Int64.",
                "en": "The same as for Int64."
            }
        },
        "emptyArrayInt16": {
            "bracket": "(v)",
            "desc": {
                "en": "Accepts zero arguments and returns an empty array of the appropriate type."
            }
        },
        "visitParamExtractString": {
            "bracket": "(params, name)",
            "desc": {
                "en": "Parses the string in double quotes. The value is unescaped. If unescaping failed, it returns an empty string. "
            }
        },
        "arrayEnumerateUniq": {
            "bracket": "(arr, ...)",
            "desc": {
                "en": "Returns an array the same size as the source array, indicating for each element what its position is among elements with the same value. "
            }
        },
        "visitParamExtractUInt": {
            "bracket": "(params, name)",
            "desc": {
                "en": "Parses UInt64 from the value of the field named &#39;name&#39;. If this is a string field, it tries to parse a number from the beginning of the string. If the field doesn&#39;t exist, or it exists but doesn&#39;t contain a number, it returns 0."
            }
        },
        "toTypeName": {
            "bracket": "(x)",
            "desc": {
                "en": "Gets the type name. Returns a string containing the type name of the passed argument."
            }
        },
        "empty": {
            "bracket": "(v)",
            "desc": {
                "en": "Accepts an empty array as argument and returns an array of one element equal to the default value."
            }
        },
        "multiply": {
            "bracket": "(a, b), a * b operator",
            "desc": {
                "en": "Calculates the product of the numbers."
            }
        },
        "has": {
            "bracket": "('database', 'table', 'column')",
            "desc": {
                "ru": "",
                "en": "Accepts constant String columns - database name, table name and column name. Returns constant UInt8 value, equal to 1 if column exists, <br> otherwise 0. <br> If table doesn't exist than exception is thrown. <br> For elements of nested data structure function checks existence of column. For nested data structure 0 is returned."
            }
        },
        "bitNot": {
            "bracket": "(a)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "lessOrEquals": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": "<h3>greaterOrEquals, >= operator<\/h3>"
            }
        },
        "reinterpretAsInt64": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "IPv4NumToString": {
            "bracket": "(num)",
            "desc": {
                "en": "Similar to IPv4NumToString, but using %%xxx%% instead of the last octet. "
            }
        },
        "bitShiftLeft": {
            "bracket": "(a, b)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "dictGetInt16": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "toUInt32OrZero": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "regionIn": {
            "bracket": "(lhs, rhs[, geobase])",
            "desc": {
                "en": "Checks whether a &#39;lhs&#39; region belongs to a &#39;rhs&#39; region. Returns a UInt8 number equal to 1 if it belongs, or 0 if it doesn&#39;t belong. <br> The relationship is reflexive - any region also belongs to itself."
            }
        },
        "reinterpretAsUInt8": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "dictIsIn": {
            "bracket": "(v)",
            "desc": {
                "en": "%%dictIsIn(&#39;dict_name&#39;, child_id, ancestor_id)%% <br> - For the &#39;dict_name&#39; hierarchical dictionary, finds out whether the &#39;child_id&#39; key is located inside &#39;ancestor_id&#39; (or matches &#39;ancestor_id&#39;). Returns UInt8."
            }
        },
        "toSecond": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a date with time to a UInt8 number containing the number of the second in the minute (0-59). <br> Leap seconds are not accounted for."
            }
        },
        "least": {
            "bracket": "(a, b)",
            "desc": {
                "en": "Returns the least element of a and b."
            }
        },
        "countEqual": {
            "bracket": "(arr, x)",
            "desc": {
                "en": "Returns the number of elements in the array equal to &#39;x&#39;. Equivalent to <span class=\"inline-example\">arrayCount(elem -> elem = x, arr)<\/span>."
            }
        },
        "IPv4StringToNum": {
            "bracket": "(s)",
            "desc": {
                "en": "The reverse function of IPv4NumToString. If the IPv4 address has an invalid format, it returns 0."
            }
        },
        "replaceRegexpAll": {
            "bracket": "(haystack, pattern, replacement)",
            "desc": {
                "en": "This does the same thing, but replaces all the occurrences"
            }
        },
        "SHA224": {
            "bracket": "(v)",
            "desc": {
                "en": "Calculates SHA-1, SHA-224, or SHA-256 from a string and returns the resulting set of bytes as FixedString(20), FixedString(28), or FixedString(32). <br> The function works fairly slowly (SHA-1 processes about 5 million short strings per second per processor core, while SHA-224 and SHA-256 process about 2.2 million). "
            }
        },
        "URLHash": {
            "bracket": "(url[, N])",
            "desc": {
                "en": "A fast, decent-quality non-cryptographic hash function for a string obtained from a URL using some type of normalization. <br> URLHash(s) - Calculates a hash from a string without one of the trailing symbols \/,? or # at the end, if present"
            }
        },
        "equals": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": "<h3>greaterOrEquals, >= operator<\/h3>"
            }
        },
        "plus": {
            "bracket": "(a, b), a + b operator",
            "desc": {
                "ru": "Вычисляет сумму чисел. <br>  <br> Также можно складывать целые числа с датой и датой-с-временем. В случае даты, прибавление целого числа означает прибавление соответствующего количества дней. В случае даты-с-временем - прибавление соответствующего количества секунд.",
                "en": "Calculates the sum of the numbers. <br>  <br> You can also add whole numbers with a date or date and time. In the case of a date, adding a whole number means adding the corresponding number of days. For a date with time, it means adding the corresponding number of seconds."
            }
        },
        "less": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": "<h3>greaterOrEquals, >= operator<\/h3>"
            }
        },
        "regionHierarchy": {
            "bracket": "(id[, geobase])",
            "desc": {
                "en": "Accepts a UInt32 number - the region ID from the Yandex geobase. Returns an array of region IDs consisting of the passed region and all parents along the chain. <br> Example: %%regionHierarchy(toUInt32(213)) = [213,1,3,225,10001,10000]%%."
            }
        },
        "toUInt64OrZero": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "rowNumberInAllBlocks": {
            "bracket": "()",
            "desc": {
                "en": "Returns an incremental row number within all blocks that were processed by this function."
            }
        },
        "toDayOfWeek": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a date or date with time to a UInt8 number containing the number of the day of the week (Monday is 1, and Sunday is 7)."
            }
        },
        "bar": {
            "bracket": "(v)",
            "desc": {
                "en": "Allows building a unicode-art diagram. <br>  <br> bar(x, min, max, width) - Draws a band with a width proportional to (x - min) and equal to &#39;width&#39; characters when x"
            }
        },
        "if": {
            "bracket": "(v)",
            "desc": {
                "en": "The suffix -%%If%% can be appended to the name of any aggregate function. In this case, the aggregate function accepts an extra argument - a condition (Uint8 type). "
            }
        },
        "regionToArea": {
            "bracket": "(id[, geobase])",
            "desc": {
                "en": "Converts a region to an area (type 5 in the geobase). In every other way, this function is the same as &#39;regionToCity&#39;.──────────────────────────────────"
            }
        },
        "dictGetUInt16": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "toUInt8": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "toUInt16": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "path": {
            "bracket": "(URL)",
            "desc": {
                "en": "- The same thing, but without the protocol and host in the result. The \/ element (root) is not included."
            }
        },
        "extractURLParameters": {
            "bracket": "(URL)",
            "desc": {
                "ru": "Возвращает массив строк вида name=value, соответствующих параметрам URL. Значения никак не декодируются.",
                "en": "- Gets an array of name=value strings corresponding to the URL parameters. The values are not decoded in any way."
            }
        },
        "OSHierarchy": {
            "bracket": "(v)",
            "desc": {
                "ru": "Принимает число типа UInt8 - идентификатор операционной системы из словаря Яндекс.Метрики. Возвращает массив с иерархией операционных систем. Аналогично функции regionHierarchy.",
                "en": "Accepts a UInt8 number - the ID of the operating system from the Yandex.Metrica dictionary. Returns an array with a hierarchy of operating systems. Similar to the &#39;regionHierarchy&#39; function."
            }
        },
        "cutQueryStringAndFragment": {
            "bracket": "(v)",
            "desc": {
                "ru": "Удаляет query string и fragment identifier. Знак вопроса и символ решётки тоже удаляются.",
                "en": "Removes the query-string and fragment identifier. The question mark and number sign are also removed."
            }
        },
        "timeSlots": {
            "bracket": "(StartTime, Duration)",
            "desc": {
                "ru": "Для интервала времени, начинающегося в StartTime и продолжающегося Duration секунд, возвращает массив моментов времени, состоящий из округлений вниз до получаса точек из этого интервала. <br> Например, %%timeSlots(toDateTime('2012-01-01 12:20:00'), toUInt32(600)) = [toDateTime('2012-01-01 12:00:00'), toDateTime('2012-01-01 12:30:00')]%%. <br> Это нужно для поиска хитов, входящих в соответствующий визит.",
                "en": "For a time interval starting at &#39;StartTime&#39; and continuing for &#39;Duration&#39; seconds, it returns an array of moments in time, consisting of points from this interval rounded down to the half hour. <br> For example, %%timeSlots(toDateTime(&#39;2012-01-01 12:20:00&#39;), toUInt32(600)) = [toDateTime(&#39;2012-01-01 12:00:00&#39;), toDateTime(&#39;2012-01-01 12:30:00&#39;)]%%. <br> This is necessary for searching for pageviews in the corresponding session."
            }
        },
        "toUInt32": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "toStartOfMinute": {
            "bracket": "(v)",
            "desc": {
                "ru": "Округляет дату-с-временем вниз до начала минуты.",
                "en": "Rounds down a date with time to the start of the minute."
            }
        },
        "version": {
            "bracket": "()",
            "desc": {
                "ru": "Возвращает версию сервера в виде строки.",
                "en": "Returns server's version as a string."
            }
        },
        "toUInt64": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "toInt16": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "reinterpretAsInt16": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "toInt64": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "toFixedString": {
            "bracket": "(s, N)",
            "desc": {
                "ru": "Преобразует аргумент типа String в тип FixedString(N) (строку фиксированной длины N). N должно быть константой. <br> Если строка имеет меньше байт, чем N, то она дополняется нулевыми байтами справа. Если строка имеет больше байт, чем N - кидается исключение.",
                "en": "Converts a String type argument to a FixedString(N) type (a string with fixed length N). N must be a constant. If the string has fewer bytes than N, it is passed with null bytes to the right. If the string has more bytes than N, an exception is thrown."
            }
        },
        "toFloat32": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "dictGetHierarchy": {
            "bracket": "(v)",
            "desc": {
                "ru": "%%dictGetHierarchy('dict_name', id)%% <br> - для иерархического словаря dict_name - вернуть массив ключей словаря, начиная с id и продолжая цепочкой родительских элементов. Возвращает Array(UInt64).",
                "en": "%%dictGetHierarchy(&#39;dict_name&#39;, id)%% <br> - For the &#39;dict_name&#39; hierarchical dictionary, returns an array of dictionary keys starting from &#39;id&#39; and continuing along the chain of parent elements. Returns Array(UInt64)."
            }
        },
        "dictGetInt64": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "CAST": {
            "bracket": "(x, t)",
            "desc": {
                "en": "Casts <i>x<\/i> to the <i>t<\/i> data type. <br> The syntax %%CAST(x AS t)%% is also supported. <br>  "
            }
        },
        "toRelativeSecondNum": {
            "bracket": "(v)",
            "desc": {
                "ru": "Переводит дату-с-временем в номер секунды, начиная с некоторого фиксированного момента в прошлом.",
                "en": "Converts a date with time or date to the number of the second, starting from a certain fixed point in the past."
            }
        },
        "toUInt8OrZero": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "toStartOfMonth": {
            "bracket": "(v)",
            "desc": {
                "ru": "Округляет дату или дату-с-временем вниз до первого дня месяца. <br> Возвращается дата.",
                "en": "Rounds down a date or date with time to the first day of the month. <br> Returns the date."
            }
        },
        "rand64": {
            "bracket": "(v)",
            "desc": {
                "ru": "Возвращает псевдослучайное число типа UInt64, равномерно распределённое среди всех чисел типа UInt64. <br> Используется linear congruential generator.",
                "en": "Returns a pseudo-random UInt64 number, evenly distributed among all UInt64-type numbers. <br> Uses a linear congruential generator."
            }
        },
        "toInt8OrZero": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "toFloat32OrZero": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "toYear": {
            "bracket": "(v)",
            "desc": {
                "ru": "Переводит дату или дату-с-временем в число типа UInt16, содержащее номер года (AD).",
                "en": "Converts a date or date with time to a UInt16 number containing the year number (AD)."
            }
        },
        "atan": {
            "bracket": "(x)",
            "desc": {
                "ru": "Арктангенс.",
                "en": "The arc tangent."
            }
        },
        "toFloat64OrZero": {
            "bracket": "(v)",
            "desc": {
                "en": "Functions for converting between numbers, strings (but not fixed strings), dates, and dates with times. All these functions accept one argument. "
            }
        },
        "arrayEnumerate": {
            "bracket": "(arr, ...)",
            "desc": {
                "en": "Returns an array the same size as the source array, indicating for each element what its position is among elements with the same value. <br>"
            }
        },
        "toDayOfMonth": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a date or date with time to a UInt8 number containing the number of the day of the month (1-31)."
            }
        },
        "dictGetUInt64": {
            "bracket": "(v)",
            "desc": {
                "ru": "",
                "en": ""
            }
        },
        "IPv4NumToStringClassC": {
            "bracket": "(num)",
            "desc": {
                "en": "Similar to IPv4NumToString, but using %%xxx%% instead of the last octet. "
            }
        },
        "reinterpretAsString": {
            "bracket": "(v)",
            "desc": {
                "en": "This function accepts a number or date or date with time, and returns a string containing bytes representing the corresponding value in host order (little endian). Null bytes are dropped from the end. For example, a UInt32 type value of 255 is a string that is one byte long."
            }
        },
        "toHour": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a date with time to a UInt8 number containing the number of the hour in 24-hour time (0-23). <br> This function assumes that if clocks are moved ahead, it is by one hour and occurs at 2 a.m., and if clocks are moved back, it is by one hour and occurs at 3 a.m. (which is not always true - even in Moscow the clocks were once changed at a different time)."
            }
        },
        "ignore": {
            "bracket": "(...)",
            "desc": {
                "en": "A function that accepts any arguments and always returns 0. <br> However, the argument is still calculated. This can be used for benchmarks."
            }
        },
        "arrayJoin": {
            "bracket": "(v)",
            "desc": {
                "en": "This is a very unusual function. <br>  <br> Normal functions don&#39;t change a set of rows, but just change the values in each row (map). Aggregate functions compress a set of rows (fold or reduce). <br> The &#39;arrayJoin&#39; function takes each row and generates a set of rows (unfold). <br>  <br> T"
            }
        },
        "length": {
            "bracket": "(v)",
            "desc": {
                "en": "Returns the length of a string in Unicode code points (not in characters), assuming that the string contains a set of bytes that make up UTF-8 encoded text. If this assumption is not met, it returns some result (it doesn&#39;t throw an exception). <br> The result type is UInt64."
            }
        },
        "tuple": {
            "bracket": "(tuple, n), operator x.N",
            "desc": {
                "en": "A function that allows getting columns from a tuple. <br> &#39;N&#39; is the column index, starting from 1. &#39;N&#39; must be a constant. &#39;N&#39; must be a strict postive integer no greater than the size of the tuple. <br> There is no cost to execute the function."
            }
        },
        "extractURLParameterNames": {
            "bracket": "(URL)",
            "desc": {
                "en": "- Gets an array of name=value strings corresponding to the names of URL parameters. The values are not decoded in any way."
            }
        },
        "tupleElement": {
            "bracket": "(tuple, n), operator x.N",
            "desc": {
                "en": "A function that allows getting columns from a tuple. <br> &#39;N&#39; is the column index, starting from 1. &#39;N&#39; must be a constant. &#39;N&#39; must be a strict postive integer no greater than the size of the tuple. <br> There is no cost to execute the function."
            }
        },
        "in": {
            "bracket": "(v)",
            "desc": {
                "en": "What to do when the amount of data exceeds one of the limits: &#39;throw&#39; or &#39;break&#39;. By default, throw."
            }
        },
        "globalIn": {
            "bracket": "(v)",
            "desc": {
                "en": "See the section &quot;IN operators&quot;."
            }
        },
        "isFinite": {
            "bracket": "(x)",
            "desc": {
                "en": "Accepts Float32 and Float64 and returns UInt8 equal to 1 if the argument is not infinite and not a NaN, otherwise 0."
            }
        },
        "isNaN": {
            "bracket": "(x)",
            "desc": {
                "en": "Accepts Float32 and Float64 and returns UInt8 equal to 1 if the argument is a NaN, otherwise 0."
            }
        },
        "isInfinite": {
            "bracket": "(x)",
            "desc": {
                "en": "Accepts Float32 and Float64 and returns UInt8 equal to 1 if the argument is infinite, otherwise 0. <br> Note that 0 is returned for a NaN."
            }
        },
        "transform": {
            "bracket": "(v)",
            "desc": {
                "en": "Transforms a value according to the explicitly defined mapping of some elements to other ones. <br> There are two variations of this function: <br>  <br> 1. %%transform(x, array_from, array_to, default)%% "
            }
        },
        "rand": {
            "bracket": "(v)",
            "desc": {
                "en": "Returns a pseudo-random UInt64 number, evenly distributed among all UInt64-type numbers. <br> Uses a linear congruential generator."
            }
        },
        "reinterpretAsUInt16": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "pi": {
            "bracket": "(v)",
            "desc": {
                "en": "Maximum pipeline depth. Corresponds to the number of transformations that each data block goes through during query processing. Counted within the limits of a single server. If the pipeline depth is greater, an exception is thrown. By default, 1000."
            }
        },
        "reinterpretAsUInt32": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "reinterpretAsUInt64": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "reinterpretAsInt8": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "upperUTF8": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a string to uppercase, assuming the string contains a set of bytes that make up a UTF-8 encoded text. It doesn&#39;t detect the language. So for Turkish the result might not be exactly correct. "
            }
        },
        "reinterpretAsInt32": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "reinterpretAsFloat32": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "reinterpretAsFloat64": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "reinterpretAsDate": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "reinterpretAsDateTime": {
            "bracket": "(v)",
            "desc": {
                "en": ""
            }
        },
        "roundToExp2": {
            "bracket": "(num)",
            "desc": {
                "en": "Accepts a number. If the number is less than one, it returns 0. Otherwise, it rounds the number down to the nearest (whole non-negative) degree of two."
            }
        },
        "upper": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a string to uppercase, assuming the string contains a set of bytes that make up a UTF-8 encoded text. It doesn&#39;t detect the language. So for Turkish the result might not be exactly correct."
            }
        },
        "positionUTF8": {
            "bracket": "(haystack, needle)",
            "desc": {
                "en": "The same as &#39;position&#39;, but the position is returned in Unicode code points. Works under the assumption that the string contains a set of bytes representing a UTF-8 encoded text. If this assumption is not met, it returns some result (it doesn&#39;t throw an exception). <br> There's also positionCaseInsensitiveUTF8 function."
            }
        },
        "roundDuration": {
            "bracket": "(num)",
            "desc": {
                "en": "Accepts a number. If the number is less than one, it returns 0. Otherwise, it rounds the number down to numbers from the set: 1, 10, 30, 60, 120, 180, 240, 300, 600, 1200, 1800, 3600, 7200, 18000, 36000. This function is specific to Yandex.Metrica and used for implementing the report on session length."
            }
        },
        "roundAge": {
            "bracket": "(num)",
            "desc": {
                "en": "Accepts a number. If the number is less than 18, it returns 0. Otherwise, it rounds the number down to numbers from the set: 18, 25, 35, 45. This function is specific to Yandex.Metrica and used for implementing the report on user age."
            }
        },
        "round": {
            "bracket": "(num)",
            "desc": {
                "en": "Accepts a number. If the number is less than 18, it returns 0. Otherwise, it rounds the number down to numbers from the set: 18, 25, 35, 45. This function is specific to Yandex.Metrica and used for implementing the report on user age."
            }
        },
        "floor": {
            "bracket": "(x[, N])",
            "desc": {
                "en": "Returns a rounder number that is less than or equal to &#39;x&#39;."
            }
        },
        "notEmpty": {
            "bracket": "(v)",
            "desc": {
                "en": "Returns 0 for an empty array, or 1 for a non-empty array. <br> The result type is UInt8. <br> The function also works for strings."
            }
        },
        "lengthUTF8": {
            "bracket": "(v)",
            "desc": {
                "en": "Returns the length of a string in Unicode code points (not in characters), assuming that the string contains a set of bytes that make up UTF-8 encoded text. If this assumption is not met, it returns some result (it doesn&#39;t throw an exception). <br> The result type is UInt64."
            }
        },
        "lower": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a string to lowercase, assuming the string contains a set of bytes that make up a UTF-8 encoded text. It doesn&#39;t detect the language.  "
            }
        },
        "lowerUTF8": {
            "bracket": "(v)",
            "desc": {
                "en": "Converts a string to lowercase, assuming the string contains a set of bytes that make up a UTF-8 encoded text. It doesn&#39;t detect the language. "
            }
        },
        "reverse": {
            "bracket": "(v)",
            "desc": {
                "en": "Reverses a sequence of Unicode code points, assuming that the string contains a set of bytes representing a UTF-8 text. Otherwise, it does something else (it doesn&#39;t throw an exception)."
            }
        },
        "URLPathHierarchy": {
            "bracket": "(URL)",
            "desc": {
                "en": "- The same thing, but without the protocol and host in the result. The \/ element (root) is not included. "
            }
        },
        "substringUTF8": {
            "bracket": "(s, offset, length)",
            "desc": {
                "en": "The same as &#39;substring&#39;, but for Unicode code points. Works under the assumption that the string contains a set of bytes representing a UTF-8 encoded text. If this assumption is not met, it returns some result (it doesn&#39;t throw an exception)."
            }
        },
        "appendTrailingCharIfAbsent": {
            "bracket": "(s, c)",
            "desc": {
                "en": "If the %%s%% string is non-empty and does not contain the %%c%% character at the end, it appends the %%c%% character to the end."
            }
        },
        "alphaTokens": {
            "bracket": "(s)",
            "desc": {
                "en": "Selects substrings of consecutive bytes from the range a-z and A-Z. <br> Returns an array of selected substrings."
            }
        },
        "splitByChar": {
            "bracket": "(separator, s)",
            "desc": {
                "en": "Splits a string into substrings, using &#39;separator&#39; as the separator. <br> &#39;separator&#39; must be a string constant consisting of exactly one character. <br> Returns an array of selected substrings"
            }
        },
        "arrayStringConcat": {
            "bracket": "(arr[, separator])",
            "desc": {
                "en": "Concatenates strings from the array elements, using &#39;separator&#39; as the separator. <br> &#39;separator&#39; is a string constant, an optional parameter. By default it is an empty string. <br> Returns a string."
            }
        },
        "replaceAll": {
            "bracket": "(haystack, pattern, replacement)",
            "desc": {
                "en": "Replaces all occurrences of the &#39;pattern&#39; substring in &#39;haystack&#39; with the &#39;replacement&#39; substring."
            }
        },
        "replaceRegexpOne": {
            "bracket": "(haystack, pattern, replacement)",
            "desc": {
                "en": "Replacement using the &#39;pattern&#39; regular expression. A re2 regular expression. Replaces only the first occurrence, if it exists. <br> A pattern can be specified as &#39;replacement&#39;. "
            }
        },
        "cbrt": {
            "bracket": "(x)",
            "desc": {
                "en": "Accepts a numeric argument and returns a Float64 number close to the cubic root of the argument."
            }
        },
        "match": {
            "bracket": "(pattern)(time, cond1, cond2, ...)",
            "desc": {
                "en": "Pattern matching for event chains. <br>  <br> &#39;pattern&#39; is a string containing a pattern to match. The pattern is similar to a regular expression."
            }
        },
        "cutURLParameter": {
            "bracket": "(URL, name)",
            "desc": {
                "en": "Removes the URL parameter named &#39;name&#39;, if present. This function works under the assumption that the parameter name is encoded in the URL exactly the same way as in the passed argument."
            }
        },
        "like": {
            "bracket": "(haystack, pattern), haystack NOT LIKE pattern operator",
            "desc": {
                "en": "The same thing as &#39;like&#39;, but negative."
            }
        },
        "domain": {
            "bracket": "(v)",
            "desc": {
                "en": "- Selects the part of the domain that includes top-level subdomains up to the &quot;first significant subdomain&quot; (see the explanation above). <br> For example, cutToFirstSignificantSubdomain(&#39;https:\/\/news.yandex.com.tr\/&#39;) = &#39;yandex.com.tr&#39;."
            }
        },
        "domainWithoutWWW": {
            "bracket": "(v)",
            "desc": {
                "en": "- Selects the domain and removes no more than one &#39;www.&#39; from the beginning of it, if present."
            }
        },
        "firstSignificantSubdomain": {
            "bracket": "(v)",
            "desc": {
                "en": "- Selects the part of the domain that includes top-level subdomains up to the &quot;first significant subdomain&quot; (see the explanation above). <br> For example, cutToFirstSignificantSubdomain(&#39;https:\/\/news.yandex.com.tr\/&#39;) = &#39;yandex.com.tr&#39;."
            }
        },
        "queryString": {
            "bracket": "(v)",
            "desc": {
                "en": "Removes the query-string and fragment identifier. The question mark and number sign are also removed."
            }
        },
        "queryStringAndFragment": {
            "bracket": "(v)",
            "desc": {
                "en": "Removes the query-string and fragment identifier. The question mark and number sign are also removed."
            }
        },
        "extractURLParameter": {
            "bracket": "(URL)",
            "desc": {
                "en": "- Gets an array of name=value strings corresponding to the names of URL parameters. The values are not decoded in any way."
            }
        },
        "URLHierarchy": {
            "bracket": "(URL)",
            "desc": {
                "en": "- Gets an array containing the URL trimmed to the %%\/%%, %%?%% characters in the path and query-string.  Consecutive separator characters are counted as one. The cut is made in the position after all the consecutive separator characters. Example:"
            }
        },
        "cutToFirstSignificantSubdomain": {
            "bracket": "(v)",
            "desc": {
                "en": "- Selects the part of the domain that includes top-level subdomains up to the &quot;first significant subdomain&quot; (see the explanation above). <br> For example, cutToFirstSignificantSubdomain(&#39;https:\/\/news.yandex.com.tr\/&#39;) = &#39;yandex.com.tr&#39;."
            }
        },
        "cutWWW": {
            "bracket": "(v)",
            "desc": {
                "en": "Removes no more than one &#39;www.&#39; from the beginning of the URL&#39;s domain, if present."
            }
        },
        "cutQueryString": {
            "bracket": "(v)",
            "desc": {
                "en": "Removes the query-string and fragment identifier. The question mark and number sign are also removed."
            }
        },
        "cutFragment": {
            "bracket": "(v)",
            "desc": {
                "en": "Removes the fragment identifier. The number sign is also removed."
            }
        },
        "visitParamHas": {
            "bracket": "(params, name)",
            "desc": {
                "en": "Checks whether there is a field with the &#39;name&#39; name."
            }
        },
        "visitParamExtractFloat": {
            "bracket": "(params, name)",
            "desc": {
                "en": "The same as for Float64."
            }
        },
        "visitParamExtractBool": {
            "bracket": "(params, name)",
            "desc": {
                "en": "Parses a true\/false value. The result is UInt8."
            }
        },
        "visitParamExtractRaw": {
            "bracket": "(params, name)",
            "desc": {
                "en": "Returns the value of a field, including separators."
            }
        },
        "exp": {
            "bracket": "(x)",
            "desc": {
                "en": "Accepts a numeric argument and returns a Float64 number close to 10<sup>x<\/sup>."
            }
        },
        "exp2": {
            "bracket": "(x)",
            "desc": {
                "en": "Accepts a numeric argument and returns a Float64 number close to 2<sup>x<\/sup>."
            }
        },
        "exp10": {
            "bracket": "(x)",
            "desc": {
                "en": "Accepts a numeric argument and returns a Float64 number close to 10<sup>x<\/sup>."
            }
        },
        "tgamma": {
            "bracket": "(x)",
            "desc": {
                "en": "Gamma function."
            }
        },
        "log10": {
            "bracket": "(x)",
            "desc": {
                "en": "Accepts a numeric argument and returns a Float64 number close to the decimal logarithm of the argument."
            }
        },
        "sqrt": {
            "bracket": "(x)",
            "desc": {
                "en": "Accepts a numeric argument and returns a Float64 number close to the square root of the argument."
            }
        },
        "erf": {
            "bracket": "(v)",
            "desc": {
                "en": "What to do when the amount of data exceeds one of the limits: &#39;throw&#39; or &#39;break&#39;. By default, throw."
            }
        },
        "erfc": {
            "bracket": "(x)",
            "desc": {
                "en": "Accepts a numeric argument and returns a Float64 number close to 1 - erf(x), but without loss of precision for large &#39;x&#39; values."
            }
        },
        "lgamma": {
            "bracket": "(x)",
            "desc": {
                "en": "The logarithm of the gamma function."
            }
        },
        "sin": {
            "bracket": "(x)",
            "desc": {
                "en": "Accepts Float32 and Float64 and returns UInt8 equal to 1 if the argument is infinite, otherwise 0. <br> Note that 0 is returned for a NaN."
            }
        },
        "cos": {
            "bracket": "(x)",
            "desc": {
                "ru": "Арккосинус.",
                "en": "The arc cosine."
            }
        },
        "tan": {
            "bracket": "(x)",
            "desc": {
                "ru": "Арктангенс.",
                "en": "The arc tangent."
            }
        },
        "pow": {
            "bracket": "(x, y)",
            "desc": {
                "ru": "x<sup>y<\/sup>.",
                "en": "x<sup>y<\/sup>."
            }
        }
    }
};
