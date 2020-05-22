import {translateI18n } from '@/locale/i18n-utils'
import { getDownloadAppsPath } from '@/bizlib/apps'

export const navMenusGroupA = translateI18n([
  {
    to:"home.index",
    i18n:"HomeIndex"
  },
  {
    to:"market.index",
    i18n:"MarketIndex"
  },
  {
    to:"apply.index",
    i18n:"ApplyIndex"
  },
  {
    to:"mail.regist",
    i18n:"MailRegist"
  },
  {
    to: "agent.index",
    i18n: "AgentIndex"
  },
  {
    to: "appstore.index",
    i18n: "AppstoreIndex"
  },
])

export const navMenusGroupB = translateI18n([
  {
    desc:"Help Center",
    to:"home.index",
    i18n:"BuyerIndex"
  },
  {
    desc:"Help Center",
    to:"apply.index",
    i18n:"SellIndex"
  },
  {
    desc:"Help Center",
    to:"help.buyer",
    i18n:"BuyerGuideIndex"
  },
  {
    desc:"Help Center",
    to:"help.seller",
    i18n:"SellGuideIndex"
  }
])


export const navMenusGroupC = translateI18n([
  {
    desc: "Help Center",
    to: "help.issue",
    i18n: "HelpCenterIndex"
  },
  {
    to: "products",
    i18n:"ExtensionIndex",
    href:'',
    target:'self'
  },
  {
    to:"browser.index",
    i18n:"BrowserIndex",
  }
])

export default {
  navMenusGroupA,
  navMenusGroupB,
  navMenusGroupC
}
