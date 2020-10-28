import { join } from "path"
import { existsSync, mkdirSync, openSync, closeSync } from "fs"
import { defaultOptions, LoggerOptions } from "../config/logger.config"

/**
 * @class Logger
 */
export default class Logger {
	/**
	 * @var logDir path where to put the logs
	 */
	private logDir: string

	/**
	 * !TODO
	 */
	private logPath: string | null = null

	/**
	 * !TODO
	 */
	private options: LoggerOptions

	/**
	 * @constructor Create a new logger instance.
	 * @param logDir
	 */
	constructor(logDir: string, options: LoggerOptions | null) {
		if (!logDir) throw Error("Please specify a directory where to store log files.")
		this.logDir = logDir
		// If user has provided custom options, we merge custom options with default options
		this.options = options ? { ...defaultOptions, ...options } : defaultOptions
		this.init()
	}

	/**
	 * @method: Create the logdir if not exist
	 */
	private init(): void {
		const { singleFile, fileName, format } = this.options
		// Check if log directory exists, else create it
		if (!existsSync(this.logDir)) mkdirSync(this.logDir, { recursive: true })
		// If single file, we create the file and store it path into a variable
		if (singleFile) {
			const filePath = join(this.logDir, fileName + "." + format)
			this.touch(filePath, "w")
		}
	}

	private touch(file: string, mode: string = "r"): void {
		if (!file) throw Error(`Invalid file path. Creation aborted.`)
		closeSync(openSync(file, mode))
	}
}
