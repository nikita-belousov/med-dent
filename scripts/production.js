process.env.NODE_ENV = 'production'

const args = ['start'];
const opts = { stdio: 'inherit', shell: true };
require('child_process').spawn('yarn', args, opts);
