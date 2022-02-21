class Logger {
  public debug(...message: any): void {
    console.log('DEBUG:', ...message)
  }
  public info(...message: any): void {
    console.info('INFO:', ...message)
  }
  public warn(...message: any): void {
    console.warn('WARNING:', ...message)
  }
  public error(...message: any): void {
    console.error('ERROR:', ...message)
  }
}

export default new Logger()
