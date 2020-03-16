export function transQueryDomain(ret){
  let result = {
    state:0,
    data:{},
    error:''
  }

  if(!ret)return result;
  if(ret.state){
    result.state = 1
    result.data = transData(ret.domainrecord)
    return result;
  }else{
    return result;
  }
}

function transData(record){
  let data = {}
  data.name = record.name
  data.expire = record.expire || 0
  data.owner = record.owner
  data.isRoot = record.isroot
  data.openApplied = record.ropentopublic
  data.isCustomed = record.riscustomed
  data.isPure = record.rispurea
  data.customPrice = record.rcustomeprice
  if(record.parentdomain){
    let top = record.parentdomain
    let topDomain = {
      name:top.name||'',
      owner:top.owner||'',
      expire:top.expire||'',
      isRoot:top.isroot||true,
      openApplied:top.ropentopublic||true,
      isCustomed:top.riscustomed,
      isPure:top.rispurea,
      customPrice:top.rcustomeprice
    }
    data.topDomain = topDomain
  }else {
    data.topDomain = {}
  }

  return data;
}


export default {
  transQueryDomain
}
