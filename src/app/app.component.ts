import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  columnDefs = [
      {headerName: 'Make', field: 'make', sortable: true, filter: true},
      {headerName: 'Model', field: 'model', sortable: true, filter: true},
      {headerName: 'Price', field: 'price', sortable: true, filter: true}
  ];

  rowData: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
      this.rowData = this.http.get('http://10.1.4.65:3000/press/?TagName=Press1600.ZoneIn.Temperature&Period=10');
  }
}
