// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  feeds:
    [
      { title: "Kinja Deals", siteUrl: "https://kinjadeals.theinventory.com/", feedUrl: "https://cors.vegashat.com/https://kinjadeals.theinventory.com/rss" },
      { title: "CNN", siteUrl: "https://www.cnn.com", feedUrl: "https://cors.vegashat.com/http://rss.cnn.com/rss/cnn_topstories.rss" },
      { title: "ESPN", siteUrl: "https://www.espn.com", feedUrl: "https://cors.vegashat.com/http://www.espn.com/espn/rss/news" },
      { title: "Engadget", siteUrl: "https://www.engadget.com", feedUrl: "https://cors.vegashat.com/https://www.engadget.com/rss.xml" },
      { title: "Lifehacker", siteUrl: "http://lifehacker.com", feedUrl: "https://cors.vegashat.com/http://lifehacker.com/rss" },
      { title: "Slashdot", siteUrl: "https://www.slashdot.org", feedUrl: "https://cors.vegashat.com/http://rss.slashdot.org/Slashdot/slashdot" }
    ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
