import { asyncRoutes, constantRoutes } from '@/router'
// import { getMenus } from '@/api/auth'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      console.log('##########################')
      console.log(roles)
      console.log('##########################')
      console.log(asyncRoutes)
      // let res = await getMenus()
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export const formatMenu = (data) => {
  const fmtRoutes = []
  data.forEach(router => {
    let { children } = router
    const { path, name, iconCls } = router
    if (children && children instanceof Array) {
      children = formatMenu(children)
    }
    const fmtRoute = {
      path: path,
      name: name,
      iconCls: iconCls,
      children: children
      // component() {
      //   import('../../views/' + {component} +'.vue')
      // }
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
