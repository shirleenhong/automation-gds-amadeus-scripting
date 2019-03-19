import { Component } from "@angular/core";
import { setTheme } from 'ngx-bootstrap';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "bpg-gds-scripting-amadeus";
  ngOnInit() {

    setTheme('bs4');

  }



}
