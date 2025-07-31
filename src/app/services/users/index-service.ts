import { Injectable } from '@angular/core';
import { Environment } from '../../environments/environment';
import { Environment as EnvironmentProd } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class IndexService {
  async prepServer() {
    try {
      const response = await fetch(EnvironmentProd.backend_url);

      return response
    } catch (error) {
      console.error(error);

      return false
    }
  }
}
