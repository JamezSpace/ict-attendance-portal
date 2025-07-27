import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarIndex } from "../../components/nav-bar-index/nav-bar-index";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-index',
  imports: [RouterModule, NavBarIndex, MatFormFieldModule, MatInputModule, Footer],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index {

}
