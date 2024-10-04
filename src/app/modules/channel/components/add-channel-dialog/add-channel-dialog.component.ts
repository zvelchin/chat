import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { AddChannelDialogData } from '../../models/channel.model'

@Component({
    selector: 'app-add-channel-dialog',
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        ReactiveFormsModule,
        MatButton,
        MatLabel,
        MatDialogContent,
        MatDialogActions,
    ],
    templateUrl: './add-channel-dialog.component.html',
    styleUrl: './add-channel-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddChannelDialogComponent {
    channelName: FormControl = new FormControl('', Validators.required)

    constructor(
        private dialogRef: MatDialogRef<AddChannelDialogComponent>,
    ) {
    }

    addChannel(): void {
        const data: AddChannelDialogData = {
            name: this.channelName.value,
        }
        this.close(data)
    }

    close(data?: AddChannelDialogData): void {
        this.dialogRef.close(data)
    }
}
