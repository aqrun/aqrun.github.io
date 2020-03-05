# @ngrx/store

受Redux启发，RxJS为Angular应用程序提供状态管理

@ngrx/store是一个受控的状态容器，旨在帮助在Angular上编写高性能，一致的应用程序。 核心原则:

- 状态是一个单一的不可变的数据结构
- Actions 描述状态更改
- 称为 reducer 的纯函数使用先前的状态和下一个action来计算新状态
- State 用 `Store` 访问的状态，可观察的状态和action的观察者

这些核心原则支持构建可使用“OnPush”更改检测策略的组件，从而在整个应用程序为您提供[智能，高性能的更改检测](http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html#smarter-change-detection)。


### 安装

通过npm安装 @ngrx/store:

```shell
npm install @ngrx/soter --save 
# or
yarn add @ngrx/store
```

### 测试版本

```shell
npm install github:ngrx/store-builds
# or
yarn add github:ngrx/store-builds
```

### 配置

为您的应用程序中的每种数据类型创建一个Reducer函数。 这些reducer的组合将成为你的应用状态：

```ts
import { Action } from '@ngrx/store';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

export function counterReducer(state: number = 0, action: Action) {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    case RESET: 
      return 0;
    default: 
      return state;
  }
}

```

To register the state container within your application, import the reducers and use the `StoreModule.forRoot`
function in the `imports` array of the `@NgModule` decorator for your `AppModule`.

要在您的应用程序中注册状态容器，请导入reducer并使用`StoreModule.forRoot`
函数在'AppModule`的`@NgModule`装饰器的`imports`数组中。

```ts
import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({ count: counterReducer })
  ]
})
export class AppModule {}
```

然后，您可以将`Store`服务注入您的组件和服务中。 使用`select`运算符来选择状态切片：

```ts
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { INCREMENT, DECREMENT, RESET } from './counter';

interface AppState {
  count: number;
}

@Component({
  selector: 'my-app',
  template: `
    <button (click)="increment()">Increment</button>
    <div>Current Count: {{ count$ | async }}</div>
    <button (click)="decrement()">Decrement</button>

    <button (click)="reset()">Reset Counter</button>
  `
})
export class MyAppComponent {
  count$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.count$ = store.pipe(select('count'));
  }

  increment(){
    this.store.dispatch({ type: INCREMENT });
  }

  decrement(){
    this.store.dispatch({ type: DECREMENT });
  }

  reset(){
    this.store.dispatch({ type: RESET });
  }
}
```

## API Documentation
- [Action Reducers](./actions.md#action-reducers)
- [Injecting reducers](./api.md#injecting-reducers)
- [Meta-Reducers/Enhancers](./api.md#meta-reducers)
- [Injecting Meta-Reducers](./api.md#injecting-meta-reducers)
- [Providing initial state](./api.md#initial-state)
- [State composition through feature modules](./api.md#feature-module-state-composition)
- [State selectors](./selectors.md)
- [Testing](./testing.md)
- [Typed Actions](./actions.md#typed-actions)


### Additional Material
- [From Inactive to Reactive with ngrx](https://www.youtube.com/watch?v=cyaAhXHhxgk)
- [Reactive Angular 2 with ngrx (video)](https://youtu.be/mhA7zZ23Odw)
- [Comprehensive Introduction to @ngrx/store](https://gist.github.com/btroncone/a6e4347326749f938510)
- [@ngrx/store in 10 minutes (video)](https://egghead.io/lessons/angular-2-ngrx-store-in-10-minutes)
- [Build Redux Style Applications with Angular, RxJS, and @ngrx/store (video)](https://egghead.io/courses/building-a-time-machine-with-angular-2-and-rxjs)
