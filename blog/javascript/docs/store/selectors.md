# Selectors

选择器是用于获取store状态切片的方法。 @ngrx/store提供了一些帮助函数来优化这个选择。

当使用 `createSelector` 和 `createFeatureSelector` 函数时@ngrx/store会跟踪调用选择器函数的最新参数。 因为选择器是[纯函数](https://en.wikipedia.org/wiki/Pure_function)，所以当参数匹配时可以返回最后的结果，而不用重新调用选择器函数。 这可以提供性能优势，特别是执行昂贵计算的选择器。 这种做法被称为[记忆化memoization](https://en.wikipedia.org/wiki/Memoization)。

## createSelector

`createSelector`方法返回一个回调函数来选择一个状态切片。

### 示例

```ts
//reducers.ts
import { createSelector } from '@ngrx/store';

export interface FeatureState {
  counter: number;
}

export interface AppState {
  feature: featureState;
}

export const selectFeature = (state: AppState) => state.feature;
export const selectFeatureCount = createSelector(
  selectFeature,
  (state: FeatureState) => state.counter
);
```


### 对多个状态使用选择器

`createSelector`可以用来从状态中选择一些数据，这些数据是基于相同状态的几个切片。

`createSelector`函数最多可以使用8个选择器函数来进行更完整的状态选择。

例如，假设你在状态中有一个`selectedUser`对象。 你还有一个`allBooks`书籍对象数组。

并且您想要显示当前用户的所有书籍。

你可以使用`createSelector`来实现这一点。 即使您在“allBooks”中更新它们，您的可见图书也会始终保持最新状态，并且如果选择了一个，它们将始终显示属于您的用户的图书，并在没有用户选择时显示所有图书。

结果将只是你的状态的一部分被状态的另一部分过滤。 它会始终保持最新状态。

```ts
//reducers.ts
import { createSelector } from '@ngrx/store';

export interface User {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  userId: number;
  name: string;
}

export interface AppState {
  selectedUser: User;
  allBooks: Book[];
}

export const selectUser = (state: AppState) => state.selectedUser;
export const selectAllBooks = (state: AppState) => state.allBooks;

export const selectVisibleBooks = createSelector(
  selectUser,
  selectAllBooks,
  (selecteduser: User, allBooks: Books[]) => {
    if ( selectedUser && allBooks ) {
      return allBooks.filter( (book:Book) => book.userId === selectedUser.id);
    } else {
      return allBooks;
    }
  }
)

```

## createFeatureSelector

`createFeatureSelector`是返回顶级特征状态的一种方便的方法。 它为状态的特征切片返回一个类型化的选择器函数。

### 示例

```ts
// reducers.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface FeatureState {
  counter: number;
}

export interface AppState {
  feature: FeatureState
}

export const selectFeature = createFeatureSelector<FeatureState>('feature');
export const selectFeatureCount = createSelector(
  selectFeature,
  (state: FeatureState) => state.counter 
);
```

## Reset Memoized Selector 重置记忆选择器

The selector function returned by calling `createSelector` or `createFeatureSelector` initially has a memoized value of `null`. After a selector is invoked the first time its memoized value is stored in memory. If the selector is subsequently invoked with the same arguments it will return the memoized value. If the selector is then invoked with different arguments it will recompute, and update its memoized value. Consider the following:

```ts
import { createSelector } from '@ngrx/store';

export interface State {
  counter1: number;
  counter2: number;
}

export const selectCounter1 = (state: State) => state.counter1;
export const selectCounter2 = (state: State) => state.counter2;
export const selectTotal = createSelector(
  selectCounter1,
  selectCounter2,
  (counter1, counter2) => counter1 + counter2
); // selectTotal has a memoized value of null, because it has not yet been invoked.

let state = { counter1: 3, counter2: 4 };

selectTotal(state); // computes the sum of 3 & 4, returning 7. selectTotal now has a memoized value of 7
selectTotal(state); // does not compute the sum of 3 & 4. selectTotal instead returns the memoized value of 7

state = { ...state, counter2: 5 };

selectTotal(state); // computes the sum of 3 & 5, returning 8. selectTotal now has a memoized value of 8

```
A selector's memoized value stays in memory indefinitely. If the memoized value is, for example, a large dataset that is no longer needed it's possible to reset the memoized value to null so that the large dataset can be removed from memory. This can be accomplished by invoking the `release` method on the selector.
```ts
selectTotal(state); // returns the memoized value of 8
selectTotal.release() // memoized value of selectTotal is now null
```
Releasing a selector also recursively releases any ancestor selectors. Consider the following:
```ts
export interface State {
  evenNums: number[];
  oddNums: number[];
}

export const selectSumEvenNums = createSelector(
  (state: State) => state.evenNums,
  (evenNums) => evenNums.reduce((prev, curr) => prev + curr)
);
export const selectSumOddNums = createSelector(
  (state: State) => state.oddNums,
  (oddNums) => oddNums.reduce((prev, curr) => prev + curr)
);
export const selectTotal = createSelector(
  selectSumEvenNums,
  selectSumOddNums,
  (evenSum, oddSum) => evenSum + oddSum
);

selectTotal({
  evenNums: [2, 4],
  oddNums: [1, 3]
});

/**
 * Memoized Values before calling selectTotal.release()
 *   selectSumEvenNums  6
 *   selectSumOddNums   4
 *   selectTotal        10
 */

selectTotal.release();

/**
 * Memoized Values after calling selectTotal.release()
 *   selectSumEvenNums  null
 *   selectSumOddNums   null
 *   selectTotal        null
 */
```

## Using a Selector with the Store

The functions returned by the `createSelector` and `createFeatureSelector` methods become alternatives to the string syntax for retrieving the relevant piece of state.

### Example

```ts
// app.component.ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import * as fromRoot from './reducers';

@Component({
  selector: 'my-app',
  template: `
    <div>Current Count: {{ counter | async }}</div>
  `
})
class MyAppComponent {
  counter: Observable<number>;

  constructor(private store: Store<fromRoot.AppState>){
    this.counter = store.pipe(select(fromRoot.selectFeatureCount));
  }
}
```
