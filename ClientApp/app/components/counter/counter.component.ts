import { Component } from '@angular/core';
import { NavBarConfig } from './../../../shared/navbar/navbar-config';
import { ComponentPageTitle } from './../../../shared/page-title/page-title';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html',
    styleUrls:["./counter.component.scss"]
})
export class CounterComponent {
    constructor(public _componentPageTitle: ComponentPageTitle, public navBarConfig: NavBarConfig){
        _componentPageTitle.title = "Counter";
        navBarConfig.isHidden = true;
    }
    public currentCount = 0;

    public incrementCounter() {
        this.currentCount++;
    }
}
