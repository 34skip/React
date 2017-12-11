import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLogger from 'redux-logger';
import { Toast } from 'antd-mobile';
import './index.css';

const cached = [];

// 1. Initialize
// const app = dva({
//
//   // history: browserHistory,
//   onAction: createLogger(),
//   onError(e) {
//     console.log(e.message);
//   },
// });
const app = dva({
  history: browserHistory,
  onAction: createLogger(),
  onError(e) {
    // alert(1)
    console.log(e.message)
    if (e.message === "Cannot read property 'length' of undefined") {
      // Toast.offline('登录失败');
    }else{
      console.error(e);
      Toast.offline(e.message || '网络连接失败');
      // Storage.remove('txhweb-authToken');
      // location.reload()
    }
  },
});
// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');


export function registerModel(model) {

  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}
