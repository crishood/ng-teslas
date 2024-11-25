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
import { CarModel } from '../models.type';
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
  public currentModel = signal<CarModel | undefined>(undefined);
  public form: FormGroup;

  private _fb = inject(FormBuilder);

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
      model: [null],
      color: [null],
    });

    this._setFormValues();
  }

  private _setFormValues() {
    this.form.get('model')?.valueChanges.subscribe((value) => {
      const newModel = this._configuratorService.getCurrentModel(value);
      this.currentModel.set(newModel());
      this.form.get('color')?.setValue(this.currentModel()?.colors[0].code);
    });
  }
}
