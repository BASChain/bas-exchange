# 我的域名资产 API

> getList
 Req Params 
 {
   wallet:'',//钱包地址
   index:0,//起始下标
   pageNumber:5,//一共取几条
 }

 response:{
   state:1,//0:没有数据,1有数据,如果是0 ,后没data 可以没有
   data:[
     {
       name:'0xeeeff....',//域名的bytes,
       expire:147500045,//过期时间
       openApplied:true/false ,//是否开发注册,对应合约中r_openToPublic
       ...
     },
     {
       name:'0xeeeff....',//域名的bytes,
       expire:147500045,//过期时间
       openApplied:true/false ,//是否开发注册,对应合约中r_openToPublic
       ...
     },
   ]
 }

 > 获取我的域名列表总条数的接口
 > getTotal

 返回总条数
 