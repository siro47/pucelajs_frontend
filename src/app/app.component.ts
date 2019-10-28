import { Component } from '@angular/core';
import {Socket} from "ngx-socket-io";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    lastMessage = 'Ready to receive...';

    constructor(private socket: Socket) { }

    ngOnInit() {
        this.socket.fromEvent('premMessage')
            .subscribe(msg => this.lastMessage = msg)
    }
}
