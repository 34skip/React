/**
 * Created by zhouchao on 17/1/5.
 */
import { post } from '../utils/Request';

export async function getSignPackage({url}) {

  return post('index/wei-xin-sign-package', {url: url});

}

export async function getOpenid({ code, uid }) {
  return post('user/wei-xin-login', { code, uid });
}
