export default [
  //Home
  {
    path: "/home",
    name: "home.index",
    component: () => import("@/views/Home/Index.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/apply",
    name: "apply.index",
    component: () => import("@/views/Apply/Index.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/domain",
    name: "domain.layout",
    component: () => import("@/views/Domain/Layout.vue"),
    children: [
      {
        path: "applydomain",
        name: "domain.applydomain",
        component: () => import("@/views/Domain/apply/RegistDomain.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "applysub/:topText/:subText",
        name: "domain.applysub",
        component: () => import("@/views/Domain/apply/RegistSubDomain.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "applysub/:topText",
        name: "domain.applysub",
        component: () => import("@/views/Domain/apply/RegistSubDomain.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "applyresult",
        name: "domain.applyresult",
        component: () => import("@/views/Domain/apply/RegistResult.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "regist",
        name: "domain.regist",
        component: () => import("@/views/Domain/Regist.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "registsub",
        name: "domain.registsub",
        component: () => import("@/views/Domain/RegistSub.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "nregisting",
        name: "domain.newregisting",
        component: () => import("@/views/Domain/NewRegisting.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "ntregisting",
        name: "domain.newtopregisting",
        component: () => import("@/views/Domain/NewTopRegisting.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "registing",
        name: "domain.registing",
        component: () => import("@/views/Domain/Registing.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "detail/:id",
        name: "domain.detail",
        component: () => import("@/views/Domain/DetailInfo.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "settings/:domain",
        name: "domain.subsettings",
        component: () => import("@/views/Domain/SubDomainSettings.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "dnsupdate/:domain",
        name: "domain.dnsupdate",
        component: () => import("@/views/Domain/DnsUpdate.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "dnsupdate/:domain/:expire",
        name: "domain.dnsupdate",
        component: () => import("@/views/Domain/DnsUpdate.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "dnsupdate/:domain/:expire/:openApplied/:isCustomed/:price",
        name: "domain.dnsupdate",
        component: () => import("@/views/Domain/DnsUpdate.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "topcybersquatting",
        name: "domain.topcybersquatting",
        component: () => import("@/views/Domain/TopCybersquatting.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "subcybersquatting",
        name: "domain.subcybersquatting",
        component: () => import("@/views/Domain/SubCybersquatting.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "cybersquattingres",
        name: "domain.cybersquattingres",
        component: () => import("@/views/Domain/CybersquattingResult.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "updaterefdata/:domaintext",
        name: "domain.updaterefdata",
        component: () => import("@/views/RefData/UpdateRefData.vue"),
        meta: {
          auth: false
        }
      }
    ],
    meta: {
      guest: true
    }
  },
  {
    path: "/mail",
    name: "mail.layout",
    redirect: "/mail/regist",
    component: () => import("@/views/Mail/Layout.vue"),
    children: [
      {
        path: "regist",
        name: "mail.regist",
        component: () => import("@/views/Mail/MailRegistIndex.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "detail/:hash/:domaintext",
        name: "mail.detail",
        component: () => import("@/views/Mail/MailDetail.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "mailsvr/:domaintext",
        name: "mail.mailsvr",
        component: () => import("@/views/Mail/MailDomainDetail.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "registing/:domaintext/:years/:mailname",
        name: "mail.registing",
        component: () => import("@/views/Mail/MailRegisting.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "registing",
        name: "mail.registing",
        component: () => import("@/views/Mail/MailRegisting.vue"),
        meta: {
          guest: true
        }
      },
    ],
    meta: {
      guest: true
    }
  },
  {
    path: "/market",
    name: "market.layout",
    redirect: "/market/index",
    component: () => import("@/views/Market/Layout.vue"),
    children: [
      {
        path: "index",
        name: "market.index",
        component: () => import("@/views/Market/HomeIndex.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "search",
        name: "market.search",
        component: () => import("@/views/Market/search/Result.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "buying/:domaintext/:pricevol",
        name: "market.buying",
        component: () => import("@/views/Market/commit/BuyingDomain.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "bought",
        name: "market.bought",
        component: () => import("@/views/Market/commit/BoughtResult.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "index1",
        name: "market.index1",
        redirect: "/market/index/latest",
        component: () => import("@/views/Market/Index.vue"),
        meta: {
          guest: true
        },
        children: [
          {
            path: "latest",
            name: "market.index.latest",
            component: () => import("@/views/Market/LatestTransactions.vue"),
            meta: {
              guest: true
            }
          }
        ]
      }
    ],
    meta: {
      guest: true
    }
  },
  {
    path: "/agent",
    name: "agent.index",
    component: () => import("@/views/SuperAgent/Index.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/owner/:id",
    name: "owner.info",
    component: () => import("@/views/Domain/OwnerInfo.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/account",
    name: "account.index",
    component: () => import("@/views/Account/Index.vue"),
    meta: {
      // auth:true,
      guest: true
    }
  },
  {
    path: "/products",
    name: "download.products",
    component: () => import("@/views/Download/Products.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/products/:anchor",
    name: "download.products",
    component: () => import("@/views/Download/Products.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/appstore",
    name: "appstore.layout",
    component: () => import("@/views/AppStore/Layout.vue"),
    redirect: "/appstore/index",
    meta: {
      guest: true
    },
    children: [
      {
        path: "index",
        name: "appstore.index",
        component: () => import("@/views/AppStore/Index.vue"),
        meta: {
          guest: true
        }
      },
      {
        path:'appdetail',
        name:'appdetail.index',
        component:()=> import('@/views/AppStore/AppDetail.vue'),
        meta:{
          guest:true
        }
      }
    ]
  },
  {
    path: "/download",
    name: "download.layout",
    component: () => import("@/views/Download/Layout.vue"),
    redirect: "/download/explorer",
    meta: {
      guest: true
    },
    children: [
      {
        path: "index",
        name: "download.index",
        component: () => import("@/views/Download/Index.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "extension",
        name: "download.extension",
        component: () => import("@/views/Download/Extension.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "explorer",
        name: "download.explorer",
        component: () => import("@/views/Download/Explorer.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "wallet",
        name: "download.wallet",
        component: () => import("@/views/Download/Wallet.vue"),
        meta: {
          guest: true
        }
      }
    ]
  },
  {
    path: "/help",
    name: "help.layout",
    redirect: "/help/issue",
    component: () => import("@/views/Help/Layout.vue"),
    meta: {
      guest: true
    },
    children: [
      {
        path: "issue",
        name: "help.issue",
        component: () => import("@/views/Help/IssueNavigation.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "bmail",
        name: "help.dmail",
        component: () => import("@/views/Help/DomainMailNav.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "buyer",
        name: "help.buyer",
        component: () => import("@/views/Help/BuyerNavigation.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "seller",
        name: "help.seller",
        component: () => import("@/views/Help/SellerNavigation.vue"),
        meta: {
          guest: true
        }
      }
    ]
  },
  {
    path: "/wallet",
    name: "wallet.layout",
    redirect: "/wallet/index",
    component: () => import("@/views/Wallet/Layout.vue"),
    meta: {
      guest: true
    },
    children: [
      {
        path: "index",
        name: "wallet.index",
        component: () => import("@/views/Wallet/WalletIndex.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "transaction",
        name: "wallet.transaction",
        component: () => import("@/views/Wallet/Intransaction.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "income",
        name: "wallet.income",
        component: () => import("@/views/Wallet/DomainIncome.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "mailservers",
        name: "wallet.mailservers",
        component: () => import("@/views/Wallet/MailServers.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "maillist",
        name: "wallet.maillist",
        component: () => import("@/views/Wallet/MyMailList.vue"),
        meta: {
          guest: true
        }
      }
    ]
  },
  {
    path: "/breakdown",
    name: "breakdown.layout",
    redirect: "/breakdown/index",
    component: () => import("@/views/Breakdown/Layout.vue"),
    meta: {
      guest: true
    },
    children: [
      {
        path: "index",
        name: "breakdown.index",
        component: () => import("@/views/Breakdown/Index.vue"),
        meta: {
          guest: true
        }
      }
    ]
  },
  {
    path: "/income",
    name: "income.home",
    component: () => import("@/views/Income/HomeIndex.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/login",
    name: "login.index",
    component: () => import("@/views/Login/Index.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/*",
    redirect: "/home"
  }
]