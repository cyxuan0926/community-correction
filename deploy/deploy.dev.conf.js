module.exports = {
  repository: {
    type: 'git',
    url: 'http://103.37.158.17/yt/front/community-correction.git',
    branch: 'dev'
  },

  buildConfig: {
    commands: ['npm ci', 'npm run build:dev'],
    outputDir: 'dist',
    assetsPatterns: ['static', 'index.html']
  },

  remoteOperatesConfig: {
    remotePath: '/mnt/projects/connginx/www'
  },

  connectConfig: {
    host: '47.107.245.151',
    port: 22,
    username: 'root',
    password: 'GKYT!ssj##',
  }
};
