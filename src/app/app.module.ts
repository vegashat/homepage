import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';;
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReaderComponent } from './reader/reader.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MdePopoverModule } from '@material-extended/mde';
import { MatIconModule } from '@angular/material/icon';
import { RssService } from './shared/rss.service';

@NgModule({
  declarations: [
    AppComponent,
    ReaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MdePopoverModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [RssService],
  bootstrap: [AppComponent]
})
export class AppModule { }
