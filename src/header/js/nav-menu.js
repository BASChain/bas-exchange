import {translateI18n } from '@/locale/i18n-utils'
const topMenus = [
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
  }
]

export const navMenus = translateI18n(topMenus)

export default {
  navMenus
}
