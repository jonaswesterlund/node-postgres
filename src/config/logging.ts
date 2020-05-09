import { createLogger, transports, format } from 'winston';

export const logger = createLogger({
  format: format.combine(format.json(), format.prettyPrint()),
  transports: [
    new transports.Console({
      handleExceptions: true,
      level: 'info',
    }),
  ],
});

class Stream {
  write(message: any) {
    logger.info(message);
  }
}
export const stream = new Stream();

export const jsonFormat =
  '{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}';
