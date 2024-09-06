const devLog = (...msgs: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...msgs);
  }
};

export default devLog;
