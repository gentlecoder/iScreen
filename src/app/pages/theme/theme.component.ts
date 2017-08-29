import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import ConstantsList from '../../app.constants';

import { ThemeService } from '../../connector/theme.service';
import { Theme } from '../../connector/theme';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.less']
})
export class ThemeComponent implements OnInit {
  themes: Theme[];
  devUrl: string = ConstantsList.devUrl;

  constructor(
    private themeService: ThemeService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getAllThemes();
  }

  getAllThemes(): void {
    this.themeService
        .getAllItems()
        .then(themes => this.themes = themes);
  }

  delete(theme: Theme): void {
    this.themeService
        .delete(theme.id)
        .then(() => {
          this.themes = this.themes.filter(h => h !== theme);

          this.toastrService.success(theme.name + '已删除！', 'Success!');
        });
  }

}
