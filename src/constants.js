// import Storage from './utils/Storage';
//
// export const API_DOMAIN = 'http://123.57.245.43/duanzu/api/web/v1/';
// export const FRONTEND_DOMAIN = 'http://app.ttouch.com.cn/duanzu/frontend/web/';
// export const REQ_TIME = '1480576266';
// export const REQ_TOKEN = 'c92114bcc9e4454f1d2b7399dc9d62a9';
// export const REQ_AUTH_TOKEN = Storage.get('authToken') == null ? '' : Storage.get('authToken');
// export const PAGE_SIZE = 3;

import Storage from './utils/Storage';

export const API_DOMAIN = 'http://app.ttouch.com.cn/txh/api/web/v1/';
export const FRONTEND_DOMAIN = 'http://app.ttouch.com.cn/txh/frontend/web/';
export const IMAGE_STATICURL = 'http://app.ttouch.com.cn/txh/storage/web/source/';
export const IMAGE_STATICURL_180 = 'http://app.ttouch.com.cn/txh/storage/web/thumb180/';
export const IMAGE_STATICURL_420 = 'http://app.ttouch.com.cn/txh/storage/web/thumb420/';
export const REQ_TIME = '1480576266';
export const REQ_TOKEN = 'c92114bcc9e4454f1d2b7399dc9d62a9';

export const REQ_AUTH_TOKEN = Storage.get('txhweb-authToken') == null ? '' : Storage.get('txhweb-authToken');

export const PAGE_SIZE = 3;
