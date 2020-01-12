import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnInit, OnChanges {

  @Input() columnList = [];
  @Input() tableData = [];
  @Input() isNeedActionField:string = 'yes';
  @Output("edit") edit: EventEmitter<any> = new EventEmitter();
  @Output("delete") delete: EventEmitter<any> = new EventEmitter();


  currentTableDataList = [];
  sortableColumnList = [];
  page: number = 1;


  constructor(
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.sortableColumnList = this.columnList.filter(x => x != 'Action');
  }

  ngOnChanges(changes:SimpleChanges) {
    this.currentTableDataList = changes.tableData.currentValue;
  }

  onSearch(term) {
    let result = [];

    if (term == '') {
      this.tableData = this.currentTableDataList;
    }
    this.tableData = this.tableData.filter(
      item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
    )
  }

  onSortBy(sortBy) {
    this.tableData.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)
  }

  onClickEdit(id) {
    this.edit.emit({ result: true, id: id });
  }


  onClickDelete(data) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.result) {
        this.delete.emit({ result: true, sendData: data })
      }
    });
  }


}
