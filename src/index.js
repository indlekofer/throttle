export default (fn, wait = 100, immediate = false) => {
  let timeout = null, initialCall = true;
  
  return function() {
    const context = this,
      args = arguments,
      callNow = immediate && initialCall,
      fnc = () => {
        fn.apply(context, args);
        timeout = null;
      };
    
    if (callNow) { 
      initialCall = false;
      fnc();
    }

    if (!timeout) {
      timeout = setTimeout(fnc, wait);
    }
  };
};
