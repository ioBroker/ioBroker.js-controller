'use strict';

exports.parseProtocol = function parseProtocol(protocol) {
  switch (protocol) {
    case 'udp':
    case 'udp4':
      return { type: 'udp', family: 4, isDgram: true };

    case 'udp6':
      return { type: 'udp', family: 6, isDgram: true };

    case 'tcp':
    case 'tcp4':
      return { type: 'tcp', family: 4 };

    case 'tcp6':
      return { type: 'tcp', family: 6 };

    default:
      throw new Error('Implemented protocols: udp, udp4, udp6, tcp, tcp4, tcp6. Invalid syslog protocol: ' + protocol);
  }
};
