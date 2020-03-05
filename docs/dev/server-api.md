# 我的域名资产 API

## 获取总记录数

> Request
  
  示例
  path:'api/getDomainTotal/0xeB1eB91C6f9824af574D8273FA66e68F68fEEb72'

```json
{
  wallet:'0xeB1eB91C6f9824af574D8273FA66e68F68fEEb72'
}
```

> response 
返回数据示例

```json
{
  state:1,//0:没有数据,1有数据,如果是0 ,后没data 可以没有
  data:21,
}
```
 
## 获取我的域名资产列表

> Request

  示例
  path:'api/getDomainList/0xeB1eB91C6f9824af574D8273FA66e68F68fEEb72'
 
> 请求参数
```json
 {
   wallet:'',//钱包地址
   pageNumber:1,//当前页码,起始下标index = (pageNumber-1)*pageSize
   pageSize:5,//一共取几条
 }
 ```
> 返回数据格式 

Response

```json
{
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
     ...
   ]
 }
```


# 搜索接口
 path:'api/autocomplete/***'

## autocomplete 功能

> 请求参数
```json
{
  text:'s'
}
```
> 返回数据格式 

```json
{
  state:1,//
  data:[
    'sina',
    'sohu',
    'soooo',
    ....
  ]
}
```

