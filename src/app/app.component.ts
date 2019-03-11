import { Component } from "@angular/core";
declare var smartScriptSession: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "bpg-gds-scripting-amadeus";
  sendCommand(command) {
    const promise = smartScriptSession.send(command);
    return promise;
  }
}
