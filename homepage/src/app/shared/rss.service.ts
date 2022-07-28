import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feed } from './feed';

import { map, catchError } from 'rxjs/operators';
import { http_retry } from './http-retry-operator';

@Injectable()
export class RssService {

    private _headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    constructor(private _http: HttpClient) {
        this._headers = this._headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        this._headers = this._headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        this._headers = this._headers.append('Access-Control-Allow-Origin', '*');
        this._headers = this._headers.append('Accept', 'text/xml');
        this._headers = this._headers.append('Content-Type', 'text/xml');
    }

    getFeed(url: string, count: Number): Observable<Feed[]> {
        return this._http.get(url, { headers: this._headers, responseType: 'text' as 'text' })
            .pipe(
                map((data: string) => {
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(data, 'text/xml');
                    //xml.getElementsByTagName('item')[0].getElementsByTagName('title')[0].textContent

                    let results: Feed[] = [];
                    let items = xml.getElementsByTagName('item');
                    let itemCount: number = 0;
                    while (itemCount < count) {
                        var title: string | null = '';
                        var description: string | null = '';
                        var link: string | null = '';

                        var titleElement = items[itemCount].getElementsByTagName('title');
                        if (titleElement.length > 0) {
                            title = titleElement[0].textContent;
                        }
                        var descriptionElement = items[itemCount].getElementsByTagName('description');
                        if (descriptionElement.length > 0) {
                            description = descriptionElement[0].textContent;
                        }
                        var linkElement = items[itemCount].getElementsByTagName('link');
                        if (linkElement.length > 0) {
                            link = linkElement[0].textContent;
                        }

                        results.push(new Feed(title == null ? '' : title, description == null ? '' : description, link == null ? '' : link));

                        itemCount++;
                    }

                    /*
                    const feedAsJson = this._ngxXml2jsonService.xmlToJson(xml);
                    let results = feedAsJson['rss']["channel"]["item"].map(({title, description, link}) =>
                        {
                            let tempFeed : Feed = new Feed(title,description,link);
                            return tempFeed;
                        });
                    */

                    return results;
                })
            );
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
    }
}
