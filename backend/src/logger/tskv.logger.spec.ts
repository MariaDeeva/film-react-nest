import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should format log message correctly', () => {
    const message = 'Test log message';
    const expectedTime = new Date().toISOString();
    const formattedMessage = logger.formatMessage('log', message);
    
    expect(formattedMessage).toMatch(/time=[\d\-T:.Z]+/); // Проверяем, что время соответствует формату ISO
    expect(formattedMessage).toContain(`level=log`);
    expect(formattedMessage).toContain(`message=${message}`);
  });

  it('should log message at log level', () => {
    const addMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'Log level test';
    logger.log(message);
    const expected = expect.stringContaining(`level=log`);
    expect(addMock).toHaveBeenCalledWith(expected);
  });

  it('should log message at error level', () => {
    const addMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'Error level test';
    logger.error(message);
    const expected = expect.stringContaining(`level=error`);
    expect(addMock).toHaveBeenCalledWith(expected);
  });

  it('should log message at warn level', () => {
    const addMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'Warn level test';
    logger.warn(message);
    const expected = expect.stringContaining(`level=warn`);
    expect(addMock).toHaveBeenCalledWith(expected);
  });

  it('should log message at debug level', () => {
    const addMock = jest.spyOn(console, 'debug').mockImplementation(() => {});
    const message = 'Debug level test';
    logger.debug(message);
    const expected = expect.stringContaining(`level=debug`);
    expect(addMock).toHaveBeenCalledWith(expected);
  });

  it('should log message at verbose level', () => {
    const addMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'Verbose level test';
    logger.verbose(message);
    const expected = expect.stringContaining(`level=verbose`);
    expect(addMock).toHaveBeenCalledWith(expected);
  });

  it('should format message with optional parameters', () => {
    const message = 'Test message with params';
    const param1 = 'param1Value';
    const param2 = 'param2Value';
    const formattedMessage = logger.formatMessage('log', message, param1, param2);
    
    expect(formattedMessage).toContain(`param0=${param1}`);
    expect(formattedMessage).toContain(`param1=${param2}`);
  });
});
