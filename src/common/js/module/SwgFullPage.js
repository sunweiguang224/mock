import $ from 'jquery';

/**
 * H5全屏滚动插件
 <div class="full-page">
   <div class="page" id="page1"></div>
   <div class="page" id="page2"></div>
 </div>
 new SwgFullPage().init();
 */
class SwgFullPage {
  constructor() {
    this.page = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
    this.$container = null;
    this.$page = null;
    this.currentPageNo = 1;
    this.touchPoint = {
      x: null,
      y: null
    };
    this.touchStartPoint = {
      x: null,
      y: null
    };
    this.isScrolling = false;
  }

  /* 初始化 */
  init({
    selector = '.full-page',
    transitionDuration = 500,
    callbacks = {
      // 1: {
      //   maxExecuteTimes: 1,
      //   next: function () {
      //   }		// 第1屏显示时触发的回调
      // },
      // 2: {
      //   maxExecuteTimes: 1,
      //   next: function () {
      //   }		// 第1屏过渡至第2屏结束时触发的回调
      // }
    }
  } = {}) {
    debugger
    var ts = this;
    // 保存 - 传入的参数
    ts.param = {};
    ts.param.selector = selector;
    ts.param.transitionDuration = transitionDuration;
    ts.param.callbacks = callbacks;
    // 保存 - 容器变量
    ts.$container = $(ts.param.selector);
    ts.$page = ts.$container.children('.page');
    // 设置 - 每页高度
    ts.setPageHeight(ts.page.height);
    // 设置 - 翻页速度
    let duration = ts.param.transitionDuration / 1000 + 's';
    ts.$container.css('transition-duration', duration);
    ts.$container.css('-webkit-transition-duration', duration);
    //ts.$container.css('transition-timing-function', 'ease-in');
    // 设置 - 无滚动条
    $('body').css('overflow', 'hidden');
    // 设置 - 兼容性-解决微信中闪屏问题
    ts.$container.css('backface-visibility', `hidden`);
    ts.$container.css('-webkit-backface-visibility', `hidden`);
    // 默认执行第一屏next回调
    ts.executeCallback('next');
    // 绑定事件
    ts.bindEvent();
  };

  /* 设置每一页高度 */
  setPageHeight(height) {
    var ts = this;
    ts.page.height = height;
    ts.$page.css('height', `${height}px`);
    // 设置 - 每页偏移量
    ts.$page.each(function (i) {
      $(this).attr('data-transform', 'translateY(-' + (i * ts.page.height) + 'px)');
    });
  };

  /* 绑定事件 */
  bindEvent() {
    var ts = this;
    // 触摸开始 - 记录起点
    ts.$container.on('touchstart', function (event) {
      event.preventDefault();
      ts.touchPoint.x = event.changedTouches[0].clientX;
      ts.touchPoint.y = event.changedTouches[0].clientY;
      ts.touchStartPoint.x = ts.touchPoint.x;
      ts.touchStartPoint.y = ts.touchPoint.y;
    });
    // 触摸移动 - 翻页
    ts.$container.on('touchmove', function (event) {
      event.preventDefault();
      if (ts.isScrolling) return;
      ts.isScrolling = true;
      var directionY = event.changedTouches[0].clientY - ts.touchPoint.y;
      // 下一页
      if (directionY < 0) {
        ts.nextPage();
        //上一页
      } else if (directionY > 0) {
        ts.beforePage();
      }
    });
    // 滚轮滚动 - 翻页
    $(document).on('mousewheel', function (event) {
      //debugger
      event.preventDefault();
      if (ts.isScrolling) return;
      var directionY = event.wheelDeltaY;
      // 下一页
      if (directionY < 0) {
        ts.nextPage();
        //上一页
      } else if (directionY > 0) {
        ts.beforePage();
      }
      ts.isScrolling = true;
      setTimeout(function () {
        ts.isScrolling = false;
      }, ts.param.transitionDuration);
    }, false);
    // 触摸结束 - 状态设置为可以翻页
    ts.$container.on('touchend', function (event) {
      event.preventDefault();
      // 触发click事件
      if ((ts.touchStartPoint.x > event.changedTouches[0].clientX - 2 || ts.touchStartPoint.x < event.changedTouches[0].clientX + 2) &&
        (ts.touchStartPoint.y > event.changedTouches[0].clientY - 2 || ts.touchStartPoint.y < event.changedTouches[0].clientY + 2)) {
        $(event.target).click();
      }
      ts.isScrolling = false;

    });
  };

  /* 下一页 */
  nextPage(pageNo) {
    var ts = this;
    if (pageNo) {
      ts.currentPageNo = pageNo - 1;
    }
    if (ts.currentPageNo === ts.$page.length) return;
    var transform = ts.$page.eq(ts.currentPageNo++).attr('data-transform');
    ts.$container.css('transform', transform);
    ts.$container.css('-webkit-transform', transform);
    ts.executeCallback('next', ts.param.transitionDuration);
  };

  /* 上一页 */
  beforePage(pageNo) {
    var ts = this;
    if (pageNo) {
      ts.currentPageNo = pageNo - 1;
    }
    if (pageNo) {
      ts.currentPageNo = pageNo + 1;
    }
    if (ts.currentPageNo === 1) return;
    var transform = ts.$page.eq((--ts.currentPageNo) - 1).attr('data-transform');
    ts.$container.css('transform', transform);
    ts.$container.css('-webkit-transform', transform);
    ts.executeCallback('before', ts.param.transitionDuration);
  };

  /* 执行某页显示的回调方法 */
  executeCallback(type = 'next', delay = 0) {
    var ts = this;
    if (type == 'next') {
      var callback = ts.param.callbacks[ts.currentPageNo];
      if (callback && callback.maxExecuteTimes && callback.executeTimes >= callback.maxExecuteTimes) return;
      if (callback && callback.next) {
        if (delay) {
          setTimeout(function () {
            callback.next()
            callback.executeTimes = callback.executeTimes === undefined ? 1 : callback.executeTimes + 1;
          }, delay);
        } else {
          callback.next()
          callback.executeTimes = callback.executeTimes === undefined ? 1 : callback.executeTimes + 1;
        }
      }
    } else if (type == 'before', delay = 0) {
      var callback = ts.param.callbacks[ts.currentPageNo];
      if (callback && callback.maxExecuteTimes && callback.executeTimes >= callback.maxExecuteTimes) return;
      if (callback && callback.back) {
        if (delay) {
          setTimeout(function () {
            callback.back()
            callback.executeTimes = callback.executeTimes === undefined ? 1 : callback.executeTimes + 1;
          }, delay);
        } else {
          callback.back()
          callback.executeTimes = callback.executeTimes === undefined ? 1 : callback.executeTimes + 1;
        }
      }
    }
  };
}

module.exports = SwgFullPage;
