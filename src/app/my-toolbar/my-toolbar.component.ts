import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { CommonModule } from '@angular/common'

/**
 * @title Toolbar overview
 */
@Component({
    selector: 'app-toolbar',
    templateUrl: 'my-toolbar.component.html',
    styleUrl: 'my-toolbar.component.scss',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
})
export class MyToolbarComponent {}
