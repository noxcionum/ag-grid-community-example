import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';


import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;

  //public modules: Module[] = [ClientSideRowModelModule];

  defaultColDef;
   pinnedTopRowData;
   pinnedBottomRowData;

  @ViewChild('agGrid') agGrid: AgGridAngular;


  title = 'app';

  columnDefs = [
    { headerName: 'Make', field: 'y', sortable: true, filter: true },
    { headerName: 'Model', field: 'x', sortable: true, filter: true },
    // {headerName: 'Price', field: 'price', sortable: true, filter: true}
  ];

  rowData: any;


  constructor(private http: HttpClient) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 110,
      editable: true,
      resizable: true,
    };
    this.pinnedTopRowData = getPinnedTopData();
    this.pinnedBottomRowData = getPinnedBottomData();

  }

  ngOnInit() {
    //this.rowData = this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData.json');

    this.http.get('http://10.1.4.65:3000/press/?TagName=Press1600.ZoneIn.Temperature&Period=1').subscribe(
      data => {
        this.rowData = data['query1'];

        // console.log(data['query1']);
        // console.log(this.rowData2);
      })

  }
  getSelectedRows() {
    this.agGrid.api.startEditingCell;
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.x + ' ' + node.y).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
  

}

function getPinnedTopData() {
  return [
    {
      x: '##',
      y: '##'
      
    },
  ];
}
function getPinnedBottomData() {
  return [
    {
      x: '##',
      y: '##'
    },
  ];
}

