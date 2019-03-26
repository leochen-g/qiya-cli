
## qiya
一个可以一键生成前后端项目的脚手架工具
## 奇犽名字来源
日本著名动漫《全职猎人》中的男二号，出身在巴托奇亚共和国里位于海拔三千多公尺的枯枯戮山上的杀手揍敌客家族。因为特别喜欢这个人物，富坚老贼把他的角色刻画的相当深刻，遇事冷静，对朋友（小杰）简直是真爱啊，另外他的能力也是很强的，所以用了这个名字来作为我的工具名称，希望这个工具能够披荆斩棘，随开随用
## 安装

    npm install qiya-cli -g

or

    git clone https://github.com/gengchen528/qiya-cli.git
    cd qiya-cli && npm install
    npm link
## 使用
打开终端输入 `qiya` 或者 `qiya -h`,你会看到如下输出

    Usage: qiya <commander>

    Options:
    -V, --version  output the version number
    -h, --help     output usage information

    Commands:
    add|a          添加一个模版
    list|l         模版列表
    init|i         生成项目文件
    delete|d       删除一个模版
## 命令说明
### add | a
添加自定义模版到templates.json中（git中存在的仓库）
```
$ qiya add
? 设置你的模版名称: qiya-expressjinqu
? 设置你的模版名称: qiya-express
? Git仓库位置：仓库拥有者/仓库名  例：gengchen528/qiya-cli-express-template gengchen528/qiya-cli
? 所属分支:（默认master） master
┌──────────────────┬───────────────────────────────────────┬────────┐
│ Template Name    │ Owner/Name                            │ Branch │
├──────────────────┼───────────────────────────────────────┼────────┤
│ qiya-express-cli │ gengchen528/qiya-cli-express-template │ master │
├──────────────────┼───────────────────────────────────────┼────────┤
│ qiya-express     │ gengchen528/qiya-cli                  │ master │
└──────────────────┴───────────────────────────────────────┴────────┘
✔ 新的模版已经添加成功!
```

### list | l
查看`qiya`中已经设置的模版列表
```
$ qiya list
┌──────────────────┬───────────────────────────────────────┬────────┐
│ Template Name    │ Owner/Name                            │ Branch │
├──────────────────┼───────────────────────────────────────┼────────┤
│ qiya-express-cli │ gengchen528/qiya-cli-express-template │ master │
├──────────────────┼───────────────────────────────────────┼────────┤
│ qiya-express     │ gengchen528/qiya-cli                  │ master │
└──────────────────┴───────────────────────────────────────┴────────┘
```

### init | i
当已经添加模版后，可以使用指定模版，去初始化一个你自己的项目
```
$ qiya init
? 你要使用的模版名称:（默认：qiya-express-cli） qiya-express-cli
? 你的项目名称: qiya_example
? 你的项目介绍: qiya_example的介绍
? 作者: Leo_chen
? 项目存放的目录:（默认当前目录） ./
⠸ 模版下载中，请稍等...新的项目已经初始化成功!
 新的项目已经初始化成功!

```
这样一个新的项目就生成成功了，是不是很方便

### delete | d
删除一个模版
```
$ qiya delete
你要删除模版的名称: qiya-express
┌──────────────────┬───────────────────────────────────────┬────────┐
│ Template Name    │ Owner/Name                            │ Branch │
├──────────────────┼───────────────────────────────────────┼────────┤
│ qiya-express-cli │ gengchen528/qiya-cli-express-template │ master │
└──────────────────┴───────────────────────────────────────┴────────┘
✔ 模版已成功删除!
```
这样一个新的项目就生成成功了，是不是很方便

### 已添加模版

目前已经添加基于express的纯后端服务模版`qiya-express-cli`，此模版详情介绍见[qiya-cli-express-template](https://github.com/gengchen528/qiya-cli-express-template)，后期将会支持更多开箱即用的模版


# License
MIT.