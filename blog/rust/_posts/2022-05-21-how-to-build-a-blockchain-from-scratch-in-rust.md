# 如何使用 Rust 从头构建一个区块链

> https://coinsbench.com/how-to-build-a-blockchain-from-scratch-in-rust-9cedb59f8897

2021年对加密货币、NFT和去中心化应用程序(DAPPs)来说是重要的一年，2022年将更重要。区块链是所有这些技术背后的底层技术。

区块链技术有潜力改变我们生活的几乎每一个方面，包括金融行业、旅游和出行、基础设施、医疗保健、公共部门、零售、农业和采矿、教育、通信、娱乐等。

> 世界上每个我崇拜的聪明人都有一个原因。他们明白这是第四次工业革命的驱动力:蒸汽机、电力，然后是微芯片——第四次是区块链和加密货币。 —— 布洛克 皮尔斯（Brock Pierce）

## 什么是区块链？

区块链是跨点对点网络的去中心化交易账本，您也可以将区块链看作是不可变的去中心化数据库。一个区块链可以从根本上分解为几个组件，如节点、交易、区块、链和共识协议(工作证明、权益证明、历史证明)。

如果你像我一样，喜欢通过实战来学习。那么本文通过使用Rust构建一个区块链，会让你对区块链如何工作的有个基本概念。

听起来还不错是吧？那让我们开始吧。

## 现在开始

让我们从创建一个新的Rust项目开始：

```shell
cargo +nightly new blockchain
```

然后切换到你刚创建的目录中：

```shell
cd blockchain
```

然后为构建区块链添加必要的依赖包：

```toml
[dependencies]
chrono = "0.4"
serde = { version = "1.0.106", features = ["derive"] }
serde_json = "1.0"
sha2 = "0.10.0"
```

下一步，创建 models 目录来保存你的区块链的大部分逻辑。目录中添加两个文件 `blockchain.rs` 和 `block.rs`。

两个文件中都引入下面的依赖包并保存他们：

```rust
// Blockchain.rs
use chrono::prelude::*;
// internal module
use super::block::Block;
```

```rust
// Block.rs
use super::blockchain::Blockchain;
use chrono::prelude::*;
use sha2::{Sha256, Digest};
use serde::{Deserialize, Serialize};
```

可能你已经注意到在 `blockchain.rs` 文件中引入了 `use super::block::Block;`， 这里我们只是引入了 `block.rs` 文件中的结构体，不用担心后面我会解释。

在引入必要的依赖包之后，让我们在 `blockchain.rs` 文件中定义一个 `Blocks` 类型:

```rust
type Blocks = Vec<Block>;
```

下一步，在 `blockchain.rs` 中创建 `Blockchain` 类型，并添加一个空的实现：

```rust
// Blockchain 代表区块链的结构体
#[derive(Debug)]
pub struct Blockchain {
    // 添加到链中的第一个区块
    pub genesis_block: Block,
    // 存储区块
    pub chain: Blocks,
    // 验证一个区块需要的最小工作量
    pub difficulty: usize,
}

impl Blockchain {}
```

下一步， 在 `block.rs` 文件中定义 `Block` 类型，并添加空的实现：

```rust
// Block 代表区块链中的区块结构体
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Block {
    // 保存的当前区块的索引
    pub index: u64,
    // 当前区块的创建时间
    pub timeStamp: u64,
    // 区块的工作证明
    pub proof_of_work: u64,
    // 前一个区块哈希
    pub previous_hash: String,
    // 当前区块哈希
    pub hash: String
}

impl Block {}
```

## 创建创世区块

创世区块是区块链中创建的第一个区块。接下来创建一个函数可以为我们的区块链生成一个创世区块，并返回一个新的 `Blockchain` 类型。

在 `blockchain.rs` 中添加我位的 `Blockchain` 实现，代码如下：

```rust
imple Blockchain {
    pub fn new(difficulty: usize) -> Self {
        // 链中的第一个块
        let mut_genesis_block = Block {
            index: 0,
            timestamp: Utc::now().timestamp_millis() as u64,
            proof_of_work: u64::default(),
            previous_hash: String::default(),
            hash: String::default()
        };
        // 从创世链开始创建链
        let mut chain = Vec::new();
        chain.push(genesis_block.clone());
  
  // 创建一个区块链实例
        let blockchain = Blockchain {
            genesis_block,
            chain,
            difficulty
        };
        blockchain
    }
}
```

上面的代码主要实现了这些功能：

* 创建我位的 `genesis_block` 实例
* 
