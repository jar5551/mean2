/**
 * Created by jarek on 23/11/2016.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from "./app/app.module";

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);