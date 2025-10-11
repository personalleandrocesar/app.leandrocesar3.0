module.exports = {
    apps: [
        {
            name: 'nxwod.com',
            port: '3018',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
