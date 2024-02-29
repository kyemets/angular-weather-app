import { ApplicationConfig } from '@angular/core'

import { provideClientHydration } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(),
        provideHttpClient(),
        provideAnimationsAsync(),
        provideAnimationsAsync(),
    ],
}
