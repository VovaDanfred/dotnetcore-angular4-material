import { NavBarConfig } from './../shared/navbar/navbar-config';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { sharedConfig } from './app.module.shared';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        ServerModule,
        ...sharedConfig.imports
    ],
    providers: [NavBarConfig]
})
export class AppModule {
}
