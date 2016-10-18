//details.js
import { when } from '../../utils/when.js'
Page({
  data: {
    title:'',
    content:'',
    huifu:'',
    when_:'',
    re:'',
    loading:true,
  },
  onLoad: function (options) {
    var oid=options.id;
    this.getInnerData(oid)
  },
  getInnerData:function(id){
    var This=this;
    //请求
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic/'+id+'?mdrender=false',
      success: function (res) {
        console.log(res.data.data);
        //根据返回的创建事件计算距今的时间
        [].forEach.call(res.data.data.replies,function(e,i){
          e.create_at_=when(e.create_at);
          e.content=e.content.replace(/\[([@\w.\/\-\_]+)\]\([\w.\/\-\_]+\)/g,'$1');
				})
        This.setData({
          title:res.data.data.title,
          content:res.data.data.content.replace(/\!\[[\w._\-\/]+\]\(([\w._\-\/]+)\)/g,'+<image src="$1"></image>+'),
          huifu:res.data.data.replies,
          loading:!This.data.loading,
          /*.replace(/\!\[[\w._\-\/]+\]\(([\w._\-\/]+)\)/g,"<image src='"+'$1'+"'></image>")*/
        });
      }
    });
  }
})
