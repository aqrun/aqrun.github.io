---
layout: post
title: 'angular2 中 ngrx-effetcts 基础和 ngrx-store 异步中间件'
description: '我们将通过学习如何在ngrx世界中思考异步操作来构建这种状态管理架构。 将从一些简单的示例开始，最终构建从 @Effects 中获取 Firebase 数据库中的数据'

taxonomies:
  categories: ["frontend", "article"]
  tags: ["angular"]
---

> [原文链接：https://medium.com/@flashMasterJim/the-basics-of-ngrx-effects-effect-and-async-middleware-for-ngrx-store-in-angular-2-f25587493329](https://medium.com/@flashMasterJim/the-basics-of-ngrx-effects-effect-and-async-middleware-for-ngrx-store-in-angular-2-f25587493329)

## Angular 2 NgRx 系列2

如果您还没有阅读我的第一篇[关于使用 Ngrx/store 设置您的 angular 2 项目](http://www.wisdomofjim.com/blog/setting-up-ngrx-in-an-angular-2-project)的文章，那么您应该先看一下第一篇。 在这篇文章中，我们将通过学习如何在ngrx世界中思考异步操作来构建这种状态管理架构。 我们将从一些简单的示例开始，最终构建从@Effects中提取Firebase数据库中的数据。 让我们开始吧！ 

## 源码

使用ngrx/store 和 ngrx/effects完整的示例项目代码在这: [https://github.com/JimTheMan/Jims-Ngrx-Example](https://github.com/JimTheMan/Jims-Ngrx-Example)

## 为什么使用 @Effects?

在没有ngrx/effects的简单的ngrx/store项目中，真的没有什么好的地方可以进行异步调用。假设用户点击一个按钮或在输入框中键入内容，然后我们需要进行异步调用。木偶组件将首先从用户那里了解这个动作，并且它的处理程序将在按钮被实际单击时调用。然而，我们不希望把逻辑放在木偶组件中进行异步调用，因为我们想保持简单！木偶组件的处理程序中唯一的事情是 @Output 发射器向智能组件发出一个事件，告诉它该按钮已被点击。然后智能组件获取事件并触发处理函数，但我们不希望将异步登录逻辑放在那里，因为我们希望保持精简并且只需将操作抽象到我们的Store，以便 store 可以修改状态！好的...但 store 只处理 reducer 中的动作，reducer是纯粹的函数，所以我们应该在哪里逻辑地放置异步调用，以便我们可以将响应数据放入 store？答案，朋友，是@Effects！**您几乎可以将您的 Effects 视为特殊类型的Reducer函数，这些函数可以让您以异地调用的方式将返回的数据轻松插入应用程序的 store 内部状态**。

## 针对异步的单独服务

您可能会想：“如果您的智能组件只与另一个调用异步数据的服务进行通信，那么当该调用返回时，服务会将返回的数据作为有效负载分派给store？”，在某种程度上你是对的！ 在Angular 2中，服务只是一个带有@Injectable元数据的常规TypeScript类，在使用@Effects时，您可以制作一个单独的“Effetc 类”或“Effect 服务”，然后包含各种@Effect函数，每个函数对应一个动作 由您的ngrx store调度。

## 安装Ngrx/Effects

首先你需要能过npm安装@ngrx/effects：

```bash
npm isntall @ngrx/effects --save
# or
yarn add @ngrx/effects
```

## 添加 RunEffects 到你的 NgModule

接下来，你需要告诉你的应用程序你要使用 effetcs。 在NgModule的imports数组中添加一行，您可以调用`EffectsModule.run`。 传入您正在用作“effects类”（或类）的类（或类）。 当然你的NgModule文件可能在这个文件中有更多的代码，但是我已经将它简化为ngrx这里的东西：

```ts
import { StoreModule } from '@ngrx/store';
import { MainStoreReducer } from './state-management/reducers/main-store-reducer';
import { EffectsModule } from '@ngrx/effetcs';
import { MainEffects } from './state-management/effetcs/main-store-effects';

@NgModule({
    immports: [
        StoreModule.provideStore({mainStoreReducer}),
        EffectsModule.run(MainEffects),
    ]
})
export class AppModule {}

```

## 创建Effects类

这个类的名字应该和你在上面的NgModule步骤中引用的名字相同。 在它的核心，Effects类仅仅是一个Angular 2服务：

```ts
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MainEffects{
    
    constructor(
        private action$: Actions
    ){}
}
```

## Hello World @Effect

现在你已经完成了所有的设置，让我们开始写一些效果吧！

```ts
@Effect() 
update$ = this.action$
    .ofType('SUPER_SIMPLE_EFFECT')
    .switchMap( ()=> 
        Observable.of({ type: "SUPER_SIMPLE_EFFECT_HAS_FINISHED" })
    );
```

哇！不要被吓倒！我知道它一开始看起来很奇怪，但让我们来看看它。如果使用TypeScript元数据来标记我们的变量update$（$通常用作其值为可观察变量的变量的后缀）作为“ngrx Effect”，当我们向 store 派发动作时，会触发它（如向reducer发送action）。然后我们看到 `this.action$.ofType('SUPER_SIMPLE_EFFECT')` 。记住，我们将发送的事件转换为可观察对象，所以 `.ofType` 意味着你接受一个可观察事件，然后只有在它是这种类型时才返回可观察事件。然后我们做 `switchMap`，因为我们想从原始观察者“切换”到一个全新的观察者。你想从一个 ngrx/effect 返回的是一个动作的可观察部分，并且当它在屏幕上全部播放时，初始动作将从组件（或某个服务）分派。然后它会绕过 reducer 然后被 effect 处理。这个 effect 然后会将可观测值返回给某个动作，然后新动作将在 reducer 中处理。

## Payload  有效载荷示例

在下一个例子中，我们通过处理有效载荷来获得更多的乐趣。 我们即可以接受来自初始操作的有效载荷并返回一个有效载荷。 在下面的代码中，我们得到一个类型为“SEND_PAYLOAD_TO_EFFECT”的动作后，立即调用“map（toPayload）”。 因此，我们通过一个动作和一个有效载荷来观察一堆其他东西，然后我们返回一个只有有效载荷的Observable。 然后我们做一个switchMap，因为我们想切换到我们的observable响应，但我们仍然把这个payload作为 ourswitchMap 函数中的一个参数。 然后你可以看到，在一个非常 Redux-ish 模式下，我们有一个具有类型和有效载荷的对象。 有效载荷可以是基本上包含任何你想要的对象。 然后，我们将其作为可观察的对象返回，然后完成！

```ts
@Effect()
effectWithPayloadExample$ = this.action$
    .ofType('SEND_PAYLOAD_TO_EFFECT')
    .map(toPayload)
    .switchMap(payload => {
        console.log('the payload was' + payload.message);
        return Observable.of({ 
            type: 'PAYLOAD_EFFECT_RESPONDS',
            payload: { message: 'The effects say hi!' },
        });
    })

```

## 使用定时器的异步 effect

我们的下一个乐趣桶包含一个定时器。 这与您可能在JavaScript中看到过的“setTimeout”类似。 但是，我们希望此定时器返回可观察对象，因此我们将使用 `Observable.timer()` 。 请注意，我们正在将有效载荷作为定时器上设置的秒数。 要实现的关键是，在异步事件之后我们通常会有一个回调函数，现在我们只需关闭switchMap。 一旦定时器完成，然后我们返回一个可观察对象到到一个“TIMER_FINISHED” action，然后在 reducer 中处理。

```ts
@Effect()
timeEffect = this.action$
    .ofType('SET_TIMER')
    .map(toPayload)
    .switchMap(payload => 
        Observable.timer(payload.seconds * 1000)
            .switchMap( () => 
                Observable.of({type: 'TIMER_FINISHED'})
            )
    );
```

## 使用AngularFire2从Firebase获取数据

我个人喜欢使用Firebase。 这是来自Google的NoSQL数据库，具有超高性能和易用性。 AngularFire2库在这里特别适合，因为它允许你以某种方式查询你的数据库，并返回可观察的结果。 首先，确保安装了它：

```bash
npm i angularfire2 --save
```

## 异步Effect从Firebase获取数组

好的，让我们跳转到一个@Effect，它从Firebase中提取数据！ 所以我们得到一个动作，类型是PULL_ARRAY_FROM_FIREBASE ，然后我们通过switchMap来启动一个新的Observable。 这是我们的异步调用进来的地方！ 在这种情况下，我们使用的是Firebase实时数据库，而精巧的AngularFire2库为我们提供了一个非常好的API。 这里要实现的关键是在AngularFire2库中，`af.database.list` 返回一个Observable！ 您传递的字符串允许您获取到NoSQL JSON对象数据存储中，以将某个给定节点作为数组抽取。 接下来，我们`switchMap`到一个新的Observable，它是我们想要返回的那个。 然后，我们将一个Observable返回到一个类型为“GOT_FIREBASE_ARRAY”的动作，其中包含从Firebase返回的数组。

```ts
@Effect()
pullArrayFromFirebase$ = this.action$
    .ofType('PULL_ARRAY_FROM_FIREBASE')
    .switchMap( ()=> 
        this.af.database.list('/cypherapp/rooms/')
            .switchMap( result => 
                Observable.of({
                    type: 'GOT_FIREBASE_ARRAY',
                    payload: { pulledArray: result }
                })
            )
    );
```

## 异步 Effect 从Firebase获取对象

因此，现在我们知道如何从Firebase中将节点作为数组抽取出来，但是如果我们想将其作为常规JavaScript对象来抽取呢？ 那么，我们所需要做的就是把 `af.database.list` 改为 `af.database.object`，其余代码完全相同！

```ts
@Effect()
pullObjectFromFirebase$ = this.action$
    .ofType('PULL_OBJECT_FROM_FIREBASE')
    .switchMap( () => 
        this.af.database.object('/cypherapp/rooms/')
            .switchMap( result => 
                Observable.of({
                    type: 'GOT_FIREBASE_OBJECT',
                    payload: { pulledObject: result }
                })
            )
    );
```

## SwitchMap 仅仅需要一个函数

我们在这里使用了很多switchMaps，所以理解它背后的原力很重要。 以下是来自reactive.io [switchMap文档](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap)页面的屏幕截图：

![img](https://cdn.oicnp.com/images/js/rximg1.jpg)

看看这里的描述。 switchMap的第一个（也是唯一的）参数是一个函数，该函数应用于由源Observable发出的项目并返回Observable。 还值得注意的是，我们这里的胖箭头是lambda表达式匿名函数。 由于函数体observable，它只是一行，我们可以忽略大括号和return关键字。 例如，除了一些额外的日志记录之外，下面的代码与上面的代码片段相同：

```ts
@Effect()
pullObjectFromFirebase$ = $this.action$
    .ofType('PULL_OBJECT_FROM_FIREBASE')
    .switchMap( () => {
        console.log('in the first switch Map!');

        return this.af.database.object('/cpyherapp/rooms')
            .switchMap( result => {
                console.log('oh we got the result!');

                return Observable.of({
                    type: 'GOT_FIREBASE_OBJECT',
                    payload: { pulledObject: result },
                })
            })
    })
```

虽然前面的例子更加简洁，并且您可能会在某个时候重构这个例子，但直接在上面查看这个例子可能会帮助您理解代码中发生了什么。