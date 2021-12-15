module.exports = {
    purge:['./src/**/*.{js,jsx,ts,tsx}',],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        colors:{
          primary:'#121330',//#192F5E
          accent:'#3EEFD8',
          black:'#444',
          white:'#fff',
          gray:{
            DEFAULT:'#888888',
            light:'#e5e5e5',
          }
        },
      },
    },
  }