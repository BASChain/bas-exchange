import {translateI18n } from '@/locale/i18n-utils'
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
    to:"user.layout",
    i18n:"WhatBasIndex"
  },
  {
    to:"home.index",
    i18n:"UsedBasIndex"
  }
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
  },
  {
    desc:"Help Center",
    to:"help.issue",
    i18n:"HelpCenterIndex"
  }
])

export const navMenusGroupC = translateI18n([
  {
    to:"extension.index",
    i18n:"ExtensionIndex"
  },
  {
    to:"browser.index",
    i18n:"BrowserIndex"
  }
])

export default {
  navMenusGroupA,
  navMenusGroupB,
  navMenusGroupC
}
