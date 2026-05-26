import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  standalone: false,
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {

}
