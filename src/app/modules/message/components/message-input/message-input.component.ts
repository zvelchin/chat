import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    MatTooltip,
  ],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
  messageTextControl: FormControl<string | null> = new FormControl(null);

  @Output() onSendEmitter: EventEmitter<string> = new EventEmitter();

  handleSendMessageBtn(): void {
    const messageText: string | null = this.messageTextControl.value;
    if (messageText) {
      this.messageTextControl.reset();
      this.onSendEmitter.emit(messageText);
    }
  }
}
