import { Component, OnInit, ElementRef } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'epons-user-messages',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
    private baseUri: string = 'http://api.sadfm.co.za';
    // private baseUri: string = 'http://localhost:4484';

    public user: any = {};
  
    constructor(private http: Http, private el: ElementRef) {
  
    }
  
    public ngOnInit(): void {
      const id = this.el.nativeElement.getAttribute('userId');
      this.load(id);
    }
  
    private load(id: string): void {
  
      this.get(`/api/User/FindById/${id}`).map((x) => {
        const json: any = x.json();
        return json;
      }).subscribe((json) => {
        this.user = json;
      });
    }
  
    protected post(uri: string, obj: any): Observable<Response> {
      const headers = new Headers();
      headers.append('apikey', '2c0d64c1-d002-45f2-9dc4-784c24e996');
  
      const jwtToken = localStorage.getItem('jwt.token');
  
      if (jwtToken !== null || jwtToken === '') {
        headers.append('Authorization', 'Bearer ' + jwtToken);
      }
  
      return this.http.post(`${this.baseUri}${uri}`, obj, {
        headers,
      });
    }
  
    protected get(uri: string): Observable<Response> {
      const headers = new Headers();
      headers.append('apikey', '2c0d64c1-d002-45f2-9dc4-784c24e996');
  
      const jwtToken = localStorage.getItem('jwt.token');
  
      if (jwtToken !== null || jwtToken === '') {
        headers.append('Authorization', 'Bearer ' + jwtToken);
      }
  
      return this.http.get(`${this.baseUri}${uri}`, {
        headers,
      });
    }
  }
