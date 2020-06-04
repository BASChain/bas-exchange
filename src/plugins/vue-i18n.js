
import messages from '@/locale'

Vue.use(VueI18n)
export const i18n = new VueI18n({
  locale:'zh-CN',
  fallbackLocale:'zh-CN',
  messages,
});

export default {
  i18n,
}
