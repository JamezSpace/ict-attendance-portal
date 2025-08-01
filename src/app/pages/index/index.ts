import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarIndex } from "../../components/nav-bar-index/nav-bar-index";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Footer } from "../../components/footer/footer";
import { IndexService } from '../../services/users/index/index-service';

@Component({
  selector: 'app-index',
  imports: [RouterModule, NavBarIndex, MatFormFieldModule, MatInputModule, Footer],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index implements OnInit {
  private indexService = inject(IndexService);
  
  async ngOnInit(): Promise<void> {
  {
    const result = await this.indexService.prepServer()

    console.log(result);    
  }
  }
}
