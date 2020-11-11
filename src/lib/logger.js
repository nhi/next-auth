let _logger = console

const logger = {
  error: (errorCode, ...text) => {
    if (!_logger) { return }
    if (text && text.length <= 1) { text = text[0] || '' }
    _logger.error(
      `[next-auth][error][${errorCode.toLowerCase()}]`,
      text,
      `\nhttps://next-auth.js.org/errors#${errorCode.toLowerCase()}`
    )
  },
  warn: (warnCode, ...text) => {
    if (!_logger) { return }
    if (text && text.length <= 1) { text = text[0] || '' }
    _logger.warn(
      `[next-auth][warn][${warnCode.toLowerCase()}]`,
      text,
      `\nhttps://next-auth.js.org/warnings#${warnCode.toLowerCase()}`
    )
  },
  debug: (debugCode, ...text) => {
    if (!_logger) { return }
    if (text && text.length <= 1) { text = text[0] || '' }
    if (process && process.env && process.env._NEXTAUTH_DEBUG) {
      _logger.log(
        `[next-auth][debug][${debugCode.toLowerCase()}]`,
        text
      )
    }
  },
  setLogger(logger) {
    if (validLogger(logger)) {
      _logger = logger
    }
  }
}

function validLogger(logger) {
  if (typeof logger.warn === "function" &&
  typeof logger.log === "function" &&
  typeof logger.error === "function") {
    return true
  }

  throw new Error("The logger you passed is invalid. Make sure it has an error a warn and a log method.")
}

export default logger
