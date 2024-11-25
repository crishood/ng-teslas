import { Component, inject, signal, Signal } from '@angular/core';
import { Step1Component } from './step1/step1.component';
import { CarModel } from './models.type';
import { ConfiguratorService } from './configurator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Step1Component],
  templateUrl: 'app.component.html',
})
export class AppComponent {}
