import {translateI18n } from '@/locale/i18n-utils'
const topMenus = [
  {
    to: "home.index",
    i18n: "HomeIndex"
  },
  {
    to:"apply.index",
    i18n:"ApplyIndex"
  },
  {
    to:"market.index",
    i18n:"MarketIndex"
  },
  {
    to:"agent.index",
    i18n:"AgentIndex"
  },
  {
    to:"download.index",
    i18n:"DownloadIndex"
  },
  {
    to: "help.layout",
    i18n: "HelpIndex"
  }
]

export const navMenus = translateI18n(topMenus)

export default {
  navMenus
}
