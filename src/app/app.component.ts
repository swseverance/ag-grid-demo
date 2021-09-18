import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  columnDefs: ColDef[] = [
    { field: 'make', rowGroup: true }, // group data by make
    { field: 'price' },
  ];

  autoGroupColumnDef: ColDef = {
    headerName: 'Model',
    field: 'model',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    },
  };

  rowData$: Observable<any[]> = this.http.get<any[]>(
    'https://www.ag-grid.com/example-assets/row-data.json'
  );

  constructor(private http: HttpClient) {}

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => {
      if (node.groupData) return { make: node.key, model: 'Group' };
      return node.data;
    });
    const str = selectedData
      .map((node) => `${node.make} ${node.model}`)
      .join(', ');
    alert(str);
  }
}
