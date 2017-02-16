class NativeCaller {
  constructor(){}
  // 唤起
  call({
    // protocal = 'sohunews://pr/news://newsId=172865748',
    protocal = '//applink.k.sohu.com?url='+'news://newsId=172865748',
    needJump = false,
    jumpUrl = '//3g.k.sohu.com',
    jumpDelay = 3000
  } = {}) {
    // 如果唤起成功,取消延迟跳转
    let jumpTimeout = null;
    if (needJump) {
      document.addEventListener('visibilitychange', function () {
        if (jumpTimeout && document.hidden === true) {
          clearTimeout(jumpTimeout);
        }
      }, false);
    }
    // 唤起native
    // this.iframeCall(protocal);
    this.aCall(protocal);
    // 唤起native后,开启延迟跳转
    if (needJump) {
      jumpTimeout = window.setTimeout(function () {
        location.href = jumpUrl;
      }, jumpDelay);
    }
  }

  /* iframe方式唤起native */
  iframeCall(protocal){
    let iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    // iframe.style.background = 'red';
    iframe.src = protocal;
    document.body.appendChild(iframe);
    iframe.remove();
  }

  /* a标签方式唤起native */
  aCall(protocal){
    var a = document.createElement('a');
    a.href = protocal;
    document.body.appendChild(a);
    var event = document.createEvent('MouseEvent');
    event.initEvent('click', false, false);
    a.dispatchEvent(event);
    a.remove();
  }
}

export default new NativeCaller();
