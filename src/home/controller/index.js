'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
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

        let data = await this.model('tmp_o_mc_10').where({time:{'>':'2016-09-01 19:00:00','<':'2016-09-01 23:59:59'}}).limit(50000).select();
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

        let data = await this.model('tmp_o_mc_10').where({time:{'>':'2016-09-01 00:00:00','<':'2016-09-01 06:00:00'}}).limit(50000).select();
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

        let data = await this.model('tmp_o_mc_10').where({time:{'>':'2016-09-01 09:00:00','<':'2016-09-01 18:00:00'}}).limit(50000).select();
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
