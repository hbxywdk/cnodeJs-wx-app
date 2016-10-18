//index.js
import { when } from '../../utils/when.js'

Page({
  data: {
    _type_:'all',
    list: [],
    page_:1,
    
  },
  onLoad: function () {
    this.getData();
  },
  //获取数据
  getData:function(add){
    var This=this;
    var url='';
    var page;
    if(This.data._type_==='all'){
      url='https://cnodejs.org/api/v1/topics';
    }else{
      url='https://cnodejs.org/api/v1/topics?tab='+This.data._type_;
      //console.log(url)
    }
    if(!add){
      This.setData({
        list:[]
      });
      page=1;
    }else{
      This.setData({
        page_:++This.data.page_
      });
      page=This.data.page_;
    }

    //发起请求
    wx.request({
      url: url,
      data: {
        'page': page ,
        'limit': 20
      },
      method:'GET',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(data) {
        //根据返回的创建事件计算距今的时间
        [].forEach.call(data.data.data,function(e,i){
          e.create_at_=when(e.create_at)
				})

        //console.log(data.data.data)
        This.setData({
          list:This.data.list.concat(data.data.data)
        });
      },
      fail:function(){
        console.error('获取数据失败');
      }
    })
  },
  //查看详情
  seeInner:function(e){
    var id=e.currentTarget.id;
    console.log(id);
    wx.navigateTo({
      url: '../details/details?id='+id
    })
  },
  //加载更多
  more:function(){
    this.getData(true);
  },
  //刷新
  refresh:function(){
    this.getData();
  },
  //文章类型切换
  changeType:function(e){
    var _type_=e.currentTarget.id;
    console.log(_type_);
    this.setData({
      page_:1,
      _type_:_type_
    });
    this.getData();
  }




})
