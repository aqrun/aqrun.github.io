# Emacs 编辑器配置 Rust 开发环境

> https://robert.kra.hn/posts/2021-02-07_rust-with-emacs/

![demo](https://assets.oicnp.com/pic/demo.png)

过去的两年时间 Emacs 对 Rust 支持有了很大的提升。本文主要配置 Emacs 开发环境，功能如下：

* 源代码导航（跳转到实现、引用列表、模块大纲）
* 代码补全
* 代码片段
* 错误和警告行内高亮
* 代码修复和重构
* 自动导入定义（如特性）
* rustfmt 代码格式化
* 构建和运行其它 cargo 命令

本配置基于 [rust-analyzer](https://rust-analyzer.github.io/)，这是一个处于活跃开发状态并使 VS Code 支持 Rust 的 LSP 服务。

本文可以做为参考或直接去 [Github 仓库](https://github.com/rksm/emacs-rust-config) 获取源码直接运行（如下）。已测试可行的环境：Emacs 27.1、rust stable 1.49.0、macOS 11.1、Ubuntu 18.4、Win10。

对于想了解 Emacs-racer 的相关配置可以查看 [David Crook 的指南](https://github.crookster.org/my-emacs-rust-language-config/)。

内容目录：

* 快速开始
* 前置需求
	* Rust
	* rust-analyzer
	* Emacs
* Rust Eamcs 详细配置
  * rustic
  * lsp-mode 和 lsp-ui-mode
  * 代码导航跳转
  * 代码操作
  * 代码补全和片段
  * 行内错误
  * 行内类型提示
  * 附加包
* Debug 调试
* 感谢

## 快速开始

如果你已经安装了 Rust 和 Emacs 那可以直接快速开始而不用对现有配置做任何修改。可以使用如下命令在启动 Emacs 时加载[rksm/emacs-rust-config github 仓库](https://github.com/rksm/emacs-rust-config) 的 `standalone.el` 配置文件：

```shell
git clone https://github.com/rksm/emacs-rust-config
emacs -q --load ./emacs-rust-config/standalone.el
```

此命令会在启动 Emacs 时使用检出仓库的目录的 `.emacs.d` 路径（以及不同的 elpa 文件夹）。意味着不会使用和修改你原有的 `$HOME/.emacs.d`。如果你不确定或是很清楚这里描述的内容，这种方式都是最简单的配置。

所有的依赖都会在第一次启动时被安装，也就是第一次启动会多花些时间。

Windows 系统可以在快捷方式中添加这些参数启动 Emacs。如果是 macOS 并且安装的是 Emacs.app 则需要使用如下命令行：

```shell
/Applications//Emacs.app/Contents/MacOS/Emacs -q --load ./emacs-rust-config/standalone.el
```

## 先决条件

开始配置 Emacs 前，请确保你的系统已经安装了下面这些软件：

### Rust

安装 Rust 工具链及 cargo，这些使用 [rustup](https://rustup.rs/) 很容易安装。安装稳定版的 rust 并确保 `.cargo/bin` 已经添加到环境变量，rustup 可以默认完成这些操作。rust-analyzer 依赖 Rust 源码，可以运行命令 `rustup component add rust-src` 进行安装。

### rust-analyzer

需要 rust-analyzer 服务的二进制包。可以参考 [rust-analyzer 手册](https://rust-analyzer.github.io/manual.html#rust-analyzer-language-server-binary)进行安装，有预编译好的二进制包。然而，由于 rust-analyzer 开发非常活跃，我通常是下载 github 仓库源码再自行编译。这种方式更便于升级版本（可能也需要降级）。

```shell
$ git clone https://github.com/rust-analyzer/rust-analyzer.git
$ cd rust-analyzer
$ cargo xtask install --server # 会安装 rust-analyzer 到 $HOME/.cargo/bin 目录
```

经常会发生新版不能正常运行的问题。这种情况我建议查看 [rust-analyzer 改动日志](https://rust-analyzer.github.io/thisweek)，日志包含链接到每周更新的 git 提交。如果不能正常运行，可以试着构建早一些的版本，或许可以成功。写本文时（2021.11.15）我用的是[7366833](https://github.com/rust-analyzer/rust-analyzer/commit/73668334f05c3446b04116ccc3156240d2d8ab19)，这个版本在 稳定版Rust 1.56.1 以及 Ubuntu、MacOS和Windows系统都工作正常。

### Emacs

我测试过可以配置的版本是 Emacs 27.1。Mac上我通常使用 [emacsformacosx](https://emacsformacosx.com/)。Windows 上我使用 “附近的 GNU 镜像”链接为 [gnu.org/software/emacs](https://www.gnu.org/software/emacs/download.html)。在Ubuntu需要[添加第三方 apt 仓库](https://ubuntuhandbook.org/index.php/2020/09/install-emacs-27-1-ppa-ubuntu-20-04/)。注意此配置在较老的emacs 版本也可以工作，但 Emacs 27 在 JSON 解析方面有实质性的改进大大提高了 LSP 客户端的速度。

注意，我使用 [use-package](https://github.com/jwiegley/use-package) 作为 Emacs 的包管理器。它将自动安装这个配置的独立版本。否则可以在你的 `init.el` 添加如下片段：

```lisp
(unless (package-installed-p 'use-package)
	(package-refresh-contents)
	(package-install 'use-package))
```

## Rust Emacs 详细配置

用到的模式有：

* rustic
* lsp-mode
* company
* yasnippet
* flycheck

### Rustic



### lsp-mode and lsp-ui-mode

### Code Navigation

### Code Actions


### Code completion and snippets

### Inline errors

### Inline type hints

## Debugging

## Additional packages

## 感谢这些包的开发者们!

最后要说声谢谢！感谢所有本文中提到的开源软件的开发和维护者们。Rust-analyzer 项目是令人惊叹的，它极大的改善了 Rust Emacs 工具状态。当然也离不开非常有用的 lsp-mode 和 lsp-ui。rustic 简化了 rust-mode 模式相关的必要配置，并增加了非常有用的特性。在其它语言 company 和 flycheck 是我的默认配置。当然还要感谢所有 Emacs 的维护人员以及我忘记的参与其中的所有人！

---

1. [Racer](https://github.com/racer-rust/emacs-racer) 曾经是配置 Emacs IDE特性（代码导航等）的最佳选择。它是比 RLS 和 rust-analyzer 都快的非 LSP 解决方案。然而有很多有关代码补全的特性已经不如 rust-analyzer 了。
2. Emacs 也通过 [GUD](https://www.gnu.org/software/emacs/manual/html_node/emacs/GDB-Graphical-Interface.html) 内置了对 gdb 的支持， 但需要直接控制 gdb 进程。DAP 更类似于 LSP，因为它用于远程控制调试过程，使编辑器更容易集成它。



