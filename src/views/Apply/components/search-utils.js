export function handleTopDomainList(list,isSort) {
  if(!list || !list.length )return null
  if(isSort){
    list = list.sort()
  }
  let ret = list.map(it =>{
    return {
      name:it,
      text:`.${it}`
    }
  })

  return ret;
}

export default {
  handleTopDomainList
}
