import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LoginFormComponent } from '../../modules/auth/components/login-form/login-form.component'

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [
        LoginFormComponent
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
}
