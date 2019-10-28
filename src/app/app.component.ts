import { Component } from '@angular/core';
import {Socket} from "ngx-socket-io";

import {bufferTime, throttle} from "rxjs/operators";
import {interval} from "rxjs/internal/observable/interval";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    lastMessage = 'Ready to receive...';
    messageCounter = 0;

    constructor(private socket: Socket) { }

    ngOnInit() {
        this.socket.fromEvent('premMessage')
            .subscribe(msg => this.lastMessage = msg)

        const stdObservable = this.socket.fromEvent('stdMessage')

        const stdObserver1 = stdObservable
            .pipe(
                throttle(ev => interval(500))
            )
            .subscribe(msg => this.lastMessage = msg)

        const stdObserver2 = stdObservable
            .pipe(
                bufferTime(1000)
            )
            .subscribe(accMsg => this.messageCounter = accMsg.length)
    }
}
