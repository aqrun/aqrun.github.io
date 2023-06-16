---
title: drupal7 EntityFieldQuery获取指定类型的内容列表
description: 'EntityFieldQuery获取指定类型的内容列表'

taxonomies:
  categories: ["backend", "article"]
  tags: ["drupal7", "EntityFieldQuery", "php"]
---

EntityFieldQuery获取指定类型的内容列表

<pre class="line-numbers">
    <code class="language-php">

//先获取指定类型内容nid列表
$query = new EntityFieldQuery();
$entities = $query->entityCondition('entity_type', 'node')
      -> propertyCondition('type', 'your node type');
$total = $entities->count()->execute(); //获取数据总条数
$entities->count() = false;  //设置计数为false
$nodes = $entities->range(1,1)->count(false)->execute(); //获取指定类型node数据

foreach($nodes['node'] as $k=$v){
    $nids[] = $v['nid'];
}
$nodesData = node_load_multiple($nids);  //获取指定nid内容对象列表
foeach($nodesData as $n){
   //处理相关数据
}

</code></pre>

EntityFieldQuery 类在 entity.inc文件
