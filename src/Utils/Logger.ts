class Logger {
  public static debug(...message: any): void {
    console.log('DEBUG:', ...message)
  }
  public static info(...message: any): void {
    console.info('INFO:', ...message)
  }
  public static warn(...message: any): void {
    console.warn('WARNING:', ...message)
  }
  public static error(...message: any): void {
    console.error('ERROR:', ...message)
  }
}

export default new Logger()
