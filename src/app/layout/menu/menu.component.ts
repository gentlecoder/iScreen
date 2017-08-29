import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  @Input() treemodule: string = 'M1';
  @Input() treeitem: string = 'V1';
  check:string;

  constructor() { }

  ngOnInit() {
    this.check = this.treemodule + this.treeitem;
  }

}
