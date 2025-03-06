import * as process from 'process';
import { Buffer } from 'buffer';

window.process = process;
(window as any).global = window;
global.Buffer = global.Buffer || Buffer;

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
