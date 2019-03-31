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

    async guiji1Action() {
        this.assign("title", "单点轨迹") //给title赋值为 Hello

        let data = await this.model('guiji').where({name_id:1}).select();

        let guiji1data = [];

        

        for(var i=0;i<data.length;i++)
        {
            // console.log(data[i]['coords'])
            // console.log("bdpoi:",data[i]['loc']['coordinates']);
            guiji1data.push({
                NameId:data[i]['name_id'],
                coords:data[i]['coords']
            });

        }
        return this.json(guiji1data);
    }

    async guiji2Action() {
        this.assign("title", "多点轨迹") //给title赋值为 Hello

        let data = await this.model('guiji').limit(50).select();

        let guiji2data = [];

        for(var i=0;i<data.length;i++)
        {
            if(data[i]['coords'].length != 0)
            {
                guiji2data.push({
                    NameId:data[i]['name_id'],
                    coords:data[i]['coords']
                });
            }
            else  console.log(data[i]['name_id'],'为空') ;

        }
        return this.json(guiji2data);
    }

    async comguijiAction() {
        this.assign("title", "压缩轨迹") //给title赋值为 Hello

        let data = await this.model('compression').limit(50).select();

        let comgjdata = [];
        let tem = [];
       
        for(var i=0;i<data.length;i++)
        {
            if(data[i]['yasuoData'].length != 0)
            {
                for(var j=0;j<data[i]['yasuoData'].length;j++){
                    tem.push([data[i]['yasuoData'][j][0].toFixed(6),data[i]['yasuoData'][j][1].toFixed(6)])
                    if(j>45){
                        break;
                    }
                }
                comgjdata.push({
                    coords:tem
                });
                tem=[];
            }
            else  console.log(data[i]['name_id'],'为空') ;

        }

        // console.log(JSON.stringify(comgjdata))
        return this.json(comgjdata);
    }

    async stoppointAction() {
        this.assign("title", "停留点") //给title赋值为 Hello

        let data = await this.model('stoppoint').limit(200).select();

        let spointdata = [];

        for(var i=0;i<data.length;i++)
        {
            if(data[i]['zhixin'].length != 0)
            {
                for(var j=0;j<data[i]['zhixin'].length;j++){
                    spointdata.push({
                        name:data[i]['name_id']+'_'+data[i]['zhixin'][j]['cu_id'],
                        value:[data[i]['zhixin'][j]['cu_zhixin'][0][1].toFixed(6),data[i]['zhixin'][j]['cu_zhixin'][0][0].toFixed(6),data[i]['zhixin'][j]['cu_count']]
                    });
                }
                
            }
            else  console.log(data[i]['name_id'],'为空') ;

        }
        // console.log(spointdata)
        return this.json(spointdata);
    }

    async newhotpointAction() {
        this.assign("title", "热门出行站点") //给title赋值为 Hello

        let data = await this.model('stoppoint').where({name_id:{'>':100}}).limit(200).select();

        let spointdata = [];
        let tem = 0;
        for(var i=0;i<data.length;i++)
        {
            if(data[i]['zhixin'].length != 0)
            {
                for(var j=0;j<data[i]['zhixin'].length;j++){

                    tem = data[i]['zhixin'][j]['cu_count'];
                    if(tem>1400){
                        break;
                    }else{
                        spointdata.push({
                            name:data[i]['name_id']+'_'+data[i]['zhixin'][j]['cu_id'],
                            value:[data[i]['zhixin'][j]['cu_zhixin'][0][1].toFixed(6),data[i]['zhixin'][j]['cu_zhixin'][0][0].toFixed(6),data[i]['zhixin'][j]['cu_count']]
                        });
                    }
               
                }
                
            }
            else  console.log(data[i]['name_id'],'为空') ;

        }
        // console.log(spointdata)
        return this.json(spointdata);
    }

    async hotjiaotongAction() {
        this.assign("title", "区域热力分析") //给title赋值为 Hello

        var time_s='';
        var time_f='';
        let hotdata = []

        for(var k=7;k<20;k++){
            if(k<10){
                time_s = '2016-6-30 0'+k+':00:00' ;
                if(k<9){
                    time_f = '2016-6-30 0'+(k+1)+':00:00'
                }else{
                    time_f = '2016-6-30 '+(k+1)+':00:00'
                }
                  
            }else{
                time_s = '2016-6-30 '+k+':00:00' ;
                time_f = '2016-6-30 '+(k+1)+':00:00'  
            }
            console.log(time_s,time_f)
            hotdata.push(await this.model('taxi2').where({time:{'>':time_s,'<':time_f}}).select())
        }

        let data = [];
        let tem = [];
        let tem_coord = [];

        for(var x=0;x<hotdata.length;x++){
            // console.log(hotdata[x].length)
            for(var i=0;i<hotdata[x].length;i++){
                tem_coord = hotdata[x][i]['loc']['coordinates'];
                if(tem_coord.length != 0){
                    // tem.push(tem_coord)
                    tem.push([parseFloat(tem_coord[0].toFixed(6)),parseFloat(tem_coord[1].toFixed(6)),(Math.random()*200+1)])
                }
            }
            data.push(tem)
            tem=[]
        }
        console.log(data.length)
        console.log(data)
       
        return this.json(data)
    }

    async newroadhotAction() {
        this.assign("title", "道路热力分析") 

        let hotdata = []

        for(var k=1;k<10;k++){
            
            hotdata.push(await this.model('taxi2').where({name:k+''}).select())
        }

        let data = [];
        let tem_coord = [];

        for(var x=0;x<hotdata.length;x++){
            // console.log(hotdata[x].length)
            for(var i=0;i<hotdata[x].length;i++){
                tem_coord = hotdata[x][i]['loc']['coordinates'];
                if(tem_coord.length != 0){
                    // tem.push(tem_coord)
                    data.push([parseFloat(tem_coord[0].toFixed(6)),parseFloat(tem_coord[1].toFixed(6)),1])
                }
            }
        }
        // console.log(data)
       
        return this.json(data);
    }

    danguijiAction() {
        //auto render template file index_index.html
        this.assign("title", "单点轨迹")
        return this.display();
    }
    duoguijiAction() {
        //auto render template file index_index.html
        this.assign("title", "多点轨迹")
        return this.display();
    }
    yasuoguijiAction() {
        //auto render template file index_index.html
        this.assign("title", "压缩轨迹") 
        return this.display();
    }
    spointAction() {
        //auto render template file index_index.html
        this.assign("title", "停留点识别") 
        return this.display();
    }
    newhotsiteAction() {
        //auto render template file index_index.html
        this.assign("title", "热门出行站点") 
        return this.display();
    }
    hotfenxiAction() {
        //auto render template file index_index.html
        this.assign("title", "区域热力分析") 
        return this.display();
    }
    newroadheatAction() {
        //auto render template file index_index.html
        this.assign("title", "道路热力分析") 
        return this.display();
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
