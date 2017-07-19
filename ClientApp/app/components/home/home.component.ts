import { NavBarConfig } from './../../../shared/navbar/navbar-config';
import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
    constructor(public navBarConfig: NavBarConfig){
        navBarConfig.isHidden = false;
    }
}
