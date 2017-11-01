'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */

     async loginAction(){
      console.log('进来了')

      if (this.isPost()){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。

        let username = this.post('username');//获取用户名给username变量
        let password = this.post('password');

        let data = await this.model('user').where({username:username,password:password}).find();//到数据库中去查找看是否有数据（用户名密码同时相符）

        if (think.isEmpty(data)){//这里我直接用isEmpty居然不能用。查了下资料需要用think.isEmpty()
            return this.error(403,'账号密码错误！请重新填写');//登录不成功，返回错误信息。
        }else{
            this.session('userinfo',data);
            return this.redirect('index');//登录成功将用户信息写入session，返回到user首页。
        }
      }
      return this.display();

    }
    
    async indexAction() {
        this.assign("title", "首页") //给title赋值为 Hello

        return this.display();
    }
    echartsAction() {
        //auto render template file index_index.html
        this.assign("title", "图表") //给title赋值为 Hello
        return this.display();
    }
    graphAction() {
        //auto render template file index_index.html
        this.assign("title", "图表组合") //给title赋值为 Hello
        return this.display();
    }
    async lifeheatAction() {
        this.assign("title", "生活热力分析") //给title赋值为 Hello

        let data = await this.model('tmp_o_mc_10').where({time:{'>':'2016-09-01 00:00:00','<':'2016-09-01 00:26:59'}}).limit(50000).select();
        // console.log(data)

        let livedata = [];
        let senddata = [];

        for(var i=0;i<data.length;i++)
        {
          livedata.push({
            coord:[data[i]['loc']['coordinates'][0],data[i]['loc']['coordinates'][1]]
          });

        }
        senddata.push(livedata);
        // console.log(senddata);
        return this.json(senddata);
    }
    async liveheatAction() {
        this.assign("title", "居住热力分析") //给title赋值为 Hello

        let data = await this.model('tmp_o_mc_10').where({time:{'>':'2016-09-01 00:00:00','<':'2016-09-01 00:30:00'}}).limit(50000).select();
        // console.log(data)

        let livedata = [];
        let senddata = [];

        for(var i=0;i<data.length;i++)
        {
          livedata.push({
            coord:[data[i]['loc']['coordinates'][0],data[i]['loc']['coordinates'][1]]
          });

        }
        senddata.push(livedata);
        // console.log(senddata);
        return this.json(senddata);
    }
    async jobheatAction() {
        this.assign("title", "工作热力分析") //给title赋值为 Hello

        let data = await this.model('tmp_o_mc_10').where({time:{'>':'2016-09-01 00:10:00','<':'2016-09-01 00:30:00'}}).limit(50000).select();
        // console.log(data)

        let livedata = [];
        let senddata = [];

        for(var i=0;i<data.length;i++)
        {
          livedata.push({
            coord:[data[i]['loc']['coordinates'][0],data[i]['loc']['coordinates'][1]]
          });

        }
        senddata.push(livedata);
        // console.log(senddata);
        return this.json(senddata);
    }
    async renkouAction() {
        this.assign("title", "人口分布") //给title赋值为 Hello

        let data = await this.model('tmp_o_mc_10').limit(10000).select();

        return this.json(data);
    }

    async hotstopAction() {
        this.assign("title", "热门出行站点") //给title赋值为 Hello

        let data = await this.model('bdpoi').select();

        let stopdata = [];

        for(var i=0;i<data.length;i++)
        {
          // console.log("bdpoi:",data[i]['loc']['coordinates']);
          stopdata.push({
            stopName:data[i]['NAME'],
            jingdu:data[i]['loc']['coordinates'][0],
            weidu:data[i]['loc']['coordinates'][1]
          });

        }
        return this.json(stopdata);
    }

    homepageAction() {
        //auto render template file index_index.html
        this.assign("title", "首页") //给title赋值为 Hello
        return this.display();
    }
    liveheatmapAction() {
        //auto render template file index_index.html
        this.assign("title", "居住热力图") //给title赋值为 Hello
        return this.display();
    }
    jobheatmapAction() {
        //auto render template file index_index.html
        this.assign("title", "工作热力图") //给title赋值为 Hello
        return this.display();
    }
    lifeheatmapAction() {
        //auto render template file index_index.html
        this.assign("title", "生活热力图") //给title赋值为 Hello
        return this.display();
    }
    roadcongestionAction() {
        //auto render template file index_index.html
        this.assign("title", "路况分析")
        return this.display();
    }
    roadconditionAction() {
        //auto render template file index_index.html
        this.assign("title", "道路拥堵排行")
        return this.display();
    }
    hottravelsitesAction() {
        //auto render template file index_index.html
        this.assign("title", "热门出行站点")
        return this.display();
    }
}
