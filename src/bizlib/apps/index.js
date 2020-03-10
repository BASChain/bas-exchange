export const ChromeExtensionStore ='https://chrome.google.com/webstore/detail/bas/jidkphhcnfbacegfgniknpgedbppmeoc?hl=zh-CN&authuser=1'
export const FirefoxExtensionStore = 'https://addons.mozilla.org/zh-CN/firefox/addon/bas/?src=search'
export const RelaDownloadBasePath = '/apps'

export const MacBrowserApp = 'Uranium.app.zip'
export const ExtChromeOffline = 'bas-v0.1.0-crx.zip'
export const ExtFirefoxOffline = 'bas-0.1.0-fx.xpi'

export function getExtensionStoreUrl(browser){
  return browser === 'chrome' ? ChromeExtensionStore : FirefoxExtensionStore
}

export function getDownloadAppsPath(subPath){
  return `${RelaDownloadBasePath}/${subPath}`
}

/**
 *
 * @param {*} browser
 */
export function getOfflineExtFile(browser){
  return browser === 'chrome' ?
    `${RelaDownloadBasePath}/${ExtChromeOffline}` : `${RelaDownloadBasePath}/${ExtFirefoxOffline}`
}

export default {
  MacBrowserApp,
  ChromeExtensionStore,
  FirefoxExtensionStore,
  RelaDownloadBasePath,
  getExtensionStoreUrl,
  getDownloadAppsPath,
}
