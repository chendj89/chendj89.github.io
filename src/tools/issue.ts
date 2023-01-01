class IssueApp {
  //   readonly auth: string;
  constructor() {
    // this.auth = auth;
  }
  async request(url: string, params: any) {
    let [method, partUrl] = url.split(' ');
    let link = '';
    let base = 'https://api.github.com';
    if (partUrl.startsWith('http')) {
      link = partUrl;
    } else {
      for (let attr in params) {
        if (partUrl.includes(`${attr}`)) {
          partUrl = partUrl.replace(`{${attr}}`, params[attr]);
        }
      }
      link = base + partUrl;
    }
    let auth1 = 'ghp_WQIz0tllEx1BZ';
    let auth2 = '2wjMW0bIdfSNpxDuJ4XTkJp';
    const headers = {
      Authorization: `token ${auth1}${auth2}`,
    };
    params.headers = headers;
    params.cache = 'no-cache';

    params.method = method.trim().toUpperCase();
    return await fetch(link, params);
  }
}

export default IssueApp;
