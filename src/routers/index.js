import {registerModel} from '../index'
import Layout from '../containers/Common/Layout'
import Index from '../containers/House/list'

export default{

    path: '/',
    /* 布局基页 */
    getComponent (nextState, cb) {
      registerModel(require('../models/common'));
      cb(null, Layout);
    },
    indexRoute: {
      getComponent (nextState, cb) {
        registerModel(require('../models/home'));
        cb(null, Index);

      }
    },
    // childRoutes: [
    //   require("./house"),
    //   // 无路由匹配的情况一定要放到最后，否则会拦截所有路由
    //   { path: '*', component: require('../containers/Common/404') }
    // ]
}

