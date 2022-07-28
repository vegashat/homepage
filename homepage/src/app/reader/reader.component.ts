import { Component, OnInit, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { interval, timer, observable, Observable, Subject, Subscription } from 'rxjs';
import { tap, take, map } from 'rxjs/operators';
import { Feed } from '../shared/feed';
import { RssService } from '../shared/rss.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReaderComponent implements OnInit, OnDestroy {

  @Input('feedUrl') feedUrl: string = "";
  @Input('title') title: string = "";
  @Input('count') count: Number = 10;
  @Input('siteUrl') siteUrl: string = "";

  entries: Feed[] = [];
  private _interval: number = (60 * 5 * 1000);
  private _subscription: Subscription = new Subscription();
  private _subscribed: boolean = false;
  private _countdown: Subscription = new Subscription();
  remainingMin: number = 0;

  constructor(private _service: RssService) {
  }

  ngOnInit() {
    this.setInterval();
    this.getEntries();
  }

  getEntries(): void {

    if (this._subscribed) {
      this.unsubscribe();
      this.setInterval();
    }

    var observable = timer(0, this._interval);
    this._subscription = observable.subscribe(() => {
      this._service.getFeed(this.feedUrl, this.count)
        .subscribe(data => {
          this.entries = data;
          this.setInterval();
        })
    });
    this._subscribed = true;

    var int = interval(1000 * 60).pipe(
      map(() => {
        return --this.remainingMin;
      })
    );

    //TODO - Should be able to do this easier
    this._countdown = int.subscribe(() => {
    });

  }

  setInterval() {
    this.remainingMin = this._interval / 60 / 1000;
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  unsubscribe() {
    this._subscription.unsubscribe();
    this._countdown.unsubscribe();

  }
}