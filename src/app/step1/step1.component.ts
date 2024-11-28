import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorService } from '../configurator.service';
import { CarModel, Color } from '../models.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component implements OnInit {
  private _configuratorService = inject(ConfiguratorService);
  public allModels: Signal<CarModel[]> = this._configuratorService.getModels();
  public currentModel = signal<CarModel | undefined>(
    this._configuratorService.currentCar()
  );
  public currentColor = signal<Color | undefined>(
    this.currentModel()?.colors[0]
  );
  public form: FormGroup;

  private _fb = inject(FormBuilder);
  private _currentConfig = this._configuratorService.selectedConfig();

  ngOnInit() {
    this._initFormValues();
  }

  get carUrl(): Signal<string> {
    return computed(() => {
      return `https://interstate21.com/tesla-app/images/${
        this.form.get('model')?.value
      }/${this.form.get('color')?.value}.jpg`;
    });
  }

  private _initFormValues() {
    this.form = this._fb.group({
      model: [this._currentConfig?.car?.code ?? null],
      color: [this._currentConfig?.color?.code ?? null],
    });

    this._setFormValues();
  }

  private _setFormValues() {
    this.form.get('model')?.valueChanges.subscribe((value) => {
      if (this.currentModel()?.code !== value) {
        const newModel = this._configuratorService.getCurrentModel(value);
        if (!!newModel()) this.currentModel.set(newModel()!);

        this.form.patchValue(
          {
            color: this.currentModel()?.colors[0].code,
          },
          { emitEvent: false }
        );
        this._configuratorService.setCurrentColor(
          this.currentModel()?.colors[0].code
        );
      }
    });
    this.form.get('color')?.valueChanges.subscribe((value) => {
      if (!!value) this._configuratorService.setCurrentColor(value);
    });
  }
}
