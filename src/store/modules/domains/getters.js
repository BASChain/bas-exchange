
const getters = {
  getLatestRootDomains:state => {
    return state.latestRootDomains && state.latestRootDomains.length ? state.latestRootDomains : null
  }
}

export default getters
