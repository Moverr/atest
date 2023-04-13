const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const app = require('./app');
const http = require('http');
const url = require('url');

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Use a load balancer to distribute requests evenly among the worker processes
    const balancer = http.createServer((req, res) => {
        const worker = cluster.fork();
        const parsedUrl = url.parse(req.url, true);
        const query = parsedUrl.query;
        worker.send({ query });
    });
    balancer.listen(process.env.LOAD_BALANCER_PORT);
    console.log(`Load balancer is running at http://localhost:${process.env.LOAD_BALANCER_PORT}`);

    // Use a process manager to ensure that the worker processes are always running
    if (process.env.NODE_ENV === 'production') {
        const pm2 = require('pm2');
        pm2.connect((err) => {
            if (err) {
                console.error(err);
                process.exit(2);
            }
            pm2.start({
                script: 'app.js',
                name: 'visionaward',
                exec_mode: 'cluster',
                instances: numCPUs,
            }, (err, apps) => {
                pm2.disconnect();
                if (err) {
                    throw err;
                }
            });
        });
    }
} else {
    // Worker process - start the server
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started and running at http://localhost:${PORT}`);
    });

    // Receive messages from the load balancer
    process.on('message', (message) => {
        const query = message.query;
        // Handle the request based on the query parameters
    });

    // Use a process manager to automatically restart the worker process if it fails
    if (process.env.NODE_ENV === 'production') {
        process.on('uncaughtException', (err) => {
            console.error(err);
            process.exit(1);
        });
        process.on('unhandledRejection', (reason, promise) => {
            console.error(reason);
            process.exit(1);
        });
    }
}
