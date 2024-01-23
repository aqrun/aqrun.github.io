(() => {
  function main() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
  
    // 微信浏览器中打开
    if (isWeixin) {
      document.querySelector('.oic-comment-wrapper').style.display = 'none';
    }
  }

  main();
})();

