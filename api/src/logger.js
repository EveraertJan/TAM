const winston = require('winston');
const Slack = require('winston-slacker');
const conditionalFormatter = info => {
  let output = `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
  if(info.durationMs){
    output+=` (${info.durationMs}ms)`;
  }
  return output;
};

const transports = [new winston.transports.Console()];
const slackUrl = process.env.SLACK_WEBHOOK_URL;
module.exports = function (namespace) {
  if (slackUrl) {
    //yeah, I get the irony of this
    console.log('Using slack transport');
    transports.push(new Slack({
      webhook: slackUrl,
      channel: "#apt-tam-logs",
      customFormatter: (level, message, info)=>`${process.env.DOMAIN} [${info.label}] ${info.message}`
    }));
  }

  return winston.createLogger({
    format: winston.format.combine(
      winston.format.label({label: namespace}),
      winston.format.timestamp(),
      winston.format.splat(),
      winston.format.printf(conditionalFormatter)
    ),
    transports: transports
  });
};