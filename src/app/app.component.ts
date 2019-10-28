import { Component } from '@angular/core';
import {Socket} from "ngx-socket-io";

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

        const stdObserver1 = stdObservable.subscribe(msg => this.lastMessage = msg)
        const stdObserver2 = stdObservable.subscribe(msg => this.messageCounter++)
    }
}
