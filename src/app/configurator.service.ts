import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarModel } from './models.type';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService {
  private http = inject(HttpClient);
  readonly allModels: Signal<CarModel[]> = this.getModels();
  readonly currentCar = signal<CarModel | undefined>(undefined);
  public models = signal<CarModel[]>([]);

  getModels(): Signal<CarModel[]> {
    return toSignal(this.http.get<CarModel[]>('models'), { initialValue: [] });
  }

  getCurrentModel(code: string): Signal<CarModel | undefined> {
    this.currentCar.set(this.allModels().find((model) => model.code === code));
    return this.currentCar;
  }
}
