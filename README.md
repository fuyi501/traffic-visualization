
Application created by [ThinkJS](http://www.thinkjs.org)

> 上一篇中介绍了 thinkjs 操作 mysql 数据库的方法，并进行了前端展示，现在来看一下 thinkjs 如何操作 mongodb 数据库

## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```

## node 版本

```
v6.9.4
```

## 准备数据库

首先在 mongodb 中创建一个数据库 `school`，然后新建一个集合 `student`，插入一些数据，数据如下所示：

![enter description here][1]

有了 mongodb 数据库后就该配置 thinkjs 和使用 thinkjs 操作 mongodb 了。

## thinkjs 配置 mongodb

在 thinkjs 中配置 mongodb ，非常的简单，打开 `src/common/config/db.js`，默认配置如下：

```js
export default {
  type: 'mongo',
  adapter: {
    mongo: {
      host: '127.0.0.1',
      port: '27017',
      database: 'school',
      user: '',
      password: '',
      prefix: '',
      encoding: 'utf8'
    }
  }
};
```
因为没有使用用户权限，所以这里不需要填写用户和密码。

更详细的内容请参考 [thinkjs官网 MongoDB](https://thinkjs.org/zh-cn/doc/2.2/model_mongodb.html)

## 操作 mongodb

我们还是只需要 操作控制器和视图就可以了。

修改 `src/home/controller/index.js` 中的 indexAction 方法，这个 indexAction 就是一个操作，这个方法就是用来处理 index 页面的，在这个方法中使用 `this.model('数据库下集合的名字')`就可以连接数据库了。

注意：indexAction 方法默认是不带 `async` 参数的，这是为了配合 方法中的 await 使用的，将 nodejs 的并行执行改为 串行执行。

下面我们来尝试一下：

```js
async indexAction(){
    //auto render template file index_index.html
    this.assign("title","Hello Thinkjs") //给title赋值为 Hello Thinkjs

    let stu = await this.model('student').select();

    console.log("stu:",stu);

    return this.display();
  }
```

刷新页面，输出：

```bash
stu: [ { _id: 1, sage: 10, sname: 'xiao 1' },
  { _id: 2, sage: 20, sname: 'xiao 2' },
  { _id: 3, sage: 30, sname: 'xiao 3' },
  { _id: 4, sage: 40, sname: 'xiao 4' },
  { _id: 5, sage: 50, sname: 'xiao 5' },
  { _id: 6, sage: 60, sname: 'xiao 6' } ]
```

可以看出来 ，返回值是一个 json 数据，连接数据库已经成功了。

有了 json 数据，我们需要将他传递到前端页面，在前端页面上展示这些数据，这个和上一篇文章中的 title 的赋值是一样的。我们使用 `this.assign()` 方法，将 json 数据传递到前端页面，如下：

```js
async indexAction(){
    //auto render template file index_index.html
    this.assign("title","Hello Thinkjs") //给title赋值为 Hello Thinkjs

    let stu = await this.model('student').select();

    console.log("stu:",stu);

    this.assign("stu_infos",stu)

    return this.display();
  }
```

## 前端展示 mongodb 数据

上面说 通过使用 `this.assign("stu_info",stu)` 方法，讲返回的 stu 数据赋值给 stu_info 并传递到了前端页面，那到底有没有呢？

下面我们配合 `nunjucks` 模板引擎，在前端把刚刚查询到的 mongodb 数据库中的数据展示出来。

打开 `view/home/index_index.html` ，我们删掉一些不用的，使其看起来简单一些，如下：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>New ThinkJS Application</title>
<style>
*{padding: 0;margin: 0;font-size: 16px;line-height: 20px;font-family: arial;}
a, a:visited{color:#337ab7;text-decoration: none;}
header{padding: 70px 0 70px 0;background-color: #4A6495}
h1{font-size: 36px;color:#fff;font-weight: normal;}
h3{font-size: 26px;color:#fff;font-weight: normal;margin-top: 40px;}
code{  padding: 2px 4px;font-size: 90%;color: #c7254e;background-color: #f9f2f4;border-radius: 4px;}
.content{width: 1000px;margin: auto}
.wrap{width: 1000px;margin: auto}
.content{margin-top: 80px;}
.list{width: 800px;}
.list .item{position: relative;padding-left: 70px;margin-top: 50px;}
.list .item .step{position: absolute;width: 36px;height: 36px;top:-3px;left:0;border: 5px solid #4A6495;border-radius: 23px;text-align: center;line-height: 36px;}
.list .item h2{font-size: 24px;font-weight: normal;}
.list .item p{line-height: 30px;margin-top: 10px}
</style>
</head>
<body>
  <header>
    <div class="wrap">
      <h1>A New App Created By ThinkJS</h1>
      <h3>{{ title }}</h3>
    </div>
  </header>
  <div class="content">
    <div class="list">
      <div class="item">
        <div class="step">1</div>

      </div>

    </div>
  </div>
</body>
</html>
```

下面我们来使用 `nunjucks` 模板引擎 ，关键代码如下，其他代码不变。

``` html

  <div class="content">
    <div class="list">
      {% for stu in stu_infos %}
      <div class="item">

       <div class="step"> {{ stu._id }} </div>
        <p>
          名字：{{ stu.sname }}  ， 年龄：{{ stu.sage }}
        </p>

      </div>
      {% endfor %}
    </div>
  </div>

```

刷新页面，展示如下：

![enter description here][2]

查询出来的 6 条数据全部展示出来了，到这里 thinkjs 操作 mongodb 数据库的所有步骤就结束了。


[1]: http://images.fuyix.cn/mongodb%E6%95%B0%E6%8D%AE.png "mongodb数据"
[2]: http://images.fuyix.cn/thinkjs-mongodb-%E5%89%8D%E7%AB%AF%E5%B1%95%E7%A4%BA.png "thinkjs-mongodb-前端展示"
