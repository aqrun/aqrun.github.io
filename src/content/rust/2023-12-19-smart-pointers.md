---
title: 'Rust 智能指针'
description: '指针（pointer）是一个包含内存地址的变量的通用概念，智能指针（smart pointers）是一类数据结构，它们的表现类似指针，但是也拥有额外的元数据和功能'

taxonomies:
  categories: ['rust', 'article']
  tags: ['rust', '智能指针', '引用计数', '指针']
---

指针 （pointer）是一个包含内存地址的变量的通用概念。这个地址引用，
或 “指向”（points at）一些其他数据。Rust 中最常见的指针是引用（reference）。
引用以 & 符号为标志并借用了它们所指向的值。
除了引用数据没有任何其他特殊功能，也没有额外开销。

智能指针（smart pointers）是一类数据结构，它们的表现类似指针，但是也拥有额外的元数据和功能。
智能指针的概念并不为 Rust 所独有；其起源于 C++ 并存在于其他语言中。
Rust 标准库中定义了多种不同的智能指针，它们提供了多于引用的额外功能。
如引用计数 （reference counting）智能指针类型。这种指针允许数据有多个所有者，
它会记录所有者的数量，当没有所有者时清理数据。在 Rust 中因为引用和借用，
普通引用和智能指针的一个额外的区别是引用是一类只借用数据的指针；
相反，在大部分情况下，智能指针 拥有 它们指向的数据。

常见的智能指针：

- `Box<T>` 用于在堆上分配值
- `Rc<T>/Week<T>` 一个引用计数类型，其数据可以有多个所有者
- `Cell<T>/RefCell<T>/OnceCell<T>` 在运行时而不是在编译时执行借用规则

## 堆智能指针 `Box<T>`

通常数据都是存储在栈中。Box 指针可将数据存储到堆中。

- 数据较大时，又不想在转移所有权时进行数据拷贝
- 类型大小在编译期无法确定，但又需要固定大小的类型时
- 当你需要一个数据，但你只关心它的类型实现了
  指定的特型（Trait），而不是具体类型

## 引用计数智能指针 `Rc<T>`

在 Rust 中一个数据同一时间只能存在一个所有者，
但 Rc 可以让数据同时拥有多个所有者。

Rc 循环引用时会生成数据永不会释放，这种情况下就可以
使用 Weak 打破循环引用。如树结构父节点可以使用 Rc
强引用子节点，而子节点可以使用 Weak 弱引用父节点

## 共享可变容器指针 `Cell<T>\RefCell<T>\OnceCell<T>`

Rust 中一个重要的设计模式-内部可变性（Interior mutability）
允许你在数据存在多个不可变引用时可以修改数据

Cell 和 RefCell 功能上一毛一样，
唯一区别是 `Cell<T>` 只适用于 T 实现了 Copy 的情况

RefCell 可以让借用规则检查从编译时转移到运行时。
即使数据有多个不可变引用，你依然可以修改数据。
这个检查并不能绕过，苍天饶过谁，如果有错运行时就会 panic。

OncelCell 某种程序上是 Cell 和 RefCell 和集合体，作用于值
只能被初始化一次就不能再改动，意味着保存的值不需要移动或复制
（不同于 Cell）同时不需要运行时检查（不同于 RefCell）。

- Cell 用于实现 Copy 的数据类型 RefCell 用于引用数据类型
- RefCell 适用于编译期误报或一个引用被多次使用、修改以至于
  难于管理借用关系时

## 使用总结

- Rc 让数据可以拥有多个所有者，Box\RefCell 只能有一个所有者
- Box 可变不可变借用检查在编译期，Rc 编译期只检测不可变借用，
  RefCell 可变不可变借用检查都在运行时
- 由于 RefCell 允许运行时借用检查，所以可以修改 RefCell 的内部值

| 单线程       | 多线程       |
| ------------ | ------------ |
| Rc/Weak      | Arc/Weak     |
| Cell/RefCell | Mutex/RwLock |
| OnceCell     | OncelLock    |