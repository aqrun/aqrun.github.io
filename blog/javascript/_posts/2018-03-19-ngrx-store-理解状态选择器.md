---
layout: post
title: 'NgRx Store 理解状态选择器(state selectors)'
tags: angular ngrx state selectors
excerpt: '我们将通过学习如何在ngrx世界中思考异步操作来构建这种状态管理架构。 将从一些简单的示例开始，最终构建从 @Effects 中获取 Firebase 数据库中的数据'
---

> [原文链接：https://toddmotto.com/ngrx-store-understanding-state-selectors](https://toddmotto.com/ngrx-store-understanding-state-selectors)

选择器是纯函数，它将状态切片作为参数，并返回可传递给组件的一些状态数据。 为了更好地理解选择器是什么以及它们做什么，它有助于将ngrx状态看作数据结构 —— 一种可以序列化为JSON的树。 数据通过在reducer中组成状态添加到状态树中 - 这是最简单的部分。 现在为了从状态树中获取数据，我们必须遍历它来找到我们感兴趣的属性并返回它。 这可能会变得更加复杂，这也是选择器帮助我们的地方。

您可能已经看到正在使用store.select方法通过传递字符串值来从商店获取数据：

```ts
this.store.select('pizzas');
```

该字符串代表商店中状态切片的名称，我们可以预料此函数会返回与我们的比萨属性相对应的数据 - 可能是比萨饼数组。 但是，`store.select` 也可以传递一个函数，这个函数参数是一个状态切片返回状态的一个属性（您可能已经看到过）：

```ts
this.store.select(state => state.pizzas);
```

这两种方法都代表了选择器的概念 - 我们正在“选择”状态！

所以，当我们将ngrx/store作为一个数据库，而选择器就像SQL查询中的SELECT一样 - 它们给我们提供了我们想要的信息。 随着我们的状态树越来越深入，将状态从Store中获取数据变得越来越复杂。

我们可能会发现自己在组件中编写复杂的数据转换逻辑，以获得我们需要的东西 - 但我们不想这么做 - 而这正是选择器的作用。 就像数据库一样，我们可以通过组合选择器来完成数据转换，只需返回我们需要的数据。 我们将保持我们的组件精益和从store解耦。

## 目录

* 考虑数据结构
* 特征状态选择器
* 状态切片选择器
* 总结

## 考虑数据结构

首先让我们将这种状态概念可视化为NGRX上下文无关的数据结构。 我们创建一个具有状态属性和一些初始值的JavaScript类Store：

```ts
class Store {
    constructor(){
        this.state = {
            products: {
                pizzas: {
                    entities: {
                        1: {name: 'Pizza 1', id: 1},
                        2: {name: 'Pizza 2', id: 2}
                    }
                }
            }
        }
    }
}
```

让我们密切关注 `状态state` 的结构。 `状态`对象只是一个常规的JavaScript对象，它具有嵌套的属性定义。 一个对象属性包装另一个对象属性等，创建一个层次结构或“树”，状态充当根。 遍历完整的`状态`树看起来像这样，如果我们想要获取我们的`entities`：

```
state
    ->products
        ->pizzas
            ->entities
```

为了获得一个特定的属性，我们必须遍历树。 例如，我们建立自己的方式到`entities`来建立一个链条，每一层级往下连接我们从state到entities。 如果我们错过了链条中的任何链接，它就会中断也就无法创建连接。 该链中的每个链接代表对应状态属性的引用。 因此，我们需要一个`products`的引用，然后是`pizzas`引用，最后引用到`entities`。 到了这，我们就可以访问`entities`所拥有的数据。

“引用某个属性”的含义是什么？ 为了说明这个概念，我们将创建一个Store类的实例，并展示我们可以访问状态对象属性的不同方式：

```ts
const store = new Store();
```

现在，store是另一个包含状态属性的JavaScript对象。 因此，其中一种方式我们可以通过熟悉的点符号来访问层级属性链。 现在让我们使用这种方法来获取我们的实体：

```ts
const entities = store.state.products.pizzas.entities;
```

这个方法确实很简单，但是当我们需要到达所需的属性时，我们会发现自己一遍又一遍地输入这个链。 对于可重用逻辑来说，这不是最有效的方法，而且对于深层属性引用也很容易出错 - 如果某些东西未定义，它就会崩掉。

那么，如果我们能够为链中的每个环节创建快捷方式呢？ 我们可以分开创建返回`products`、`pizzas`和`entities`的的函数：

```ts
const getProducts = state => state.products;
const getPizzas = state => state.pizzas;
const getEntities = state => state.entities;
```

注意这些功能是多么方便。 以`getEntities`为例，该函数的目的给它传参某个`state`并从该`state`中提取并返回`entities`属性。 看起来好像我们直接访问`entities`属性或直接访问该层级。 我们可以将此函数称为“状态快捷方式”，但我想将其称为状态选择器函数（state slector function）。

这里缺少的是如何直接将`state`传递给`getEntities`选择器，而不直接使用store.state - 否则，我们将再次依赖点表示法。 解决方案？ 我们将一个`select`方法添加到我们的`Store`类中，然后传递`state`对象到需要的选择器函数：

```ts
class Store {
    select(fn) {
        return fn(this.state);
    }
}
```

我们的`select`方法需要一个回调函数参数然后传递状态作为参数时调用它。 使用这种方法获取`entities`，我们可以按照逻辑的方式在整个选择器中传递状态，每次传递都会使我们下降到状态树的某个层级，直到遇到`entities`：

```ts
const getProducts = state => state.products;
const getPizzas = state => state.pizzas;
const getEntities = state => state.entities;

const entities = store.select( state => {
    const products = getProducts(state);
    const pizzas = getPizzas(products);
    const entities = getEntities(pizzas);
    return entities;
})
```

正如我们前面所示，首先我们得到`products`。 一旦我们有`products`，我们就可以得到`pizzas`通过它再取得`entities`。 这个方法很好、很容易、当然也可以工作，但是我们可以更进一步，通过使用函数组合来创建一个可以传递给`select`的单个回调来进行声明和实现：

```ts
const getProducts = state => state.products;
const getPizzas = state => state.pizzas;
const getEntities = state => state.entities;

const entities$ = store.select(state => 
    getEntities(getPizzas(getProducts(state)))
)
```

函数组合是当你通过相互嵌入函数返回单个结果时：内部函数的返回值成为最外层函数的参数，依此类推。 在这里，我们正在编写我们的选择器用来返回`entities`值。

我们已经看到，选择器函数是一个纯函数，它允许我们直接访问状态树遍历的值。 我们使用选择器来避免手动遍历状态树，反过来，我们为状态管理提供了强大的声明式函数编程。 现在选择器的概念已经很清楚了，让我们来看看为什么理解它非常重要对于掌握NGRX选择器。 我们继续，看看和这个相同的数据结构在NGRx中是什么样的。

## 特征状态选择器 Feature state selector

我们在NGRX中的store初始化为根状态 - 我们状态树的顶层。 由于我们的应用程序保持良好结构且模块化，因此我们将在状态树中创建更多条目。 我们通过使用特征模块（feature module）使我们的Angular应用程序保持模块化，NGRX也为此提供支持！ 一旦我们懒惰加载的Angular模块被实例化 - 它将自身添加到我们的根Angular应用程序中 - 而NGRX Store（和Effects也是如此！）也是如此。 这意味着一旦我们懒加载一个也有管理状态的Angular模块，它也会自动绑定到我们的根状态。

添加此行为非常方便简单 - 我们通过导入`StoreModule`并调用`.forFeature()`来将任何功能状态注册到功能模块中：

```ts
StoreModule.forFeature('products', reducers);
```

`.forFeature`的第一个参数包含一个表示特征状态名称的字符串，第二个参数提供了我们管理该特征状态的`reducer`。 使用`ngrx/store`提供的便捷函数`createFeatureSelector`创建功能状态的状态选择器时，功能名称起着至关重要的作用。

`createFeatureSelector`允许我们简单地通过它的特征名称来获取状态树的顶级特征状态属性：

```ts
export const getProductsState = createFeatureSelector<ProductsState>('products');
```

那么`createFeatureSelector`在这里发生了什么？ 首先，我们传递一个字符串，表示用于在特征模块中注册特征状态的名称。 它使用此字符串从根状态对象内查找功能状态，例如`state['products']`。

然后它返回一个类型化的选择器函数，该函数将返回对该特定状态切片的引用。

因此，`createFeatureSelector`返回一个选择器函数，该函数查找并返回指定的特征状态。 传递给它的泛型类型是我们从选择器函数获得的特征状态的类型。 在这种情况下，选择器将返回类型为`ProductState`的特征状态。 我们的`ProductState`将由各种reducer管理，马上我们会查看。

现在我们可以通过`getProductsState`轻松访问产品状态切片，我们可以在我们的组件中使用它，如下所示：

```ts
this.store
    .select(fromStore.getProductState)
    .map(state => state.pizzas)
    .map(pizzas => pizza.entities);
```