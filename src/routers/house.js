import {registerModel} from '../index'
export default{

    path: 'house',
    indexRoute: {

      getComponent (nextState, cb) {

        cb(null, Layout);

        cb(null, Index);

      }
    },
    childRoutes: [
      {
        path:'list',
        getComponent (nextState, cb) {

          require.ensure([],(require) =>{
            cb(null, require('../containers/House/list'));
          },'List')
        }
      }
    ]
}

