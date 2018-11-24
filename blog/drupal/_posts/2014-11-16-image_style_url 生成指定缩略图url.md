---
layout: post
title: image_style_url 生成指定缩略图url
tags: drupal7 image_style_url
excerpt: '
modules/image/image.module<br/>
'
---

modules/image/image.module

<pre class="line-numbers">
    <code class="language-php">

    function image_style_url($style_name, $path) {...}

    //example:
    $imgItem = field_get_items('node', $node, 'field_image');
    $imgUrl = image_style_url("com_introduce", $imgItem[0]['uri']);

</code>
</pre>