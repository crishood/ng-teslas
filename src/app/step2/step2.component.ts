import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { ConfiguratorService } from '../configurator.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarOptions } from '../models.type';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component implements OnInit {
  private _configuratorService = inject(ConfiguratorService);
  public currentId: string = this._configuratorService.currentCar()?.code ?? '';
  public currentOptions: Signal<CarOptions | undefined>;

  public form: FormGroup;

  private _fb = inject(FormBuilder);
  constructor() {
    this.currentOptions = this._configuratorService.getOptions(this.currentId);
  }

  ngOnInit() {
    this._initFormValues();
    this._setInitialValues();
  }

  private _setInitialValues() {
    console.log('currentOptions', this.currentOptions());
  }

  private _initFormValues() {
    this.form = this._fb.group({});
  }
}
