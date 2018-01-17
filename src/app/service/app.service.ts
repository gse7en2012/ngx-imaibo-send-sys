import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';


@Injectable()
export class AppService {

  constructor(private cookieService: CookieService, private http: Http) {

  }

  private serviceUrl = {
    'login': '/ydt/api/bps/user/signIn',
    'query':'/ydt/api/bps/quotaPrize/record',
    'details':'/ydt/api/bps/quotaPrize/detail',
    'remark':'/ydt/api/bps/quotaPrize/saveRemark',
    'award':'/ydt/api/bps/quotaPrize/confirm',

    'policyList':'/ydt/api/bps/policy/findPolicy',
    'policyLeader':'/ydt/api/bps/user/findLeader'

  };


  generateHttpGetSearchParams(opts?: object) {
    const params: URLSearchParams = new URLSearchParams();
    if (opts) {
      Object.keys(opts).forEach((key) => {
        if (opts[key]) params.set(key, opts[key].toString());
      });
    }
    return { search: params, }
  }

  generateHttpPostSearchParams(opts) {
    const headers = new Headers({
      'content-type': 'application/x-www-form-urlencoded'
    });
    const options = new RequestOptions({ headers: headers });
    const postData = Object.keys(opts).map((k)=>{
      return `${k}=${opts[k]}`;
    }).join('&');
    return {
      data:postData,
      opts:options
    }
  }


  gsevenRequestViaGet(target, opts) {
    const uri = this.serviceUrl[target];
    const param = this.generateHttpGetSearchParams(opts);
    return this.http.get(`${uri}`, { search: param.search }).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.statusCode === '200') {
          return data;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }
  gsevenRequestViaDelete(target, opts) {
    const uri = this.serviceUrl[target];
    const param = this.generateHttpGetSearchParams(opts);
    return this.http.delete(`${uri}`, { search: param.search }).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.statusCode === '200') {
          return data;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      }).catch(e => alert(e))
  }
  gsevenRequestViaPost(target, opts) {
    const postData = this.generateHttpPostSearchParams(opts);
    return this.http.post(this.serviceUrl[target], postData.data,postData.opts).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.statusCode === '200') {
          return data;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }
  gsevenRequestViaPut(target, opts) {
    const postData = this.generateHttpPostSearchParams(opts);
    return this.http.put(this.serviceUrl[target], postData).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.statusCode === '200') {
          return data;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      }).catch(e => alert(e))
  }


  accountLogin(user, pass) {
    return this.gsevenRequestViaPost('login', {
      username: user,
      password: pass
    })
  }

  checkIsLogin(){
    return this.cookieService.get('BPSUSERTOKEN')
  }

  saveRemark(id,remark){
    return this.gsevenRequestViaPost('remark',{
      id:id,
      remark:remark
    })
  }

  queryData(queryOpts){
    return this.gsevenRequestViaGet('query',queryOpts)
  }

  getSendDetails(id){
    return this.gsevenRequestViaGet('details',{id:id});
  }

  postExecuteAward(opts){
    return this.gsevenRequestViaPost('award',opts);
  }


  getPolicyList(opts){
    return this.gsevenRequestViaGet('policyList',opts)
  }


  getPolicyLeader(){
    return this.gsevenRequestViaGet('policyLeader',{})
    
  }
}
