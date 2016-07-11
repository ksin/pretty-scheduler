module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'pretty-scheduler',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
