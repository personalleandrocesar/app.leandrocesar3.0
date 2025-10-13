module.exports = {
    apps: [
        {
            name: 'app.lcesar.com',
            port: '3001',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
