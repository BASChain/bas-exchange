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
    to:"help.issue",
    i18n:"GetBasMailGuide"
  },
  {
    desc:"Help Center",
    to:"help.issue",
    i18n:"JoinBasMinerGuide"
  },
  {
    desc:"Help Center",
    to:"help.dmail",
    i18n:"GetMailAccountGuide",
    activeId:"GetBMailAccount"
  },
  {
    desc: "Help Center",
    to: "help.dmail",
    i18n: "JoinBMailMinerGuide",
    activeId: "JoinBMailMiner"
  },
  {
    desc:"Help Center",
    to:"help.issue",
    i18n:"HelpCenterIndex"
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
