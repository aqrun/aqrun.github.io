---
title: 每日随笔
description: 曾经沧海难为水，除却巫山不是云。
---

{% include header.html %}

<div
    class="g-banner home-banner diary {{ site.theme-color | prepend: 'banner-theme-' }}"
    data-theme="{{ site.theme-color }}"
    style="{% if page.header-img %}background: url({{ page.header-img | prepend: site.baseurl }}) no-repeat center center; background-size: cover;{% endif %}"
>
    <h2>{{ page.home-title }}</h2>
    <h3>{{ page.description }}</h3>
</div>


<main class="g-container home-content">
  {% include articleList.html %}

  {% include sidebar.html %}

</main>

    
{% include footer.html %}
