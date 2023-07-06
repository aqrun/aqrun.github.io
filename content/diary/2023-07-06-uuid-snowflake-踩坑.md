---
title: UUID雪花算法踩坑
description: "UUID雪花算法优化保证SnowflakeIdGenerator对象全局唯一"

taxonomies:
    categories: ["diary"]
    tags: ["diary", "rust", "snowflake", "雪花算法"]
---

之前UUID生成算法是使用 `rs-snowflake` 库，生成唯一ID再转为36进制字符串
为保证ID唯一性又使用的是sleep强制系统延时，本以为万事大吉，其实不然，
今天就出了BUG：在一次循环中生的ID都是一样。

经过测试只要保证 SnowflakeIdGenerator 对象全局唯一就可以保证生成的数据的唯一性
并不需要延时处理

## 用到的库

* once_cell::sync::Lazy 简化全局变量声明方式，延迟初始化全局变量
* std::sync::Mutex 标准库互斥锁，让变量可读可写
* snowflake::SnowflakeIdGenerator 雪花算法库

## 声名全局Generator对象

```rust
// SNOW_ID_GENERATOR 全局唯一可变SnowflakeIdGenerator对象
pub static SNOW_ID_GENERATOR: Lazy<Mutex<SnowflakeIdGenerator>> =
    Lazy::new(|| Mutex::new(SnowflakeIdGenerator::new(2, 3)));
```

## 改良后的UUID方法

```rust
pub fn uuid() -> String {
    let radix = 36;
    let raw_id = SNOW_ID_GENERATOR.lock().unwrap().real_time_generate() as u128;

    // random_36 内部方法将数字转为36进制表示
    random_36(raw_id, radix)
}
```
