import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  Signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarModel, CarOptions, Color, SelectedConfig } from './models.type';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService {
  private http = inject(HttpClient);
  readonly allModels: Signal<CarModel[]> = this.getModels();
  readonly currentCar = signal<CarModel | undefined>(undefined);
  readonly currentColor = signal<Color | undefined>(undefined);
  readonly selectedConfig: Signal<Partial<SelectedConfig>> = computed(() => ({
    car: this.currentCar(),
    color: this.currentColor(),
    configs: [],
    yoke: false,
    towHitch: false,
  }));

  private _configEffect = effect(() => {
    console.log('currentCar', this.currentCar());
    console.log('currentColor', this.currentColor());
    console.log('selectedConfig', this.selectedConfig());
  });

  getModels(): Signal<CarModel[]> {
    return toSignal(this.http.get<CarModel[]>('models'), { initialValue: [] });
  }

  getOptions(id: string): Signal<CarOptions | undefined> {
    return toSignal(
      this.http.get<CarOptions>(`options`, {
        params: { id },
      }),
      {
        initialValue: undefined,
      }
    );
  }

  getCurrentModel(code: string): Signal<CarModel | undefined> {
    this.currentCar.set(this.allModels().find((model) => model.code === code));
    return this.currentCar;
  }

  setCurrentColor(color: string | undefined) {
    if (!!color)
      this.currentColor.set(
        this.currentCar()?.colors.find((c) => c.code === color)
      );
  }
}
