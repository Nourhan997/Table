import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, Output, EventEmitter } from '@angular/core';
import { Column } from '../types/column.type';
import { Row } from '../types/row.type';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class GenericTableComponent<T> implements OnInit {
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) matPaginator!: MatPaginator;
  
  pageIndex = 0;
  pageSize: any;
  previousSize: any;
  previousIndex: any;
  searchvalue: any;

  @Input() columns: Column[] = [];

  //Paginator 
  @Input() isPageable = false;
  //@Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = 10;
  @Input() length: any; 
  @Output() pageIndexChange: EventEmitter<any> = new EventEmitter();

   //Sort 
  @Input() isSortable = false;
  @Output() sort: EventEmitter<Sort> = new EventEmitter();
 
  //Filter 
  @Input() isFilterable = false;
  @Output() filter: EventEmitter<any> = new EventEmitter();


  public dataSource = new MatTableDataSource<Row<T>>();
  public columnNames: string[] = []

  constructor() { }

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set rows(data: any[]) {
    this.setTableDataSource(data);

  }

  /// Assign the data to the data source for the table to render
  setTableDataSource(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;
  }

  ngOnInit(): void {
    this.columnNames = this.columns.map((column) => column.name.toString());

  }

  //we need this, in order to make pagination work with *ngIf
  //Accessing page paginator and raise an event with it 
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.matPaginator;
    this.matPaginator.page.subscribe((res: any) => {
      console.log(res);
      this.pageIndex = res.pageIndex;
      this.pageSize = res.pageSize;
      this.previousIndex = res.previousPageIndex;
      this.previousSize = this.pageSize * this.pageIndex;
      this.pageindexmethod({});
    }
    )
  }

  //Raise the event to send the data back to parent
  pageindexmethod({ }) {
    this.pageIndexChange.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      previousSize: this.previousSize,
      previousIndex: this.previousIndex
    });
    console.log("emitted")
  }

  FilterChanged() {
    this.filter.emit(this.searchvalue);
    console.log(this.searchvalue)
    console.log("emitted-Filter");
  }


  sortTable(sortParameters: Sort): void {
    // defining name of data property, to sort by
    sortParameters.active = this.columns.find(column => column.name === sortParameters.active)!.dataKey;
    this.sort.emit(sortParameters);
    console.log("emitted-sort")
    console.log(sortParameters) //active: "id" direction: "asc"
  }

}
