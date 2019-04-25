const net = require('net');
const livenessPort = 7070;
const readinessPort = 7071;
const host = '0.0.0.0';

const readinessServer = net.createServer();
const livenessServer = net.createServer();

//for consumption by https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#define-a-tcp-liveness-probe
function startTcpListener(port, server, name, logger = console) {
    return new Promise(resolve => {
        server.listen(port, host, () => {
            logger.info(`TCP ${name} service is running on port ${port}.`);
            resolve();
        });

        server.on('connection', function(sock) {
            logger.debug(name + ' Socket connection: ' + sock.remoteAddress + ':' + sock.remotePort);
        });
    });
}

module.exports = {
    start: (port, logger) => startTcpListener(port || livenessPort, livenessServer, 'Liveness', logger),
    ready: (port, logger) => startTcpListener(port || readinessPort, readinessServer, 'Readiness', logger)
};
