export function translateI18n(menus) {
  if(!menus || !menus.length)return menus
  return menus.map(nav =>{
    if(nav.i18n){nav.i18n = `menu.${nav.i18n}`}
    if(nav.children){
      nav.children.map(subnav =>{
        if(subnav.i18n){
          subnav.i18n = `menu.${subnav.i18n}`
        }
        return subnav
      })

    }
    return nav
  })
}

export default {
  translateI18n
}
