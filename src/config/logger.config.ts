import moment = require("moment")

interface LoggerOptions {
	singleFile: boolean
	fileName: string
	format: string
}

/**
 * @var defaultOptions contains all the default configuration for the logger.
 */
const defaultOptions: LoggerOptions = {
	singleFile: false,
	fileName: moment().format("YYYYMMDD"),
	format: "log",
}

export { defaultOptions, LoggerOptions }
