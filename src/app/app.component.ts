import { Component, computed, inject, Signal } from '@angular/core';
import { SelectedConfig } from './models.type';
import { ConfiguratorService } from './configurator.service';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  private _configuratorService = inject(ConfiguratorService);
  public selectedConfig: Signal<Partial<SelectedConfig>> =
    this._configuratorService.selectedConfig;
  public hasSelectedConfig = computed(
    () => !!this.selectedConfig().car && !!this.selectedConfig().color
  );
}
