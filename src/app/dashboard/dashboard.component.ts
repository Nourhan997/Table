import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Column } from '../generic-table/types/column.type';
import { Row } from "../generic-table/types/row.type";
import { data } from '../generic-table/types/data';
import { Sort } from "@angular/material/sort";
import { Customer } from '../generic-table/types/customer';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  isLoggedIn = false;
  contents = [];
  datarow: Row<data>[] = [];
  Customersrow: Row<Customer>[] = [];
  Columns: Column[] = [];
  page!: any;
  size: number = 20;
  totalitems: any;
  previousSize: any;
  previousIndex: any;
  sortdirection: string = "asc";
  sortBy: string = "name";
  search!: string;

  constructor(private token: TokenStorageService,
    private userService: UserService,
    private cd: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.getCustomerList();
    this.cd.detectChanges();
  }

  CustomersColumns: Column[] = [
    { name: 'id', isSortable: true, dataKey: 'id', position: 'left' },
    { name: 'current_device', position: 'left', isSortable: true, dataKey: 'current_device' },
    { name: 'phone_number', dataKey: 'phone_number' },
  ]

  //GetValues From the output event emiter PageIdexChanges 
  setData(event: any) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.previousSize = event.previousSize;
    this.previousIndex = event.previousPageIndex;
    this.NextPage();
  }

  //Get Search Value From the output event emiter filter
  getfilter(event: any) {
    console.log("hello filtered value ")
    this.search = event;
    console.log(this.search);
    this.GetDataByFilter();
  }

  //Giving Success But not returing a value based on search 
  GetDataByFilter() {
    this.data.search = this.search;
    this.userService.CustomerListing(this.data).subscribe(data => {
      alert(data.status);
      this.data.search = "string";
    })

  }

  //This method is called in setData when pageindexchanged emit an event 
  NextPage() {
    this.data.page = ++this.page;
    this.userService.CustomerListing(this.data).subscribe(data => {
      console.log(this.data)
      this.contents = data.body.items;
      this.contents.forEach((element: any) => {
        this.Customersrow.push({
          values: {
            id: element.id,
            current_device: element.current_device,
            phone_number: element.phone_number,
          }
        });
      })
      this.cd.detectChanges();
      console.log(this.Customersrow)
    })
    this.cd.detectChanges();

  }

  //Notused
  previousPage() {
    this.data.page = --this.page
    this.userService.CustomerListing(this.data).subscribe(data => {
      console.log(this.data)
      this.contents = data.body.items;
      this.contents.forEach((element: any) => {
        this.Customersrow.push({
          values: {
            id: element.id,
            current_device: element.current_device,
            phone_number: element.phone_number,
          }
        });
      })
      this.cd.detectChanges();
      console.log(this.Customersrow)
    })
    this.cd.detectChanges();
  }

  //Data Properties 
  data = {
    "active": true,
    "from_dropdown": false,
    "guest": true,
    "page": this.page,
    "search": "string",
    "size": this.size,
    "sort_by": this.sortBy,
    "sort_order": this.sortdirection,
    "system": "string"
  }

  //MainMethod
  getCustomerList() {
    this.userService.CustomerListing(this.data).subscribe(data => {
      this.contents = data.body.items;
      this.contents.forEach((element: any) => {
        this.Customersrow.push({
          values: {
            id: element.id,
            current_device: element.current_device,
            phone_number: element.phone_number,
          }
        });
      })
      this.cd.detectChanges();
    })
  }


  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    let precustomerrow = this.Customersrow
    if (sortParameters.direction === 'desc') {
      this.data.sort_by = keyName;
      this.data.sort_order = sortParameters.direction;
      this.cd.detectChanges();
      console.log(this.data);
      this.Customersrow = [];
      this.getCustomerList();
    }

  }

}

