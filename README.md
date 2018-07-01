### 后台管理系统:
还没有添加权限管理的功能，后续会加上。进入登录页面，如果不懂或者需要账号私聊我。。。
第一次使用iview-admin，感觉功能还是挺多的，还在摸索阶段，只用来实现简陋的功能，后续会持续优化。


![](https://user-gold-cdn.xitu.io/2018/7/1/164534495741f97e?w=600&h=426&f=gif&s=3022647)

在线查看:
[http://infinite.czero.cn/Infinite-webAdmin/dist](http://infinite.czero.cn/Infinite-webAdmin/dist)

功能:

1. 文章管理，图片上传到七牛云。
2. 编辑文章
3. 添加文章
4. 用户管理
5. 富文本内容添加


项目目录:

    ├── build (配置全局请求地址和跨域处理)
    │   ├── webpack.dev.config.js   (在这里配置请求跨域问题,及全局请求地址)
    ├── index.html
    ├── src
    │   ├── main.js
    │   ├── mixins  (公共js工具目录)
    │   │   └── common.js
    │   ├── router (路由配置)
    │   │   ├── index.js
    │   │   └── router.js
    │   └── views
    │       ├── Main.vue
    │       ├── error-page
    │       ├── home
    │       ├── login.less
    │       ├── login.vue
    │       ├── main-components (组件入口目录)
    │       ├── main-menu
    │               ├─── edit   (编辑)
    │               ├── hot     (热门)
    │               ├── recommend   (发现)
    │               ├── user    (用户管理)
    │       ├── main.less
    │       ├── message
    │       └── my-components


## 源码
前端源码: [https://github.com/czero1995/Infinite-webDesign.git](https://github.com/czero1995/Infinite-webDesign.git)

服务端源码：[https://github.com/czero1995/Infinite-webServer.git](https://github.com/czero1995/Infinite-webServer.git)

后台管理源码: [https://github.com/czero1995/Infinite-webAdmin.git](https://github.com/czero1995/Infinite-webAdmin.git)

# 使用说明

	#克隆项目
	git clone https://github.com/czero1995/Infinite-webAdmin.git](https://github.com/czero1995/Infinite-webAdmin.git
	
	# 安装依赖
	npm install
	
	# 本地开发环境
	npm run dev
	
	# 构建生产
	npm run build

# 注意
iview-admin生产环境打包需要修改配置，可参考这篇
[https://blog.csdn.net/qq_36040161/article/details/79615358](https://blog.csdn.net/qq_36040161/article/details/79615358)