export function translateI18n(menus) {
  if(!menus || !menus.length)return menus
  return menus.map(nav =>{
    nav.i18n = `menu.${nav.i18n}`
    return nav
  })
}

export default {
  translateI18n
}
