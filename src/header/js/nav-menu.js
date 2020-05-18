import {translateI18n } from '@/locale/i18n-utils'
const topMenus = [
  {
    to: "home",
    name:"home.index",
    i18n: "HomeIndex"
  },
  {
    to:"apply",
    name: "apply.index",
    i18n:"ApplyIndex"
  },
  {
    to:"market",
    name: "market.index",
    i18n:"MarketIndex"
  },
  {
    to:"agent",
    name: "agent.index",
    i18n:"AgentIndex"
  },
  {
    to: "mail",
    name: "mail.layout",
    i18n: "MailRegist"
  },
  {
    to:"products",
    name:"download.products",
    i18n:"DownloadIndex",
    hidden:true
    // hasSub:true,
    // isAnchor:true,
    // children:[
    //   {
    //     to:"explorer",
    //     name:"download.explorer",
    //     i18n:"BrowserIndex",
    //     anchor:'dlExplorer'
    //   },
    //   {
    //     to: "extension",
    //     name: "download.extension",
    //     i18n: "ExtensionIndex",
    //     anchor: 'dlExtension'
    //   },
    //   {
    //     to: "wallet",
    //     name: "download.wallet",
    //     i18n: "WalletIndex",
    //     anchor: 'dlWallet'
    //   }
    // ]
  },
  {
    to: "appstore",
    name: "appstore.layout",
    i18n: "AppstoreIndex",
  },
  {
    to: "help",
    name:"help.layout",
    i18n: "HelpIndex"
  }
]

export const navMenus = translateI18n(topMenus)

export default {
  navMenus
}
