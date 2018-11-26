/**
 * scp -r _site/ root@47.100.6.70:/var/www/aqrun
 */
(function ($) {
  window.g = window.g || {};
  g.mainMenus = {
    "main": {"id": 100, "name": "首页", "href": "/"},
    "php": {"id": 101, "name": "PHP", "href": "/blog/php/"},
    "javascript": {"id": 102, "name": "Javascript", "href": "/blog/javascript/"},
    "java": {"id": 103, "name": "Java", "href": "/blog/java/"},
    "android": {"id": 104, "name": "Android", "href": "/blog/android/"},
    "ios": {"id": 105, "name": "IOS", "href": "/blog/ios/"},
    "diary": {"id": 106, "name": "随笔", "href": "/blog/diary/"}
  };

  $(function () {
    $('.nav .id_' + g.menuId).addClass('active');
  })
})(jQuery)